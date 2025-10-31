
package com.bughuntersaga.api.domain.model;

import lombok.*;

import java.util.List;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Unit {
    private Integer id;
    private Integer unitNumber;
    private String description;
    /**
     * Lecciones que componen esta unidad.
     * Se carga bajo demanda según la necesidad.
     */
    private List<Lesson> lessons;
}
