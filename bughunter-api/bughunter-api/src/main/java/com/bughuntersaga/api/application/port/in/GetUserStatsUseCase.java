package com.bughuntersaga.api.application.port.in;

/**
 * Caso de uso para obtener las estadísticas de gamificación del usuario autenticado.
 */
public interface GetUserStatsUseCase {

    /**
     * Obtiene las estadísticas agregadas del usuario actual.
     *
     * @return Un objeto UserStatsResult con todos los datos calculados.
     */
    UserStatsResult getStats();
}