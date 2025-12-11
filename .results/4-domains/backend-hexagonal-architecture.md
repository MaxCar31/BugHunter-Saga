# Backend Hexagonal Architecture Domain

## Overview
The backend follows **Hexagonal Architecture** (Ports & Adapters pattern), also known as Clean Architecture. This separates business logic from infrastructure concerns through strict layering and dependency inversion.

## Layer Structure

```
com.bughuntersaga.api/
├── domain/                    # Core business logic (no dependencies)
│   ├── model/                # Domain entities (User, Module, Lesson, etc.)
│   └── exception/            # Domain-specific exceptions
├── application/              # Use case orchestration
│   ├── service/              # Use case implementations
│   ├── port/
│   │   ├── in/              # Inbound ports (use case interfaces)
│   │   └── out/             # Outbound ports (repository/infrastructure interfaces)
│   └── dto/                 # Application-layer command objects
└── infrastructure/          # External concerns (frameworks, databases, APIs)
    ├── web/                 # REST controllers, DTOs, exception handlers
    ├── persistence/         # JPA entities, repositories, adapters
    ├── security/            # JWT, authentication, authorization
    ├── config/              # Spring configuration beans
    └── adapters/            # Email, external services
```

## Dependency Rules

### The Dependency Rule
Dependencies **ALWAYS** point inward:
- **Infrastructure → Application → Domain**
- **Domain** has ZERO dependencies (pure Java)
- **Application** depends only on Domain
- **Infrastructure** depends on Application + Domain

```
┌─────────────────────────────────────────┐
│        Infrastructure Layer              │  ← Framework-specific code
│  (Controllers, JPA, Security, Config)   │     (Spring Boot, Hibernate)
└───────────────┬─────────────────────────┘
                │ depends on
                ↓
┌─────────────────────────────────────────┐
│        Application Layer                 │  ← Use case logic
│     (Services, Ports, Commands)         │     (business workflows)
└───────────────┬─────────────────────────┘
                │ depends on
                ↓
┌─────────────────────────────────────────┐
│           Domain Layer                   │  ← Pure business rules
│    (Models, Domain Exceptions)          │     (no frameworks)
└─────────────────────────────────────────┘
```

## Domain Layer (Inner Circle)

### Domain Models
Pure Java objects representing business entities with NO framework dependencies:

```java
package com.bughuntersaga.api.domain.model;

import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    private UUID id;
    private String username;
    private String email;
    private String passwordHash;
    private String name;
    private String lastname;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String passwordResetToken;
    private ZonedDateTime passwordResetExpires;
}
```

