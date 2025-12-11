# 🛠️ Tech Stack - BugHunter Saga

**Última Actualización:** Diciembre 3, 2025  
**Versión del Proyecto:** 0.1.0

---

## 🎨 Frontend Stack

### Core Framework
- **Next.js:** 14.2.11 (Pages Router)
- **React:** 18.3.1
- **React DOM:** 18.3.1
- **TypeScript:** 5.3.0 (strict mode habilitado)
- **Node.js:** >= 18.0.0

### State Management
- **Zustand:** 4.5.7
  - Patrón: Slice pattern con `useBoundStore`
  - Stores activos:
    - `createUserStore` - Datos del usuario (nombre, email, fecha de registro)
    - `createGoalXpStore` - Meta diaria de XP
    - `createLingotStore` - Puntos QA (lingots)
    - `createStreakStore` - Racha de días activos
    - `createXpStore` - Experiencia total y diaria
    - `createLeagueStore` - Liga actual
    - `createModuleStore` - Módulo activo y progreso de lecciones
    - `createLessonStore` - Problemas de lecciones
    - `createQuestionsSlice` - Preguntas cargadas por módulo
    - `createShopSlice` - ✨ **NUEVO** - Estado de la tienda (items, loading, error)
    - `createSoundSettingsStore` - Configuraciones de sonido

### Styling & UI
- **Tailwind CSS:** 3.4.11
  - Utilidad-first CSS
  - Responsive design (mobile-first)
  - Breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- **PostCSS:** 8.4.47
- **Autoprefixer:** 10.4.16
- **Prettier Plugin Tailwind:** 0.6.6

### HTTP & API Integration
- **Fetch API:** Nativo (sin librerías externas como Axios)
- **Services Layer:**
  - `userService.ts` - Gestión de perfil y configuraciones
  - `lessonService.ts` - Completar lecciones
  - `moduleService.ts` - Cargar módulos
  - `unitService.ts` - Cargar unidades y tiles
  - `shopService.ts` - ✨ **NUEVO** - Gestión de la tienda

### Date & Time Handling
- **dayjs:** 1.11.13
  - Formateo de fechas
  - Cálculo de streaks
  - Manejo de zonas horarias

### Validation & Type Safety
- **Zod:** 3.23.8 - Runtime type validation
- **@t3-oss/env-nextjs:** 0.7.3 - Type-safe environment variables
- TypeScript strict mode con `noUncheckedIndexedAccess`

### Build & Development Tools
- **pnpm:** Gestor de paquetes (lockfile presente)
- **ESLint:** 8.56.0 (linting)
  - `@typescript-eslint/eslint-plugin`: 6.19.0
  - `@typescript-eslint/parser`: 6.19.0
  - `eslint-config-next`: 14.0.4
- **Prettier:** 3.3.3 (formateo de código)

### Project Structure - Frontend

**Components:**
- **Main Components (14 archivos):** BottomBar, Calendar, Flag, LeftBar, LoginScreen, ModuleCarousel, ModuleDropDown, ModuleHeader, ModuleIcon, RightBar, SettingsRightNav, TopBar, TopBarNew, UnitProgressCard
- **Icon Components (76 archivos):** Organizados en subcarpetas:
  - `gamification/` - 19 iconos (badges, fire, gems, locks, stars, etc.)
  - `league/` - 8 iconos (trofeos, leaderboard, ligas)
  - `lessons/` - 32 iconos (book, dumbbell, trophy, treasure, completion, hearts)
  - `navigation/` - 10 iconos (chevrons, globe, logout, more options, etc.)
  - `profile/` - 5 iconos (robot, medals, friends, time)
  - `ui/` - 6 iconos (close, done, edit, settings)
- **Lesson Components (7 archivos):** CheckAnswer, FillInTheBlankQuestion, MultipleChoiceQuestion, ProblemInfo, ProgressBar, QuitMessage, ReviewLesson
- **Learn Components (5 archivos):** HoverLabel, LessonCompletionIcon, TileIcon, TreasureCelebration, UnitHeader

