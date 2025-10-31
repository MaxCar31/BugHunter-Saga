package com.bughuntersaga.api.domain.model;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Lesson {
    private Integer id;
    private Integer unitId;
    private String type;          // "star", "book", "trophy", "treasure", "fast-forward"
    private String description;
    private Integer position;

    /**
     * Estado de la lección para el usuario actual.
     * Por ahora siempre será "ACTIVE" (Fase 1).
     * En Fase 4 se calculará según el progreso.
     */
    private String status;        // "LOCKED", "ACTIVE", "COMPLETE"
}
