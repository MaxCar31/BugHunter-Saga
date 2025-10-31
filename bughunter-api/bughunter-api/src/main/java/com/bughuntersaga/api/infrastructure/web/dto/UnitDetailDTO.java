
package com.bughuntersaga.api.infrastructure.web.dto;

import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)

/**
 * DTO para UnitDetailDTO.
 * Schema: UnitDetailDTO de OpenAPI
 */
public record UnitDetailDTO(
        Integer unitNumber,
        String description,
        String backgroundColor,
        String textColor,
        String borderColor,
        List<LessonTileDTO> tiles
) {
}