**Pages (13 archivos):**
- Main: index, register, learn, lesson, profile, leaderboard, shop, tutorial, forgot-password
- Settings: account, coach, sound

**Types (6 archivos):**
- `user.ts` - UserProfileDTO, UpdateUserAccountDTO, UpdateUserSettingsDTO, UserStatsDTO, TreasureRewardDTO
- `lesson.ts` - LessonDTO, ProblemDTO, LessonCompletionRequest, LessonCompletionResponse
- `module.ts` - ModuleDTO, ModuleSummaryDTO
- `unit.ts` - UnitDTO, TileDTO
- `shop.ts` - ✨ **NUEVO** - ShopItemDTO, PurchaseResponse
- `svg.d.ts` - Declaraciones de tipos para SVGs

**Utilities (8 archivos):**
- `array-utils.ts` - Manipulación de arrays
- `config.ts` - Configuración de API base URL
- `dateString.ts` - Formateo de fechas con dayjs
- `lesson-helpers.ts` - Helpers para lecciones
- `module-helpers.ts` - Helpers para módulos
- `unit-helpers.ts` - Helpers para unidades
- `tilePositions.ts` - Cálculo de posiciones de tiles
- `storage.ts` - ✨ **NUEVO** - Abstracción de sessionStorage con helpers

**Deprecated Utils (3 archivos):**
- `lessons.ts`, `modules.ts`, `units.ts` - Archivos legacy

---

## ⚙️ Backend Stack

### Core Framework
- **Spring Boot:** 3.4.11
- **Java:** 17 (LTS)
- **Gradle:** 8.x (Kotlin DSL)

### Architecture Pattern
- **Hexagonal Architecture (Ports & Adapters)**
  - **Domain Layer:** Modelos de dominio puros sin dependencias externas
  - **Application Layer:** Casos de uso y lógica de negocio
  - **Infrastructure Layer:** Adaptadores (JPA, Web, Security)

### Database & Persistence
- **PostgreSQL:** 16.x (base de datos principal)
- **Flyway:** 10.x (migraciones de base de datos)
- **Spring Data JPA:** Persistencia declarativa
- **Hibernate:** ORM (Object-Relational Mapping)
- **HikariCP:** Connection pooling (por defecto en Spring Boot)

### Security & Authentication
- **Spring Security:** 6.x
- **JWT (JSON Web Tokens):**
  - `io.jsonwebtoken:jjwt-api:0.12.6`
  - `io.jsonwebtoken:jjwt-impl:0.12.6`
  - `io.jsonwebtoken:jjwt-jackson:0.12.6`
- **BCrypt:** Hash de contraseñas con salt automático
- **Stateless Sessions:** Sin gestión de sesiones en servidor

### Mapping & DTO Conversion
- **MapStruct:** 1.6.3 - Generación automática de mappers en tiempo de compilación
- **Lombok:** 1.18.36 - Reducción de boilerplate (getters, setters, builders)

### API Documentation
- **SpringDoc OpenAPI:** 2.7.0
  - Genera documentación automática en `/swagger-ui.html`
  - Especificación OpenAPI 3.0.3
  - Contrato en `.results/openapi.yml`

### Testing
- **JUnit 5:** Framework de testing
- **Spring Boot Test:** Testing de integración con contexto Spring
- **Mockito:** Mocking de dependencias
- **AssertJ:** Assertions fluidas y legibles

### Logging & Monitoring
- **SLF4J + Logback:** Logging estándar de Spring Boot
- **Spring Actuator:** Health checks, métricas, info de la aplicación

### Project Structure - Backend

**Controllers (6 archivos):**
- AuthController - Registro, login, recuperación de contraseña
- UserController - Perfil, cuenta, configuraciones, stats
- ContentController - Módulos, unidades, problemas
- ProgressController - Completar lecciones, reclamar tesoros
- GamificationController - Leaderboard, shop items, compras
- SwaggerRedirectController - Redirección a Swagger UI

