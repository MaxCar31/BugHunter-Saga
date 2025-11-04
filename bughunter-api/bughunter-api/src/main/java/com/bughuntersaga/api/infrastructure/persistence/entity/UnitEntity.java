
package com.bughuntersaga.api.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entidad JPA para la tabla 'units'.
 *
 * Representa una unidad dentro de un módulo.
 */
@Entity
@Table(name = "units")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UnitEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "module_id", nullable = false)
    private Integer moduleId;

    @Column(name = "unit_number", nullable = false)
    private Integer unitNumber;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
}