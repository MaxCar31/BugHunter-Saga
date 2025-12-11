package com.bughuntersaga.api.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Entidad de dominio que representa la tabla de clasificación completa.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Leaderboard {
    private String leagueName; // (Fijo por ahora, Fase 6 no implementa ligas)
    private String timeUntilEnd;
    private List<LeaderboardEntry> users;
}