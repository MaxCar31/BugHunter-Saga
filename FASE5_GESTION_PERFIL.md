# 📋 FASE 5: Gestión de Perfil - Documentación de Implementación

## 🎯 Descripción General

Este documento describe la implementación de la **Fase 5: Gestión de Perfil (Ajustes y Configuración)** en BugHunter Saga. Esta fase permite a los usuarios visualizar y gestionar su perfil, actualizar sus datos de cuenta y modificar sus configuraciones de aprendizaje.

## 🚀 Características Implementadas

La Fase 5 implementa **3 features principales**:

### 1️⃣ **Feature 1: Obtener Perfil del Usuario**
- **Endpoint:** `GET /api/users/me/profile`
- **Complejidad:** ⭐ Fácil
- **Descripción:** Carga y muestra el perfil completo del usuario autenticado

### 2️⃣ **Feature 2: Actualizar Cuenta**
- **Endpoint:** `PUT /api/users/me/account`
- **Complejidad:** ⭐⭐ Media
- **Descripción:** Permite actualizar el nombre y username del usuario

### 3️⃣ **Feature 3: Actualizar Configuraciones**
- **Endpoint:** `PUT /api/users/me/settings`
- **Complejidad:** ⭐ Fácil
- **Descripción:** Permite modificar la meta diaria de XP y configuraciones de sonido

---

## 📁 Archivos Creados y Modificados

### ✨ Archivos Nuevos

#### 1. `src/services/userService.ts`
**Servicio centralizado para gestionar el perfil y configuraciones del usuario.**

**Funciones exportadas:**
- `getUserProfile()` - Obtiene el perfil completo del usuario
- `updateUserAccount(data)` - Actualiza nombre y username
- `updateUserSettings(data)` - Actualiza configuraciones (meta XP, sonidos)

**Características:**
- ✅ Manejo centralizado de autenticación (JWT token)
- ✅ Validaciones del lado del cliente
- ✅ Manejo robusto de errores
- ✅ Tipado fuerte con TypeScript
- ✅ Headers de autenticación automáticos

---

### 🔄 Archivos Modificados

#### 2. `src/stores/createUserStore.ts`
**Modificaciones:**
- ➕ Agregado campo `email: string`
- ➕ Agregada función `setEmail(email: string)`
- ➕ Agregada función `setJoinedAt(joinedAt: dayjs.Dayjs)`

**Razón:** Necesario para almacenar el email del usuario y la fecha de registro en el estado global.

---

#### 3. `src/pages/profile.tsx`
**Modificaciones:**
- ➕ Importado `getUserProfile` del servicio
- ➕ Importado `dayjs` para manejo de fechas
- ➕ Agregado `useEffect` para cargar el perfil al montar el componente
- ➕ Agregados estados de carga (`isLoading`) y error (`error`)
- ➕ Renderizado condicional para estados de carga y error

**Flujo de ejecución:**
```
1. Usuario navega a /profile
   ↓
2. useEffect detecta que el usuario está autenticado
   ↓
3. Llama a getUserProfile() del servicio
   ↓
4. Actualiza el store de Zustand con los datos recibidos
   ↓
5. El componente se re-renderiza con los datos actualizados
```

---

#### 4. `src/pages/settings/account.tsx`
**Modificaciones:**
- ➕ Importado `updateUserAccount` del servicio
- ➕ Agregados estados: `isLoading`, `error`, `successMessage`
- ➕ Implementada función `handleSaveChanges()` que:
  - Llama al API para actualizar los datos
  - Valida la respuesta
  - Actualiza el store global
  - Muestra mensajes de éxito/error
- ➕ Agregados mensajes de feedback visual (alertas verdes/rojas)
- ➕ Deshabilitados inputs durante la carga

**Características:**
- ✅ Validación en tiempo real (botón deshabilitado si no hay cambios)
- ✅ Feedback visual con mensajes de éxito/error
- ✅ Manejo de errores específicos (ej. "Username already taken")
- ✅ Estado de carga con spinner

---

#### 5. `src/pages/settings/coach.tsx`
**Modificaciones:**
- ➕ Importado `updateUserSettings` del servicio
- ➕ Agregados estados: `isLoading`, `error`, `successMessage`
- ➕ Implementada función `handleSaveChanges()` para actualizar la meta diaria
- ➕ Agregados mensajes de feedback visual
- ➕ Deshabilitados botones durante la carga

**Valores permitidos para meta diaria:**
- `1` XP - Basic
- `10` XP - Casual
- `20` XP - Regular
- `30` XP - Serious
- `50` XP - Intense

---

#### 6. `src/pages/settings/sound.tsx`
**Modificaciones:**
- ➕ Importado `updateUserSettings` del servicio
- ➕ Agregados estados: `isLoading`, `error`, `successMessage`
- ➕ Implementada función `handleSaveChanges()` para actualizar configuraciones de sonido
- ➕ Agregados mensajes de feedback visual
- ➕ Deshabilitados toggles durante la carga

**Configuraciones gestionadas:**
- `soundEffectsEnabled` - Efectos de sonido
- `speakingExercises` - Ejercicios de habla
- `listeningExercises` - Ejercicios de escucha

