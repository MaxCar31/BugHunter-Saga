package com.bughuntersaga.api.application.port.out;

import com.bughuntersaga.api.domain.model.UserStreak;
import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

public interface UserStreakRepositoryPort {
    /**
     * Guarda un nuevo registro de actividad (racha).
     */
    UserStreak save(UserStreak streak);

    /**
     * Obtiene todos los días de actividad de un usuario.
     * Se usa para calcular la racha actual.
     */
    Set<LocalDate> findAllActivityDatesByUserId(UUID userId);
}