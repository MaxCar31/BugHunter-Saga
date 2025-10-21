## Fase 0: El Cimiento (Configuración del Proyecto)

**Objetivo:** Tener un proyecto Spring Boot funcional que se conecte a tu base de datos y tenga el esquema inicial listo.

1.  **Proyecto Spring Boot:** Asegúrate de que tu `build.gradle` (o `pom.xml`) tenga todas las dependencias necesarias:
    * `spring-boot-starter-web` (para la API)
    * `spring-boot-starter-data-jpa` (para la base de datos)
    * `spring-boot-starter-security` (para la autenticación)
    * `spring-boot-starter-validation` (para los DTOs)
    * `org.postgresql:postgresql` (el driver de tu BD)
    * `org.flywaydb:flyway-core` (¡Muy importante! Para migraciones de BD)
    * `org.projectlombok:lombok` (para reducir código)
    * `org.mapstruct:mapstruct` y `mapstruct-processor` (para los mappers)
    * `io.jsonwebtoken:jjwt-api`, `jjwt-impl`, `jjwt-jackson` (para los tokens JWT)

2.  **Generar la Estructura:** Ejecuta el script de Python que creamos (con la corrección de Lombok que hicimos) para generar toda la estructura de carpetas y archivos.

3.  **Configurar la Base de Datos (`application.properties`):**
    * Crea el archivo `src/main/resources/application.properties`.
    * Añade la configuración para conectarte a tu base de datos PostgreSQL (como vimos en el error anterior).

4.  **Configurar Flyway (Migración de BD):**
    * Crea la carpeta `src/main/resources/db/migration`.
    * Renombra tu archivo `Untitled.sql` a `V1__init_schema.sql` y muévelo a esa carpeta.
    * **¡Importante!** Tu SQL no tiene las tablas para la tienda (`shop_items`, `user_inventory`) ni para las ligas (`leagues`). Añádelas a tu archivo `V1__init_schema.sql` para que Flyway las cree.

5.  **Arrancar la Aplicación:** Ejecuta `BugHunterSagaApiApplication`. La aplicación debería arrancar, conectarse a la BD y Flyway debería ejecutar tu script `V1__init_schema.sql`, creando todas las tablas. Si esto funciona, estás listo para la Fase 1.

---

## Fase 1: Autenticación y Usuarios (El Portal de Entrada) 🔑

**Objetivo:** Permitir que un usuario se registre e inicie sesión. Esta es la base de todo lo demás.

1.  **Feature: Registrar Usuario (`POST /auth/register`)**
    * **Capa `Infrastructure` (Web):**
        * Completa el `UserRegistrationDTO` con las validaciones de tu OpenAPI (`@NotBlank`, `@Email`, `@Size`).
        * Completa el `AuthApiMapper` para convertir `UserRegistrationDTO` al DTO de aplicación `RegisterUserCommand`.
        * En `AuthController`, implementa el endpoint `@PostMapping("/register")` que llama al `RegisterUserUseCase`.
    * **Capa `Application` (Lógica):**
        * En `RegisterUserService` (que implementa `RegisterUserUseCase`):
            1.  Llama a `PasswordEncoderPort` para hashear la contraseña del `RegisterUserCommand`.
            2.  Crea un objeto de dominio `User` y `UserProfile`.
            3.  Llama a `UserRepositoryPort` y `UserProfileRepositoryPort` para guardarlos. **Importante:** Esto debe ser transaccional. (Usa `@Transactional` de Spring en el método del servicio).
            4.  Llama a `TokenGeneratorPort` para crear un JWT para el nuevo usuario.
            5.  Devuelve el objeto de dominio `AuthToken`.
    * **Capa `Infrastructure` (Adaptadores):**
        * Implementa `SpringPasswordEncoderAdapter` (usando `BCryptPasswordEncoder` de Spring).
        * Implementa `JwtTokenGeneratorAdapter` (usando la librería `jjwt`).
        * Implementa `UserRepositoryAdapter` y `UserProfileRepositoryAdapter` (usando los `JpaRepository` y sus `PersistenceMappers`).

2.  **Feature: Iniciar Sesión (`POST /auth/login`)**
    * **Capa `Infrastructure` (Web):**
        * Completa el `UserLoginDTO`.
        * Añade el método al `AuthApiMapper`.
        * En `AuthController`, implementa el endpoint `@PostMapping("/login")`.
    * **Capa `Application` (Lógica):**
        * En `LoginUserService`:
            1.  Llama a `UserRepositoryPort` para buscar al usuario por `emailOrUsername`. Si no existe, lanza `InvalidCredentialsException`.
            2.  Llama a `PasswordEncoderPort` para comparar la contraseña del DTO con el hash de la BD. Si no coincide, lanza `InvalidCredentialsException`.
            3.  Llama a `TokenGeneratorPort` para crear un nuevo JWT.
            4.  Devuelve el `AuthToken`.
    * **Capa `Infrastructure` (Adaptadores):**
        * Añade los métodos `findByEmail` y `findByUsername` a `UserRepositoryAdapter` y `UserJpaRepository`.

---