---

#### 7. `src/components/LoginScreen.tsx`
**Modificaciones:**
- ➕ Agregado `setEmail` del store
- ➕ Guardado del email del usuario al iniciar sesión: `setEmail(data.user.email)`

**Razón:** Asegurar que el email se almacene en el estado global desde el inicio de sesión.

---

## 🔌 Contratos de API

### Feature 1: GET /api/users/me/profile

**Request:**
```http
GET /api/users/me/profile HTTP/1.1
Authorization: Bearer <JWT_TOKEN>
```

**Response (200 OK):**
```json
{
  "userId": "e53602eb-c7c5-4aa0-a1f5-ed5007e77ddb",
  "name": "Max Carrión",
  "username": "max.carrion",
  "email": "max.carrion@epn.edu.ec",
  "joinedAt": "2025-11-09T06:41:01.61432",
  "lingots": 0,
  "dailyXpGoal": 10,
  "soundEffectsEnabled": true
}
```

---

### Feature 2: PUT /api/users/me/account

**Request:**
```http
PUT /api/users/me/account HTTP/1.1
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "name": "Maximiliano Carrion",
  "username": "max.carrion.dev"
}
```

**Response (200 OK):**
```json
{
  "id": "e53602eb-c7c5-4aa0-a1f5-ed5007e77ddb",
  "username": "max.carrion.dev",
  "name": "Maximiliano Carrion",
  "email": "max.carrion@epn.edu.ec"
}
```

**Response (400 Bad Request):**
```json
{
  "timestamp": "2025-11-09T12:00:00.000",
  "status": 400,
  "error": "Bad Request",
  "message": "Username already taken"
}
```

---

### Feature 3: PUT /api/users/me/settings

**Request:**
```http
PUT /api/users/me/settings HTTP/1.1
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "dailyXpGoal": 30,
  "soundEffectsEnabled": true,
  "speakingExercises": false,
  "listeningExercises": true
}
```

**Response (200 OK):**
```json
{
  "userId": "f3f1337d-63a1-44b1-837f-913c862255b9",
  "name": "Max Carrión",
  "username": "max.carrion3",
  "email": "max.carrion3@epn.edu.ec",
  "joinedAt": "2025-11-10T03:26:35.684542",
  "lingots": 0,
  "dailyXpGoal": 30,
  "soundEffectsEnabled": true
}
```

---

## 🎨 Flujo de Usuario

### 1. Ver Perfil

```
Usuario → /profile
   ↓
Componente carga
   ↓
GET /api/users/me/profile
   ↓
Actualiza Zustand Store
   ↓
Muestra datos: Nombre, Username, Email, Fecha de registro, Estadísticas
```

---

### 2. Editar Cuenta

```
Usuario → /settings/account
   ↓
Ve formulario con datos actuales
   ↓
Modifica Nombre o Username
   ↓
Clic en "Save changes"
   ↓
PUT /api/users/me/account
   ↓
Backend valida username único
   ↓
Si OK: Actualiza store y muestra mensaje de éxito ✅
Si error: Muestra mensaje de error ❌
```

---

### 3. Cambiar Meta Diaria

```
Usuario → /settings/coach
   ↓
Ve opciones de meta (Basic, Casual, Regular, Serious, Intense)
   ↓
Selecciona nueva meta
   ↓
Clic en "Save changes"
   ↓
PUT /api/users/me/settings
   ↓
Actualiza store y muestra mensaje de éxito ✅
```

---

### 4. Configurar Sonidos

```
Usuario → /settings/sound
   ↓
Ve toggles de configuración
   ↓
Activa/Desactiva opciones
   ↓
Clic en "Save changes"
   ↓
PUT /api/users/me/settings
   ↓
Actualiza store y muestra mensaje de éxito ✅
```

---

## 🔐 Seguridad

### Autenticación
- **Token JWT:** Todas las peticiones requieren el header `Authorization: Bearer <token>`
- **Almacenamiento:** El token se guarda en `localStorage` con la clave `bh_token`
- **Validación:** El servicio verifica que el token exista antes de realizar peticiones

### Validaciones del Cliente
1. **Username:** Mínimo 3 caracteres
2. **Nombre:** No puede estar vacío
3. **Meta diaria:** Solo valores válidos (1, 10, 20, 30, 50)

---

## 🧪 Cómo Probar

### Prerequisitos
1. Backend Spring Boot corriendo en `http://localhost:8080`
2. Base de datos PostgreSQL configurada
3. Usuario registrado e iniciado sesión

### Pasos de Prueba

#### Test 1: Visualizar Perfil
```bash
1. Inicia sesión en la aplicación
2. Navega a: http://localhost:3000/profile
3. Verifica que se muestre:
   - Nombre del usuario
   - Username
   - Fecha de registro (formato: "November 2025")
   - Estadísticas (si están disponibles)
```

#### Test 2: Actualizar Cuenta
```bash
1. Navega a: http://localhost:3000/settings/account
2. Modifica el campo "Name" a "Nuevo Nombre"
3. Modifica el campo "Username" a "nuevo.username"
4. Clic en "Save changes"
5. Verifica:
   - Mensaje verde de éxito
   - Los cambios persisten al recargar
   - El perfil (/profile) muestra los nuevos datos
```

