package com.bughuntersaga.api.application.port.out;

import com.bughuntersaga.api.domain.model.UserXpHistory;

import java.time.ZonedDateTime;
import java.util.UUID;

public interface UserXpHistoryRepositoryPort {
    /**
     * Guarda un nuevo registro de XP. (Fase 3)
     */
    UserXpHistory save(UserXpHistory history);

    /**
     * Suma el XP total de un usuario.
     */
    int sumTotalXpByUserId(UUID userId);

    /**
     * Suma el XP de un usuario entre dos fechas.
     */
    int sumXpEarnedBetween(UUID userId, ZonedDateTime start, ZonedDateTime end);
}