#### Key Characteristics:
- No `@Entity` annotation (that's infrastructure!)
- No JPA annotations (`@Id`, `@Column`, etc.)
- No Spring annotations
- Use Lombok for boilerplate (`@Builder`, `@Getter`, `@Setter`)
- Plain Java types (no framework types)

### Domain Exceptions
Custom business exceptions:

```java
package com.bughuntersaga.api.domain.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
```

All domain exceptions extend `RuntimeException` and have descriptive names like:
- `UserNotFoundException`
- `LessonAlreadyCompletedException`
- `InsufficientLigotsException`
- `InvalidCredentialsException`

## Application Layer (Middle Circle)

### Inbound Ports (Use Case Interfaces)
Define **what** the application can do (contract for the outside world):

```java
package com.bughuntersaga.api.application.port.in;

import com.bughuntersaga.api.application.dto.CompleteLessonCommand;

/**
 * Caso de uso para registrar la finalización de una lección.
 */
public interface CompleteLessonUseCase {
    /**
     * @param command DTO con los detalles de la lección completada.
     * @return Un objeto CompleteLessonResult con las recompensas obtenidas.
     * @throws LessonAlreadyCompletedException si la lección ya fue completada.
     */
    CompleteLessonResult handle(CompleteLessonCommand command);
}
```

#### Naming Convention:
- Interface names end in `UseCase`: `GetUserProfileUseCase`, `LoginUserUseCase`, `CompleteLessonUseCase`
- Method typically named `handle()`, `execute()`, or verb describing the action
- Return result objects for complex responses: `CompleteLessonResult`, `LoginResult`

### Outbound Ports (Repository Interfaces)
Define **how** the application interacts with infrastructure (contract for persistence):

```java
package com.bughuntersaga.api.application.port.out;

import com.bughuntersaga.api.domain.model.User;
import java.util.Optional;
import java.util.UUID;

public interface UserRepositoryPort {
    /**
     * Guarda o actualiza un usuario.
     */
    User save(User user);

    /**
     * Busca un usuario por su username.
     */
    Optional<User> findByUsername(String username);

    /**
     * Busca un usuario por su email.
     */
    Optional<User> findByEmail(String email);

    /**
     * Busca un usuario por username O email (para el login).
     */
    Optional<User> findByUsernameOrEmail(String username, String email);

    boolean existsByUsernameAndIdNot(String username, UUID userId);
}
```

#### Naming Convention:
- Interface names end in `Port`: `UserRepositoryPort`, `LessonRepositoryPort`, `EmailSenderPort`
- Return **domain models**, NOT entities
- Use `Optional<T>` for queries that may not find results
- Located in `application/port/out/` (application defines the contract)

### Application Services (Use Case Implementations)
Implement inbound ports (use cases) by orchestrating domain logic and outbound ports:

```java
package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.port.in.GetUserProfileUseCase;
import com.bughuntersaga.api.application.port.out.UserProfileRepositoryPort;
import com.bughuntersaga.api.application.port.out.UserRepositoryPort;
import com.bughuntersaga.api.domain.exception.UserNotFoundException;
import com.bughuntersaga.api.domain.model.FullUserProfile;
import com.bughuntersaga.api.domain.model.User;
import com.bughuntersaga.api.domain.model.UserProfile;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetUserProfileService implements GetUserProfileUseCase {

    // Constructor injection via @RequiredArgsConstructor (Lombok)
    private final UserRepositoryPort userRepositoryPort;
    private final UserProfileRepositoryPort userProfileRepositoryPort;

    @Override
    public FullUserProfile getProfile() {
        // 1. Obtener usuario autenticado
        User currentUser = getCurrentUser();
        UserProfile userProfile = getUserProfile(currentUser.getId());

        // 2. Combinar en el modelo de dominio
        return FullUserProfile.builder()
                .userId(currentUser.getId())
                .name(currentUser.getName())
                .username(currentUser.getUsername())
                .email(currentUser.getEmail())
                .joinedAt(currentUser.getCreatedAt())
                .lingots(userProfile.getLingots())
                .dailyXpGoal(userProfile.getDailyXpGoal())
                .soundEffectsEnabled(userProfile.getSoundEffectsEnabled())
                .build();
    }

    // --- Helper methods (reusable) ---

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepositoryPort.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado: " + username));
    }

    private UserProfile getUserProfile(UUID userId) {
        return userProfileRepositoryPort.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Perfil de usuario no encontrado."));
    }
}
```

#### Key Characteristics:
- Annotated with `@Service` (Spring) and `@RequiredArgsConstructor` (Lombok)
- Implements one inbound port (use case interface)
- Depends on outbound ports (repository interfaces)
- Uses `@Transactional` for database operations
- Works with **domain models**, NOT entities
- Throws **domain exceptions**, NOT persistence exceptions
- Helper methods for reusable logic

### Command DTOs
Data transfer objects for complex inputs:

```java
package com.bughuntersaga.api.application.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompleteLessonCommand {
    private String moduleCode;
    private String lessonCode;
}
```

## Infrastructure Layer (Outer Circle)

### Persistence Adapters (Repository Implementations)
Implement outbound ports using JPA and entity mappers:

```java
package com.bughuntersaga.api.infrastructure.persistence.adapter;

import com.bughuntersaga.api.application.port.out.UserRepositoryPort;
import com.bughuntersaga.api.domain.model.User;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserEntity;
import com.bughuntersaga.api.infrastructure.persistence.mapper.UserPersistenceMapper;
import com.bughuntersaga.api.infrastructure.persistence.repository.UserJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class UserRepositoryAdapter implements UserRepositoryPort {

    // Dependencies on infrastructure components
    private final UserJpaRepository userJpaRepository;
    private final UserPersistenceMapper userPersistenceMapper;

    @Override
    public User save(User user) {
        // 1. Map Domain → Entity
        UserEntity userEntity = userPersistenceMapper.toUserEntity(user);
        // 2. Save Entity via JPA
        UserEntity savedEntity = userJpaRepository.save(userEntity);
        // 3. Map Entity → Domain
        return userPersistenceMapper.toUserDomain(savedEntity);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userJpaRepository.findByUsername(username)
                .map(userPersistenceMapper::toUserDomain);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userJpaRepository.findByEmail(email)
                .map(userPersistenceMapper::toUserDomain);
    }

    @Override
    public Optional<User> findByUsernameOrEmail(String username, String email) {
        return userJpaRepository.findByUsernameOrEmail(username, email)
                .map(userPersistenceMapper::toUserDomain);
    }
    
    @Override
    public boolean existsByUsernameAndIdNot(String username, UUID userId) {
        return userJpaRepository.existsByUsernameAndIdNot(username, userId);
    }
}
```

#### Key Characteristics:
- Annotated with `@Repository` (Spring)
- Implements outbound port interface (e.g., `UserRepositoryPort`)
- Depends on JPA repository and mapper
- **Always maps** between Entity ↔ Domain Model
- Returns domain models, NOT entities
- Delegates to Spring Data JPA repository

### REST Controllers
Entry points for HTTP requests (implements inbound adapters):

```java
package com.bughuntersaga.api.infrastructure.web.controller;

import com.bughuntersaga.api.application.port.in.GetUserProfileUseCase;
import com.bughuntersaga.api.domain.model.FullUserProfile;
import com.bughuntersaga.api.infrastructure.web.dto.UserProfileResponseDto;
import com.bughuntersaga.api.infrastructure.web.mapper.UserApiMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/me")
@RequiredArgsConstructor
public class UserController {

    // Depends on use case interface (inbound port)
    private final GetUserProfileUseCase getUserProfileUseCase;
    private final UserApiMapper userApiMapper;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponseDto> getUserProfile() {
        // 1. Execute use case (returns domain model)
        FullUserProfile profile = getUserProfileUseCase.getProfile();
        // 2. Map Domain → API DTO
        UserProfileResponseDto responseDto = userApiMapper.toUserProfileResponseDto(profile);
        // 3. Return HTTP response
        return ResponseEntity.ok(responseDto);
    }
}
```

#### Key Characteristics:
- Annotated with `@RestController` and `@RequestMapping`
- Depends on use case interfaces (inbound ports), NOT services directly
- Maps between API DTOs ↔ Domain Models
- Returns `ResponseEntity<T>` with HTTP status
- No business logic (delegates to use cases)

## Key Patterns & Practices

### 1. Dependency Injection
**ALWAYS use constructor injection** with `@RequiredArgsConstructor` (Lombok):

```java
@Service
@RequiredArgsConstructor
public class CompleteLessonService implements CompleteLessonUseCase {
    private final UserRepositoryPort userRepositoryPort;
    private final LessonRepositoryPort lessonRepositoryPort;
    private final UserXpHistoryRepositoryPort xpHistoryRepositoryPort;
    // Constructor auto-generated by Lombok
}
```

### 2. Mapping Layers
**Three types of mappers** using MapStruct:

- **Persistence Mappers**: Entity ↔ Domain Model
  - `UserPersistenceMapper`: `UserEntity` ↔ `User`
  - Located in `infrastructure/persistence/mapper/`

- **API Mappers**: API DTO ↔ Domain Model
  - `UserApiMapper`: `UserProfileResponseDto` ↔ `FullUserProfile`
  - Located in `infrastructure/web/mapper/`

### 3. Transactionality
Use `@Transactional` on service methods:

```java
@Service
@Transactional(readOnly = true)  // Default: read-only
public class GetUserProfileService implements GetUserProfileUseCase {
    
    @Override
    public FullUserProfile getProfile() { /* read-only query */ }
}

@Service
@Transactional  // Write operations need full transaction
public class CompleteLessonService implements CompleteLessonUseCase {
    
    @Override
    public CompleteLessonResult handle(CompleteLessonCommand command) {
        // Multiple writes in one transaction
    }
}
```

### 4. Exception Handling
- **Domain exceptions** thrown by services
- **Caught by GlobalApiExceptionHandler** in infrastructure layer
- Translated to HTTP responses

### 5. Port Naming Conventions

| Component | Naming Pattern | Example |
|-----------|---------------|---------|
| Inbound Port Interface | `{Action}UseCase` | `GetUserProfileUseCase` |
| Outbound Port Interface | `{Resource}RepositoryPort` or `{Service}Port` | `UserRepositoryPort`, `EmailSenderPort` |
| Service Implementation | `{Action}Service` | `GetUserProfileService` |
| Repository Adapter | `{Resource}RepositoryAdapter` | `UserRepositoryAdapter` |
| Controller | `{Resource}Controller` | `UserController` |

## Benefits of This Architecture

✅ **Testability**: Business logic isolated from frameworks
✅ **Flexibility**: Easy to swap databases, frameworks, or delivery mechanisms
✅ **Maintainability**: Clear separation of concerns
✅ **Domain Focus**: Core business rules are framework-independent
✅ **Dependency Inversion**: High-level modules don't depend on low-level details

## Example: Complete Flow

### User requests profile data

```
1. HTTP GET /api/users/me/profile
   ↓
2. UserController (Infrastructure)
   - Receives HTTP request
   - Calls getUserProfileUseCase.getProfile()
   ↓
3. GetUserProfileService (Application)
   - Orchestrates use case logic
   - Calls userRepositoryPort.findByUsername()
   - Calls userProfileRepositoryPort.findById()
   - Builds FullUserProfile domain model
   ↓
4. UserRepositoryAdapter (Infrastructure)
   - Calls userJpaRepository.findByUsername()
   - Maps UserEntity → User domain model
   - Returns User
   ↓
5. UserJpaRepository (Spring Data JPA)
   - Executes SQL query
   - Returns UserEntity
   ↓
6. Flow returns back up:
   - Adapter maps Entity → Domain
   - Service combines data into FullUserProfile
   - Controller maps Domain → UserProfileResponseDto
   - HTTP 200 OK with JSON response
```

## Summary

The hexagonal architecture enforces:
- **Clean separation** between business logic and infrastructure
- **Dependency inversion** (core doesn't know about frameworks)
- **Testable business rules** (no need for Spring context in domain tests)
- **Flexibility to change** databases, frameworks, or APIs without touching business logic
- **Clear contracts** via ports (interfaces) between layers