## Fase 2: Entrega de Contenido (El Mundo del Juego) 🗺️

**Objetivo:** Permitir que los usuarios vean el contenido del curso. Por ahora, nos centraremos en la *lectura* de datos.

1.  **Poblar la BD:** Escribe un nuevo script de migración de Flyway (ej. `V2__seed_content.sql`) para insertar datos de prueba en las tablas `modules`, `units`, `lessons`, y `problems`. Sin datos, la API no devolverá nada.

2.  **Feature: Obtener Módulos (`GET /content/modules`)**
    * **Capa `Infrastructure` (Web):** En `ContentController`, implementa `@GetMapping("/modules")`.
    * **Capa `Application` (Lógica):** En `GetModulesService`, llama a `ModuleRepositoryPort.findAll()`.
    * **Capa `Infrastructure` (Adaptadores):** Implementa `ModuleRepositoryAdapter.findAll()`.
    * **Mappers:** Asegúrate de que tus mappers (API y Persistencia) conviertan `ModuleEntity` -> `Module` (dominio) -> `ModuleSummaryDTO`.

3.  **Feature: Obtener Problemas del Módulo (`GET /content/modules/{moduleCode}/problems`)**
    * **Capa `Infrastructure` (Web):** En `ContentController`, implementa `@GetMapping("/modules/{moduleCode}/problems")`.
    * **Capa `Application` (Lógica):** En `GetModuleProblemsService`:
        1.  Llama a `ProblemRepositoryPort.findProblemsByModuleCode(moduleCode)`.
    * **Capa `Infrastructure` (Adaptadores):** En `ProblemJpaRepository`, tendrás que escribir una consulta JPQL o SQL nativo complejo para unir `Problem` -> `Lesson` -> `Unit` -> `Module` y filtrar por `module.code`.

4.  **Feature: Obtener Unidad del Módulo (`GET /content/modules/{moduleCode}/unit`)**
    * **Complejidad:** Este es tu primer endpoint *dinámico*. El `LessonTileDTO` requiere un `status` (`LOCKED`, `ACTIVE`, `COMPLETE`) que depende del progreso del usuario.
    * **Simplificación (Paso 1):** Por ahora, ignora el progreso. Implementa el `GetModuleUnitService` para que solo devuelva la información de la unidad y sus lecciones, **marcando todos los `status` como `ACTIVE`**.
    * **Paso 2 (Refactorización):** Dejaremos la lógica de `status` para la Fase 4, después de que implementemos el progreso.

---

## Fase 3: El Loop de Juego (Registrar Progreso) 🏆

**Objetivo:** Implementar la lógica de negocio más importante: completar una lección.

1.  **Feature: Registrar Finalización de Lección (`POST /progress/lesson`)**
    * **Capa `Infrastructure` (Web):** En `ProgressController`, implementa `@PostMapping("/lesson")`.
    * **Capa `Application` (Lógica):** Esta es tu lógica más compleja. En `CompleteLessonService` (que debe ser `@Transactional`):
        1.  Obtén el ID del usuario autenticado (desde el `SecurityContext` de Spring).
        2.  Valida la entrada (`LessonResultDTO`).
        3.  **Lógica de Negocio:**
            * Llama a `UserLessonProgressRepositoryPort` para guardar la lección completada.
            * Calcula el XP (basado en `correctAnswerCount`, etc.). Llama a `UserXpHistoryRepositoryPort` para guardar el registro de XP.
            * **Lógica de Racha:** Llama a `UserStreakRepositoryPort`. Esta lógica es complicada: debe verificar la fecha de hoy, la última fecha de racha, y si la racha continúa o se rompe.
            * **Lógica de Recompensas:** Si `isPractice` es falso, calcula los `lingots` ganados. Llama a `UserProfileRepositoryPort` para *incrementar* los lingots del usuario.
        4.  Devuelve un `LessonCompletionResponseDTO` (mapeado desde el dominio) con el XP y lingots ganados.
    * **Capa `Infrastructure` (Adaptadores):** Implementa todos los métodos de repositorio necesarios (guardar progreso, actualizar lingots de perfil, etc.).

---

## Fase 4: Personalización y Estadísticas (El Dashboard) 📊

**Objetivo:** Hacer que la aplicación se sienta "viva" mostrando al usuario sus estadísticas y progreso real.

1.  **Feature: Obtener Estadísticas del Usuario (`GET /users/me/stats`)**
    * **Capa `Infrastructure` (Web):** En `UserController`, implementa `@GetMapping("/me/stats")`.
    * **Capa `Application` (Lógica):** En `GetUserStatsService`:
        1.  Este servicio orquestará múltiples llamadas a puertos:
        2.  Llama a `UserProfileRepositoryPort` para obtener `totalLingots`.
        3.  Llama a `UserXpHistoryRepositoryPort` para `SUM(xp_earned)` (total, hoy, esta semana).
        4.  Llama a `UserStreakRepositoryPort` para calcular el `currentStreak`.
        5.  Llama a `LeaderboardRepositoryPort` para obtener el `leagueRank` (¡esta es una consulta compleja!).
        6.  Combina todo en un objeto de dominio `UserStats` y devuélvelo.
    * **Reto Clave:** Estas serán consultas de agregación (SUM, COUNT). Escríbelas en tus `JpaRepository` con `@Query` para optimizarlas.

