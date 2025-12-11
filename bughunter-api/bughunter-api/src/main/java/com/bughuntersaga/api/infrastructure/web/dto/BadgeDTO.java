package com.bughuntersaga.api.infrastructure.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;

/**
 * DTO para representar un badge obtenido por el usuario.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record BadgeDTO(
        String itemCode,
        String name,
        String description,
        String icon
) {}
