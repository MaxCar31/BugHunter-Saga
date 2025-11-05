package com.bughuntersaga.api.application.port.out;

import java.time.ZonedDateTime;
import java.util.List;

/**
 * Puerto de repositorio para obtener datos agregados del leaderboard.
 */
public interface LeaderboardRepositoryPort {
    /**
     * Obtiene los datos del leaderboard (usuarios y su XP total)
     * dentro de un rango de fechas específico.
     *
     * @param start Rango de inicio (Lunes)
     * @param end Rango de fin (Domingo)
     * @return Lista de datos crudos del leaderboard
     */
    List<LeaderboardData> findLeaderboardData(ZonedDateTime start, ZonedDateTime end);
}