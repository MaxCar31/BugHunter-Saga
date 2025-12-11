package com.bughuntersaga.api.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * Entidad de dominio que representa un artículo en el inventario de un usuario.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInventory {
    private Long id;
    private UUID userId;
    private String itemCode;
    private Integer quantity;
    private ZonedDateTime createdAt;
}