**DTOs (19 archivos):**
- Auth: AuthResponseDTO, UserLoginDTO, UserRegistrationDTO, ForgotPasswordDTO
- User: UserInfoDTO, UserProfileDTO, UserAccountUpdateDTO, UserSettingsUpdateDTO, UserStatsDTO
- Content: ModuleResponseDTO, UnitDetailDTO, LessonTileDTO, ProblemDTO
- Progress: LessonResultDTO, LessonCompletionResponseDTO
- Gamification: LeaderboardDTO, LeaderboardEntryDTO, ShopItemDTO
- Common: ErrorDTO

**Services (16 archivos):**
- Auth: RegisterUserService, LoginUserService, ForgotPasswordService
- User: GetUserProfileService, GetUserStatsService, UpdateUserAccountService, UpdateUserSettingsService
- Content: GetModulesService, GetModuleUnitService, GetLessonProblemsService, GetModuleProblemsService
- Progress: CompleteLessonService, ClaimTreasureService
- Gamification: GetLeaderboardService, GetShopItemsService, PurchaseItemService

**Domain Models (14 archivos):**
- User, UserProfile, Module, Unit, Lesson, Problem
- UserLessonProgress, UserXpHistory, UserStreak
- ShopItem, UserInventory, Leaderboard, LeaderboardEntry, AuthToken

**Domain Exceptions (10 archivos):**
- UserNotFoundException, EmailAlreadyExistsException, UsernameAlreadyExistsException
- InvalidCredentialsException, LessonNotFoundException, LessonAlreadyCompletedException
- TreasureAlreadyClaimedException, ModuleNotFoundException
- InsufficientFundsException, ResourceNotFoundException

**JPA Entities (13 archivos):**
- UserEntity, UserProfileEntity, ModuleEntity, UnitEntity, LessonEntity, ProblemEntity
- UserLessonProgressEntity, UserXpHistoryEntity, UserStreakEntity
- ShopItemEntity, UserInventoryEntity, LeagueEntity
- Composite Keys: UserLessonProgressId, UserStreakId

**Repository Adapters (12 archivos):**
- Implementaciones de puertos de repositorio usando JPA

**Mappers (9 archivos):**
- **Web Mappers (5):** AuthApiMapper, UserApiMapper, ContentApiMapper, ProgressApiMapper, GamificationApiMapper
- **Persistence Mappers (4):** UserPersistenceMapper, ContentPersistenceMapper, ProgressPersistenceMapper, GamificationPersistenceMapper

---

## 🗄️ Database Schema

### Tablas Principales (12 tablas)
1. **users** - Cuentas de usuario (id, username, email, password, password_reset_token, created_at)
2. **user_profiles** - Perfiles de gamificación (user_id, lingots, daily_xp_goal, sound_effects_enabled, league)
3. **modules** - Módulos de aprendizaje (id, code, name, description, ui_config)
4. **units** - Unidades dentro de módulos (id, module_id, unit_number, description)
5. **lessons** - Lecciones individuales (id, unit_id, type, description, position)
6. **problems** - Problemas/preguntas (id, lesson_id, type, content, position)
7. **user_lesson_progress** - Progreso de lecciones (user_id, lesson_id, completed_at)
8. **user_xp_history** - Historial de XP (id, user_id, xp_earned, source_type, source_id, created_at)
9. **user_streaks** - Fechas de actividad (user_id, activity_date, created_at)
10. **shop_items** - Artículos de la tienda (id, name, description, cost)
11. **user_inventory** - Inventario de usuario (id, user_id, item_id, quantity, purchased_at)
12. **leagues** - Ligas de clasificación (id, name, description)

