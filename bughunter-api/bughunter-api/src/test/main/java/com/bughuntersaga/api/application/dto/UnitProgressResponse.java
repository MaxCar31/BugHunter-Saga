package com.bughuntersaga.api.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UnitProgressResponse {
    private Integer unitId;
    private String unitTitle;
    private Integer currentXp; // XP actual del usuario en esta unidad
    private Integer totalXpNeeded; // XP total necesario para completar la unidad
    private Integer completedLessons; // Número de lecciones completadas
    private Integer totalLessons; // Número total de lecciones en la unidad
    private Double progressPercentage; // Porcentaje de progreso (0-100)
}