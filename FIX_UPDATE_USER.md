┌─────────────────────────────────────────────────────────────────┐
│            FLUJO ACTUAL (CON ERROR CRÍTICO)                     │
└─────────────────────────────────────────────────────────────────┘

1. Usuario autenticado con token JWT
   │
   Token JWT contiene:
   {
     "sub": "max.carrion",        ← Username actual
     "userId": "e53602eb-...",
     "iat": 1699603200,
     "exp": 1699689600
   }
   │
2. Usuario cambia su username de "max.carrion" → "max.carrion.dev"
   │
   ├─> PUT /api/users/me/account
   │   Body: { "username": "max.carrion.dev" }
   │
3. Backend actualiza la BD
   │
   UPDATE users 
   SET username = 'max.carrion.dev' 
   WHERE id = 'e53602eb-...'
   │
4. Backend responde 200 OK
   │
5. ❌ PROBLEMA: El siguiente request falla
   │
   GET /api/users/me/profile
   Headers: { Authorization: "Bearer <TOKEN_CON_USERNAME_VIEJO>" }
   │
6. Backend intenta validar el token
   │
   ├─> JwtService.validateToken(token)
   ├─> Extrae: username = "max.carrion" (del token)
   │
7. Backend busca al usuario en la BD
   │
   SELECT * FROM users WHERE username = 'max.carrion'
   │
8. ❌ RESULTADO: No encuentra al usuario
   │
   └─> Responde 401 Unauthorized
       "Invalid or expired token"
   │
9. Frontend detecta 401 y redirige a /login
   │
   └─> Usuario es deslogueado automáticamente 😱