### Migrations (Flyway) - 8 archivos
- **V1__Create_Users_table.sql** - Tabla de usuarios
- **V2__Create_UserProfile_table.sql** - Perfiles de usuario
- **V3__Create_Content_Tables.sql** - Módulos, unidades, lecciones, problemas
- **V4__add_gamification_tables.sql** - Tabla de XP, streaks, shop, inventory
- **V5__add_password_reset_to_users.sql** - Campo de recuperación de contraseña
- **V6__Seed_Module_A_EP_BVA.sql** - Datos de módulo A (Partición de Equivalencia)
- **V7__Seed_Module_B_Decision_Table.sql** - Datos de módulo B (Tablas de Decisión)
- **V8__Seed_Module_C_Statement_Testing.sql** - Datos de módulo C (Statement Testing)

---

## 🚀 Deployment & DevOps

### Frontend Deployment
- **Platform:** Vercel / Netlify (recomendado para Next.js)
- **Build Command:** `pnpm build`
- **Output Directory:** `.next`
- **Start Command:** `pnpm start`
- **Node Version:** >= 18.0.0

### Backend Deployment
- **Containerization:** Docker
  - `Dockerfile` presente en `bughunter-api/bughunter-api/`
  - `docker-compose.yml` para orquestación
- **Application Server:** Spring Boot Embedded Tomcat (puerto 8080)
- **Build Tool:** Gradle con wrapper (`gradlew`, `gradlew.bat`)

### Environment Variables

**Frontend (.env.local):**
```bash
NEXT_PUBLIC_API_BASE=http://localhost:8080
```

**Backend (application.properties):**
```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/bughunter
spring.datasource.username=postgres
spring.datasource.password=password

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

# Flyway
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration

# JWT
jwt.secret=<SECRET_KEY>
jwt.expiration=86400000

# Gamification Rewards (configurable)
app.rewards.lesson.baseXp=10
app.rewards.lesson.lingot=5
app.rewards.treasure=20
```

---

## 📦 Dependency Management

### Frontend Dependencies (package.json)

**Production:**
```json
{
  "@t3-oss/env-nextjs": "^0.7.3",
  "dayjs": "^1.11.13",
  "next": "^14.2.11",
  "react": "18.3.1",
  "react-dom": "18.3.1",
  "zod": "^3.23.8",
  "zustand": "^4.5.7"
}
```

**Development:**
```json
{
  "@types/eslint": "^8.56.2",
  "@types/node": "^22.5.5",
  "@types/react": "^18.3.5",
  "@types/react-dom": "^18.3.0",
  "@typescript-eslint/eslint-plugin": "^6.19.0",
  "@typescript-eslint/parser": "^6.19.0",
  "autoprefixer": "^10.4.16",
  "eslint": "^8.56.0",
  "eslint-config-next": "^14.0.4",
  "postcss": "^8.4.47",
  "prettier": "^3.3.3",
  "prettier-plugin-tailwindcss": "^0.6.6",
  "tailwindcss": "^3.4.11",
  "typescript": "^5.3.0"
}
```

### Backend Dependencies (build.gradle)

**Core:**
```gradle
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
implementation 'org.springframework.boot:spring-boot-starter-security'
implementation 'org.springframework.boot:spring-boot-starter-web'
implementation 'org.springframework.boot:spring-boot-starter-validation'
```

**Database:**
```gradle
implementation 'org.flywaydb:flyway-core'
implementation 'org.flywaydb:flyway-database-postgresql'
runtimeOnly 'org.postgresql:postgresql'
```

**Security:**
```gradle
implementation 'io.jsonwebtoken:jjwt-api:0.12.6'
runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.12.6'
runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.12.6'
```

**Mapping & Utils:**
```gradle
implementation 'org.mapstruct:mapstruct:1.6.3'
compileOnly 'org.projectlombok:lombok:1.18.36'
annotationProcessor 'org.projectlombok:lombok:1.18.36'
annotationProcessor 'org.mapstruct:mapstruct-processor:1.6.3'
```

**Documentation:**
```gradle
implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.7.0'
```

