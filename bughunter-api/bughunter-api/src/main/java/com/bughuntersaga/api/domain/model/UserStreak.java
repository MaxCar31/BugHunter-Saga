
package com.bughuntersaga.api.domain.model;

import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Entidad de dominio UserStreak.
 *
 * Representa la racha de días consecutivos de un usuario.
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