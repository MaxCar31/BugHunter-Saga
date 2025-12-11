package com.bughuntersaga.api.infrastructure.persistence.repository.projections;

import java.util.UUID;

/**
 * Interfaz de Proyección de Spring Data para el resultado del query
 * del leaderboard.
 */
public interface LeaderboardProjection {
    UUID getUserId();
    String getName();
    Integer getTotalXp();
}