2.  **Feature: Reclamar Tesoro (`POST /progress/treasure/{lessonId}`)**
    * **Capa `Application` (Lógica):** En `ClaimTreasureService` (también `@Transactional`):
        1.  Verifica que el tesoro (lección) no haya sido reclamado (probablemente usando `UserLessonProgressRepositoryPort`).
        2.  Otorga una cantidad aleatoria (o fija) de `lingots` (actualizando `UserProfile`).
        3.  Marca el tesoro como reclamado.

3.  **Refactorización: `GET /content/modules/{moduleCode}/unit`**
    * Ahora, vuelve al `GetModuleUnitService` (Fase 2).
    * Modifícalo para que, además de obtener las lecciones, llame a `UserLessonProgressRepositoryPort.findAllByUserId()` para obtener la lista de lecciones completadas por el usuario.
    * Usa esta lista para calcular el `status` real (`LOCKED`, `ACTIVE`, `COMPLETE`) de cada `LessonTileDTO`.

---

## Fase 5: Gestión de Perfil (Ajustes y Configuración) ⚙️

**Objetivo:** Implementar las funciones de "Configuración" de la cuenta.

1.  **Feature: Obtener Perfil (`GET /users/me/profile`)**
    * **Complejidad:** Fácil.
    * **Implementación:** Una simple llamada en `GetUserProfileService` a `UserRepositoryPort` y `UserProfileRepositoryPort` para obtener los datos combinados del usuario.

2.  **Feature: Actualizar Cuenta (`PUT /users/me/account`)**
    * **Complejidad:** Media.
    * **Implementación:** En `UpdateUserAccountService`, actualiza los campos `name` y `username`.
    * **Reto Clave:** Debes validar que el nuevo `username` no esté ya en uso (`UserRepositoryPort.existsByUsername()`).

3.  **Feature: Actualizar Configuración (`PUT /users/me/settings`)**
    * **Complejidad:** Fácil.
    * **Implementación:** En `UpdateUserSettingsService`, simplemente actualiza los campos `dailyXpGoal` y `soundEffectsEnabled` en la tabla `user_profiles`.

---

## Fase 6: Gamificación Avanzada (Tienda y Competición) 🛒

**Objetivo:** Implementar las características "meta" que completan la experiencia de juego.

1.  **Feature: Obtener Artículos de la Tienda (`GET /shop/items`)**
    * **Complejidad:** Fácil.
    * **Implementación:** Primero, añade un script de migración `V3__seed_shop.sql` para poblar la tabla `shop_items`.
    * Luego, implementa `GetShopItemsService` para que llame a `ShopItemRepositoryPort.findAll()`.

2.  **Feature: Obtener Tabla de Clasificación (`GET /leaderboard`)**
    * **Complejidad:** **Alta**.
    * **Implementación:** En `GetLeaderboardService`:
        1.  Esta es la consulta más difícil. Necesitas llamar a `UserXpHistoryRepositoryPort` y hacer una consulta con `GROUP BY user_id`, `SUM(xp_earned)`, `WHERE created_at` esté en la semana actual (`BETWEEN` lunes y domingo), y finalmente `ORDER BY SUM(xp_earned) DESC`.
        2.  Esto te dará una lista de IDs y XP, que tendrás que enriquecer con los nombres de usuario (`UserRepositoryPort`) para crear los `LeaderboardEntryDTO`.

3.  **Feature: Comprar Artículo (`POST /shop/purchase/{itemId}`)**
    * **Complejidad:** Media (¡Transaccional!).
    * **Implementación:** En `PurchaseItemService` (`@Transactional`):
        1.  Obtén el `ShopItem` (de `ShopItemRepositoryPort`) para saber el `cost`.
        2.  Obtén el `UserProfile` (de `UserProfileRepositoryPort`) para saber los `lingots` del usuario.
        3.  Compara: Si `lingots >= cost`:
            * Resta el costo: `userProfile.setLingots(userProfile.getLingots() - cost)`.
            * Guarda el perfil actualizado.
            * Añade el item al inventario del usuario (inserta en `user_inventory` - ¡necesitarás esta tabla y su repositorio!).
        4.  Si no, lanza `InsufficientFundsException`.

---

## Fase 7: Tareas Pendientes (El "Placeholder") 📬

**Objetivo:** Implementar las funciones de baja prioridad.

1.  **Feature: Olvidé Contraseña (`POST /auth/forgot-password`)**
    * **Por qué al final?** Requiere una infraestructura externa: un **servicio de envío de correos** (como SendGrid, AWS SES, o Mailgun).
    * **Implementación:**
        1.  Crea un `EmailServicePort` (en `application/port/out`).
        2.  Implementa un `SmtpEmailServiceAdapter` (en `infrastructure/adapter/outbound/email`).
        3.  En `ForgotPasswordService`, genera un token de reseteo único, guárdalo en la BD (quizás en la tabla `users` con una caducidad) y usa el `EmailServicePort` para enviar el correo.