#### Test 3: Cambiar Meta Diaria
```bash
1. Navega a: http://localhost:3000/settings/coach
2. Selecciona "Serious" (30 XP/day)
3. Clic en "Save changes"
4. Verifica:
   - Mensaje verde de éxito
   - La nueva meta persiste al recargar
```

#### Test 4: Configurar Sonidos
```bash
1. Navega a: http://localhost:3000/settings/sound
2. Desactiva "Sound effects"
3. Activa "Listening exercises"
4. Clic en "Save changes"
5. Verifica:
   - Mensaje verde de éxito
   - Las configuraciones persisten al recargar
```

---

## 🐛 Manejo de Errores

### Errores del Backend

| Código | Escenario | Mensaje |
|--------|-----------|---------|
| 400 | Username ya existe | "Username already taken" |
| 401 | Token inválido/expirado | "No estás autenticado. Por favor inicia sesión." |
| 500 | Error del servidor | "Error al comunicarse con el servidor" |

### Errores del Cliente

| Validación | Mensaje |
|------------|---------|
| Username corto | "El username debe tener al menos 3 caracteres." |
| Nombre vacío | "El nombre no puede estar vacío." |
| Meta inválida | "Meta de XP diaria inválida. Valores permitidos: 1, 10, 20, 30, 50." |

---

## 📊 Estado de Zustand

### Datos Gestionados

```typescript
// UserSlice
{
  name: string,          // "Max Carrión"
  username: string,      // "max.carrion"
  email: string,         // "max.carrion@epn.edu.ec"
  joinedAt: dayjs.Dayjs, // Fecha de registro
  loggedIn: boolean,     // true
}

// GoalXpSlice
{
  goalXp: 1 | 10 | 20 | 30 | 50, // Meta diaria
}

// SoundSettingsSlice
{
  soundEffects: boolean,       // true/false
  speakingExercises: boolean,  // true/false
  listeningExercises: boolean, // true/false
}

// LingotSlice
{
  lingots: number, // Puntos QA
}
```

---

## 🔄 Sincronización de Datos

### Flujo de Sincronización

```
Backend (PostgreSQL)
        ↓
   API Response
        ↓
  userService.ts (Validación + Transformación)
        ↓
  Zustand Store (Estado Global)
        ↓
  Componentes React (UI)
```

### Actualización en Cascada

Cuando se actualiza el perfil en `/settings/account`:
1. ✅ El store global se actualiza
2. ✅ `/profile` refleja los cambios automáticamente
3. ✅ `TopBar` muestra el nuevo username
4. ✅ Todos los componentes que consumen el store se sincronizan

---

## 🎯 Próximos Pasos (Mejoras Futuras)

### Mejoras Sugeridas
1. **Validación de Email:** Permitir cambiar el email (requiere verificación)
2. **Foto de Perfil:** Subir y mostrar avatar personalizado
3. **Cambio de Contraseña:** Endpoint para actualizar la contraseña
4. **Historial de Cambios:** Mostrar log de modificaciones al perfil
5. **Deshacer Cambios:** Botón para revertir cambios no guardados
6. **Auto-guardado:** Guardar cambios automáticamente cada X segundos
7. **Validación en Tiempo Real:** Verificar disponibilidad de username mientras se escribe

---

## 📝 Notas Técnicas

### Dependencias Utilizadas
- `dayjs` - Manejo de fechas
- `zustand` - Gestión de estado global
- `next/router` - Navegación
- `react` - Framework UI

### Consideraciones de Rendimiento
- ✅ Las peticiones al API se realizan solo cuando es necesario
- ✅ El estado local previene peticiones innecesarias (botón deshabilitado)
- ✅ Los mensajes de éxito se limpian automáticamente después de 3 segundos

### Compatibilidad
- ✅ Compatible con todos los navegadores modernos
- ✅ Responsive design (móvil y escritorio)
- ✅ Accesibilidad: Usa etiquetas semánticas y estados disabled

---

## ✅ Checklist de Implementación

- [x] Servicio `userService.ts` creado
- [x] Store de usuario actualizado con `email` y `setJoinedAt`
- [x] Página `/profile` carga datos del API
- [x] Página `/settings/account` actualiza nombre y username
- [x] Página `/settings/coach` actualiza meta diaria
- [x] Página `/settings/sound` actualiza configuraciones de sonido
- [x] Manejo de errores implementado
- [x] Mensajes de feedback visual agregados
- [x] Estados de carga implementados
- [x] Validaciones del cliente implementadas
- [x] Documentación completada

---

## 📞 Soporte

Para dudas o problemas con esta implementación:
- Revisar los logs de la consola del navegador (F12)
- Verificar que el backend esté corriendo en el puerto 8080
- Revisar la documentación del API en `docs/contract.yml`

---

**Fecha de Implementación:** Noviembre 9, 2025  
**Versión:** 1.0.0  
**Autor:** GitHub Copilot + Max Carrión  
**Estado:** ✅ Completado
