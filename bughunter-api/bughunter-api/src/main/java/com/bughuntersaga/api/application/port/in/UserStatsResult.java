package com.bughuntersaga.api.application.port.in;

import java.time.LocalDate;
import java.util.Set;

/**
 * Objeto de dominio que representa las estadísticas de un usuario.
 * Es 'public' para ser accesible desde el servicio.
 */
public record UserStatsResult(
        int totalXp,
        int totalLingots,
        int currentStreak,
        int xpToday,
        int xpThisWeek,
        Integer leagueRank, // Nulo por ahora (Fase 6)
        Set<LocalDate> activeDays
) {}