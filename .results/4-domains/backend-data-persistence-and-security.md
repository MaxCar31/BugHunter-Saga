# Backend Data Persistence & Security Domains

## Backend Data Persistence Domain

### Overview
Persistence uses **JPA/Hibernate** with **PostgreSQL** database, **MapStruct** for DTO/Entity mapping, and **Flyway** for database migrations. Entities are kept separate from domain models through the repository adapter pattern.

### Entity Structure

#### Naming Convention
All JPA entities end with `Entity` suffix:
- `UserEntity`, `LessonEntity`, `ModuleEntity`
- `UserProfileEntity`, `UserStreakEntity`
- Located in `infrastructure/persistence/entity/`

#### Standard Entity Pattern

```java
@Entity
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = "username"),
    @UniqueConstraint(columnNames = "email")
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 100)
    private String lastname;

    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UserProfileEntity userProfile;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
```

#### Key Characteristics:
- ✅ `@Entity` + `@Table` annotations
- ✅ Lombok: `@Getter`, `@Setter`, `@Builder`, `@NoArgsConstructor`, `@AllArgsConstructor`
- ✅ `@Id` with `@GeneratedValue(strategy = GenerationType.UUID)` for UUIDs
- ✅ `@Column` for column-specific constraints (length, nullable, unique, name mapping)
- ✅ `@PrePersist` and `@PreUpdate` for automatic timestamps
- ✅ `snake_case` column names via `@Column(name = "...")`

### JPA Repositories

#### Naming Convention
Spring Data JPA repositories end with `JpaRepository` suffix:
- `UserJpaRepository`, `LessonJpaRepository`
- Located in `infrastructure/persistence/repository/`

#### Repository Pattern

```java
package com.bughuntersaga.api.infrastructure.persistence.repository;

import com.bughuntersaga.api.infrastructure.persistence.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserJpaRepository extends JpaRepository<UserEntity, UUID> {
    
    // Query methods (Spring Data generates implementations)
    Optional<UserEntity> findByUsername(String username);
    
    Optional<UserEntity> findByEmail(String email);
    
    Optional<UserEntity> findByUsernameOrEmail(String username, String email);
    
    boolean existsByUsernameAndIdNot(String username, UUID userId);
}
```

**Key Points:**
- Extends `JpaRepository<EntityType, IDType>`
- Spring Data auto-implements methods based on naming convention
- Returns `Optional<T>` for single results
- Returns `boolean` for existence checks
- Annotated with `@Repository`

### MapStruct Mappers

#### Persistence Mappers
Map between **Entity** (JPA) ↔ **Domain Model** (pure Java):

```java
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserPersistenceMapper {

    // Entity → Domain
    User toUserDomain(UserEntity userEntity);
    
    // Domain → Entity
    UserEntity toUserEntity(User user);
    
    // With custom mappings
    @Mapping(source = "userId", target = "userId")
    UserProfile toUserProfileDomain(UserProfileEntity entity);
    
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "user", ignore = true)
    UserProfileEntity toUserProfileEntity(UserProfile domain);
}
```

**Characteristics:**
- Interface (MapStruct generates implementation)
- `componentModel = "spring"` makes it a Spring bean
- `unmappedTargetPolicy = ReportingPolicy.IGNORE` for flexibility
- `@Mapping` for field name differences or ignored fields
- Located in `infrastructure/persistence/mapper/`

#### Naming Convention
- Interface names: `{Entity}PersistenceMapper`
- Methods: `to{Type}Domain()` or `to{Type}Entity()`

### Flyway Migrations

#### Migration Files
- Located in: `src/main/resources/db/migration/`
- Naming: `V{version}__{description}.sql`
- Examples:
  - `V1__Create_users_table.sql`
  - `V2__Add_streaks_table.sql`
  - `V3__Alter_lessons_add_type.sql`

#### Migration Best Practices
```sql
-- V1__Create_users_table.sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    lastname VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
```

**Key Points:**
- ✅ Use `snake_case` for table/column names
- ✅ Add indexes for frequently queried columns
- ✅ Use `UUID` type with `gen_random_uuid()` for PostgreSQL
- ✅ Set defaults where appropriate
- ✅ Never modify existing migrations (create new ones)

---

## Backend Security & Authentication Domain

### Overview
Authentication uses **JWT (JSON Web Tokens)** with **BCrypt** password hashing. The system is stateless (no sessions), with Spring Security configured for CORS, CSRF, and endpoint protection.

### JWT Token Generation

#### Token Generator Adapter

```java
package com.bughuntersaga.api.infrastructure.security.adapter;

import com.bughuntersaga.api.application.port.out.TokenGeneratorPort;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTokenGeneratorAdapter implements TokenGeneratorPort {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration:86400000}") // 24h default
    private long jwtExpiration;

    @Override
    public String generateToken(String username) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}
```

**Key Points:**
- Implements `TokenGeneratorPort` (outbound port)
- Uses `jjwt` library (0.12.3)
- Secret key from `application.properties`
- Expiration time configurable (default 24h)
- Subject = username (used for authentication)

