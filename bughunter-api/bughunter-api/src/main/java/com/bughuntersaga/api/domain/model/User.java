package com.bughuntersaga.api.domain.model;

import lombok.*;
import java.time.LocalDateTime;
import java.time.ZonedDateTime; // Importar
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