package com.bughuntersaga.api.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;
// import java.time.ZonedDateTime; // <- ELIMINADO
import java.time.LocalDateTime;  // <- AÑADIDO

@Entity
@Table(name = "users")
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
    private String lastname;

    @Column(length = 100)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    // --- INICIO DE LA CORRECCIÓN ---
    @Column(name = "created_at", updatable = false, columnDefinition = "timestamptz DEFAULT (now())")
    private LocalDateTime createdAt; // <- CAMBIADO de ZonedDateTime
    // --- FIN DE LA CORRECCIÓN ---

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UserProfileEntity userProfile;
}