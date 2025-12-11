package com.bughuntersaga.api.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * Entidad de dominio que representa el progreso de un usuario en una lección.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserLessonProgress {
    private Long id;
    private UUID userId;
    private Integer lessonId;
    private ZonedDateTime completedAt;
    private Integer score;
    private Integer attemptNumber;
}