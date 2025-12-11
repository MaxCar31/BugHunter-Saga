package com.bughuntersaga.api.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Modelo de dominio para un badge obtenido por el usuario.
 * Combina información del ShopItem con la fecha de adquisición.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Badge {
    private String itemCode;
    private String name;
    private String description;
    private String icon;
}
