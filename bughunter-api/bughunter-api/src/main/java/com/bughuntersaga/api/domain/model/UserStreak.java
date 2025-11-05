package com.bughuntersaga.api.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

/**
 * Entidad de dominio que representa un día de actividad para un usuario.
 * La 'racha' es el cálculo de días consecutivos de esta tabla.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserStreak {
    private UUID userId;
    private LocalDate activityDate;
}