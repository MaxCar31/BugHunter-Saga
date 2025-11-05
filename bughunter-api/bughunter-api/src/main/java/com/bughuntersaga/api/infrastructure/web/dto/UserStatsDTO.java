package com.bughuntersaga.api.infrastructure.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDate;
import java.util.Set;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserStatsDTO(
        Integer totalXp,
        Integer totalLingots,
        Integer currentStreak,
        Integer xpToday,
        Integer xpThisWeek,
        Integer leagueRank, // Puede ser nulo
        Set<LocalDate> activeDays
) {}