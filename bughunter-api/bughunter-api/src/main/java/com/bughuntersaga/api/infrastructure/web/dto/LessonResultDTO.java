
package com.bughuntersaga.api.infrastructure.web.dto;

import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonInclude;
@JsonInclude(JsonInclude.Include.NON_NULL)

/**
 * DTO para LessonResultDTO.
 * Schema: LessonResultDTO de OpenAPI
 */
public record LessonResultDTO(
        @NotNull(message = "Lesson ID is required")
        @Min(value = 1, message = "Lesson ID must be positive")
        Integer lessonId,

        @NotNull(message = "Correct answer count is required")
        @Min(value = 0, message = "Correct answer count cannot be negative")
        Integer correctAnswerCount,

        @NotNull(message = "Incorrect answer count is required")
        @Min(value = 0, message = "Incorrect answer count cannot be negative")
        Integer incorrectAnswerCount,

        @NotNull(message = "Time taken is required")
        @Min(value = 0, message = "Time taken cannot be negative")
        Long timeTakenMs,

        @NotNull(message = "Is practice flag is required")
        Boolean isPractice
) {
}