### Password Encoding

#### Password Encoder Adapter

```java
@Component
public class SpringPasswordEncoderAdapter implements PasswordEncoderPort {

    private final PasswordEncoder passwordEncoder;

    public SpringPasswordEncoderAdapter() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public String encode(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    @Override
    public boolean matches(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
```

**Usage:**
```java
// During registration
String encodedPassword = passwordEncoderPort.encode(command.getPassword());
user.setPasswordHash(encodedPassword);

// During login
if (!passwordEncoderPort.matches(rawPassword, user.getPasswordHash())) {
    throw new InvalidCredentialsException("Invalid credentials");
}
```

### Security Configuration

#### SecurityConfiguration.java (Conceptual)

```java
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Stateless API
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()  // Public endpoints
                .requestMatchers("/api/modules").permitAll()
                .anyRequest().authenticated()  // Protected endpoints
            )
            .addFilterBefore(jwtAuthenticationFilter, 
                UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
```

**Key Configuration:**
- ✅ CSRF disabled (stateless API)
- ✅ CORS enabled for Next.js frontend
- ✅ Stateless sessions (no cookies)
- ✅ Public endpoints: `/api/auth/**`, `/api/modules`
- ✅ All other endpoints require authentication
- ✅ JWT filter before Spring Security's default filter

### JWT Authentication Filter (Conceptual)

```java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenValidator jwtTokenValidator;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        
        // 1. Extract token from Authorization header
        String token = extractToken(request);
        
        if (token != null && jwtTokenValidator.validateToken(token)) {
            // 2. Get username from token
            String username = jwtTokenValidator.getUsernameFromToken(token);
            
            // 3. Load user details
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            
            // 4. Set authentication in SecurityContext
            UsernamePasswordAuthenticationToken auth = 
                new UsernamePasswordAuthenticationToken(
                    userDetails, 
                    null, 
                    userDetails.getAuthorities()
                );
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        
        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }
}
```

### Authentication Flow

#### Login Endpoint

```java
@PostMapping("/login")
public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto request) {
    // 1. Validate credentials
    User user = loginUserUseCase.execute(command);
    
    // 2. Generate JWT token
    String token = tokenGeneratorPort.generateToken(user.getUsername());
    
    // 3. Return token + user data
    return ResponseEntity.ok(new LoginResponseDto(token, userDto));
}
```

#### Protected Endpoint Access

```java
@GetMapping("/api/users/me/profile")
public ResponseEntity<UserProfileResponseDto> getUserProfile() {
    // 1. JWT filter already validated token
    // 2. SecurityContext contains authenticated user
    String username = SecurityContextHolder.getContext()
        .getAuthentication()
        .getName();
    
    // 3. Fetch user data
    FullUserProfile profile = getUserProfileUseCase.getProfile();
    
    return ResponseEntity.ok(profileDto);
}
```

### Frontend Integration

#### Storing Token

```typescript
// After successful login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password }),
});

const data = await response.json();
localStorage.setItem('bh_token', data.token);  // Store JWT
```

#### Sending Token in Requests

```typescript
// From userService.ts
const createAuthHeaders = () => {
  const token = localStorage.getItem('bh_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

// Usage
const getUserProfile = async () => {
  const response = await fetch(`${apiBase}/users/me/profile`, {
    method: 'GET',
    headers: createAuthHeaders(),
  });
  
  return response.json();
};
```

### Configuration Properties

```properties
# application.properties
jwt.secret=your-256-bit-secret-key-here
jwt.expiration=86400000  # 24 hours in milliseconds

# CORS
cors.allowed-origins=http://localhost:3000
```

### Best Practices

#### DO:
✅ Use BCrypt for password hashing (never plain text)
✅ Store JWT in `localStorage` on frontend
✅ Send JWT in `Authorization: Bearer <token>` header
✅ Validate token on every protected endpoint
✅ Use stateless sessions (no cookies)
✅ Implement token expiration (24h typical)
✅ Disable CSRF for stateless APIs
✅ Enable CORS for frontend origin

#### DON'T:
❌ Store passwords in plain text
❌ Send passwords in URLs or query params
❌ Use cookies for stateless APIs
❌ Forget to set CORS headers
❌ Expose JWT secret in code (use environment variables)
❌ Allow unrestricted CORS (`*`)
❌ Skip token validation on protected endpoints

---

## Summary

### Data Persistence
- **Entities**: JPA-annotated POJOs with `Entity` suffix
- **Repositories**: Spring Data JPA interfaces with `JpaRepository` suffix
- **Mappers**: MapStruct interfaces for Entity ↔ Domain conversion
- **Migrations**: Flyway SQL files with versioned naming
- **Pattern**: Repository Adapter maps entities to domain models

### Security & Authentication
- **JWT**: Stateless token-based authentication
- **BCrypt**: Secure password hashing
- **Spring Security**: Endpoint protection, CORS, stateless sessions
- **Filters**: JWT validation before request processing
- **Pattern**: Token Generator and Password Encoder as infrastructure adapters
