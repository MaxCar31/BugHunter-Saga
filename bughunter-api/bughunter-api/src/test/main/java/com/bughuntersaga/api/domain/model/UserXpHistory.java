package com.bughuntersaga.api.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * Entidad de dominio que representa un evento donde un usuario ganó XP.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserXpHistory {
    private Long id;
    private UUID userId;
    private Integer xpEarned;
    private String sourceType; // "LESSON", "TREASURE", "CHALLENGE"
    private Integer sourceId; // e.g., lessonId
    private ZonedDateTime createdAt;
}