package com.bughuntersaga.api.application.port.out;

import java.util.UUID;

/**
 * DTO de datos crudos del leaderboard, transferido desde el
 * Adaptador de Persistencia al Servicio de Aplicación.
 */
public record LeaderboardData(
        UUID userId,
        String name,
        int totalXp
) {}