**Development:**
```gradle
developmentOnly 'org.springframework.boot:spring-boot-devtools'
```

**Testing:**
```gradle
testImplementation 'org.springframework.boot:spring-boot-starter-test'
testImplementation 'org.springframework.security:spring-security-test'
```

---

## 🔧 Development Tools

### IDEs & Editors
- **Frontend:** Visual Studio Code
  - Extensiones recomendadas: ES7+ React/Redux snippets, Tailwind CSS IntelliSense, Prettier, ESLint
- **Backend:** IntelliJ IDEA / Eclipse
  - Plugins: Lombok, MapStruct Support, Spring Tools

### Version Control
- **Git:** Control de versiones
- **GitHub:** Repositorio remoto
- **Branch Strategy:** feature branches (ej: `feature/gamification-shop`)

### Code Quality Tools

**Frontend:**
- ESLint con configuración de Next.js y TypeScript
- Prettier con plugin de Tailwind CSS para orden de clases
- TypeScript compiler (`tsc`) para validación de tipos

**Backend:**
- Spring Boot DevTools para hot reload
- Lombok annotations processor
- MapStruct code generation
- Flyway para versionado de BD

---

## 📊 Performance Considerations

### Frontend Optimizations
- ✅ Next.js SSR/SSG para SEO y performance inicial
- ✅ Code splitting automático por página
- ✅ Lazy loading de componentes pesados
- ✅ Zustand para estado global eficiente (sin re-renders innecesarios)
- ✅ Fetch API sin dependencias pesadas (Axios)
- ✅ sessionStorage para datos de sesión (no localStorage)
- ✅ Tailwind CSS con purge para CSS optimizado
- ✅ TypeScript strict mode para catches de errores en tiempo de compilación

### Backend Optimizations
- ✅ HikariCP para pooling eficiente de conexiones DB
- ✅ JPA con lazy loading para relaciones
- ✅ Índices en BD para consultas frecuentes (user_id, lesson_id, activity_date)
- ✅ `@Transactional` para operaciones atómicas
- ✅ `@Transactional(readOnly = true)` para queries sin modificación
- ✅ MapStruct para mapping eficiente (generación en compile-time)
- ✅ JWT stateless (sin sesiones en servidor)
- ✅ Flyway para migraciones versionadas y reproducibles

---

## 🔐 Security Stack

### Frontend Security
- ✅ Token JWT almacenado en `sessionStorage` (mediante `storage.ts`)
- ✅ Validación de token en cada request protegido
- ✅ Redirección automática a login si token expirado (401)
- ✅ HTTPS en producción (recomendado)
- ✅ Type-safe environment variables con Zod
- ✅ Runtime validation con Zod para inputs críticos

### Backend Security
- ✅ Spring Security con filtro JWT (`JwtAuthenticationFilter`)
- ✅ BCrypt para hash de contraseñas (configurado con PasswordEncoder)
- ✅ Tokens JWT con expiración configurable (24h por defecto)
- ✅ CORS configurado para permitir frontend específico
- ✅ Validación de entrada con `@Valid` y Bean Validation (JSR-303)
- ✅ Exception handlers globales para errores consistentes
- ✅ Stateless sessions (no cookies de sesión)
- ✅ SQL injection prevention via JPA/Hibernate prepared statements

---

## 📈 Monitoring & Observability

### Backend Monitoring
- **Spring Actuator Endpoints:**
  - `/actuator/health` - Estado del servicio y dependencias (DB)
  - `/actuator/metrics` - Métricas de rendimiento (CPU, memoria, requests)
  - `/actuator/info` - Información de la aplicación

### Logging Strategy
- **Framework:** SLF4J + Logback (por defecto en Spring Boot)
- **Niveles:** `INFO`, `DEBUG`, `WARN`, `ERROR`
- **Logs Estructurados:** JSON format en producción (recomendado)
- **Auditoría:** Logs para operaciones críticas (login, registro, compras)

