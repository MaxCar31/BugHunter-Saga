package com.bughuntersaga.api.application.port.in;

import com.bughuntersaga.api.domain.model.Leaderboard;

/**
 * Caso de uso para obtener la tabla de clasificación (leaderboard).
 */
public interface GetLeaderboardUseCase {
    /**
     * Obtiene el leaderboard semanal de la liga actual del usuario.
     */
    Leaderboard getLeaderboard();
}