
package com.bughuntersaga.api.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

/**
 * Entidad de dominio UserProfile.
 *
 * Representa el perfil de un usuario con su información de progreso.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {
    private UUID userId;
    private Integer lingots;
    private Integer dailyXpGoal;
    private Boolean soundEffectsEnabled;
    private Integer currentModuleId;
}