### Error Tracking
- Backend: GlobalApiExceptionHandler con logs automáticos
- Frontend: Console logs y error boundaries (recomendado implementar)

---

## 🌐 API Contract & Documentation

### OpenAPI Specification
- **Versión:** OpenAPI 3.0.3
- **Ubicación:** `.results/openapi.yml`
- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **Base URL:** http://localhost:8080/api

### Endpoints Implementados

**Auth (3):**
- POST `/auth/register`
- POST `/auth/login`
- POST `/auth/forgot-password`

**Content (3):**
- GET `/content/modules`
- GET `/content/modules/{moduleCode}/unit`
- GET `/content/modules/{moduleCode}/problems`

**User (4):**
- GET `/users/me/profile`
- GET `/users/me/stats`
- PUT `/users/me/account`
- PUT `/users/me/settings`

**Progress (2):**
- POST `/progress/lesson`
- POST `/progress/treasure/{lessonId}`

**Gamification (3):**
- GET `/leaderboard`
- GET `/shop/items`
- POST `/shop/purchase/{itemId}`

---

## 🎯 Key Features Implemented

### Phase 1: Authentication ✅
- Registro con selección de módulo
- Login con JWT
- Forgot password (placeholder)

### Phase 2: Content Delivery ✅
- Carga de módulos
- Carga de unidades con tiles (lecciones)
- Carga de problemas por lección
- Tipos de problema: INFO, MULTIPLE_CHOICE, FILL_IN_THE_BLANK

### Phase 3: Progress Tracking ✅
- Completar lección con recompensas (XP, lingots)
- Cálculo de racha basado en fechas de actividad
- Persistencia de progreso

### Phase 4: User Stats ✅
- GET `/users/me/stats` con XP total, lingots, racha, XP hoy/semana, días activos

### Phase 5: Profile Management ✅
- GET `/users/me/profile` con perfil completo
- PUT `/users/me/account` para actualizar nombre/username
- PUT `/users/me/settings` para configuraciones (dailyXpGoal, soundEffectsEnabled)

### Phase 6: Gamification ✅
- Claim treasure (POST `/progress/treasure/{lessonId}`)
- Leaderboard por liga (GET `/leaderboard`)
- Shop items (GET `/shop/items`)
- Purchase item (POST `/shop/purchase/{itemId}`)

---

## 📋 Project Metadata

- **Inspiración:** T3 Stack (create-t3-app v7.13.0)
- **Nombre Interno:** react-duolingo
- **Licencia:** (No especificada en package.json)
- **Repositorio:** BugHunter-Saga (GitHub)
- **Branch Actual:** feature/gamification-shop
- **Default Branch:** main

---

## 🔄 Recent Changes (Detected)

### Frontend Changes:
1. ✨ **Nuevo:** `src/components/UnitProgressCard.tsx` - Componente para mostrar progreso de unidades
2. ✨ **Nuevo:** `src/stores/createShopSlice.ts` - Store para gestión de la tienda
3. ✨ **Nuevo:** `src/services/shopService.ts` - Servicio para API de shop
4. ✨ **Nuevo:** `src/types/shop.ts` - Tipos para ShopItemDTO
5. ✨ **Nuevo:** `src/utils/storage.ts` - Abstracción de sessionStorage
6. ✨ **Nuevo:** `src/pages/tutorial.tsx` - Página de tutorial
7. ✨ **Eliminado:** `src/components/Svgs.tsx` - Reemplazado por iconos modulares en `src/components/icons/`
8. ✅ **Refactor:** Sistema de iconos modularizado en 76 archivos SVG organizados por categoría

---

**📌 Notas Importantes:**
- Stack actualizado basado en análisis real del proyecto (Diciembre 3, 2025)
- Todas las dependencias verificadas en `package.json` y `build.gradle`
- Arquitectura documentada según código fuente actual
- Nuevas features de gamificación-shop implementadas en frontend y backend
