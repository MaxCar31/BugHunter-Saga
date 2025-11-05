package com.bughuntersaga.api.application.port.out;

import com.bughuntersaga.api.domain.model.UserLessonProgress;

import java.util.Set;
import java.util.UUID;

public interface UserLessonProgressRepositoryPort {

    /**
     * Obtiene un conjunto de IDs de lecciones completadas por un usuario.
     * (Lo usamos en la Fase 2/4 para el endpoint /unit)
     */
    Set<Integer> findCompletedLessonIdsByUserId(UUID userId);

    /**
     * Verifica si un registro de progreso específico existe.
     */
    boolean existsByUserIdAndLessonId(UUID userId, Integer lessonId);

    /**
     * Guarda un nuevo registro de progreso de lección.
     */
    UserLessonProgress save(UserLessonProgress progress);
}