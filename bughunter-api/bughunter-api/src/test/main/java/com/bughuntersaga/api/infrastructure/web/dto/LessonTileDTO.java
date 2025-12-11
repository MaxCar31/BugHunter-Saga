
package com.bughuntersaga.api.infrastructure.web.dto;

import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonInclude;
@JsonInclude(JsonInclude.Include.NON_NULL)

/**
 * DTO para LessonTileDTO.
 * Schema: LessonTileDTO de OpenAPI
 */
public record LessonTileDTO(
        Integer lessonId,
        String type,           // "star", "book", "trophy", "treasure", "fast-forward"
        String description,
        String status
) {
}
