package com.bughuntersaga.api.infrastructure.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record LessonResultDTO(
                @NotNull(message = "Lesson ID is required") @Min(value = 1, message = "Lesson ID must be positive") Integer lessonId,

                @NotNull(message = "Correct answer count is required") @Min(value = 0, message = "Correct answer count cannot be negative") Integer correctAnswerCount,

                @NotNull(message = "Incorrect answer count is required") @Min(value = 0, message = "Incorrect answer count cannot be negative") Integer incorrectAnswerCount,

                @NotNull(message = "Time taken is required") @Min(value = 0, message = "Time taken cannot be negative") Long timeTakenMs,

                @NotNull(message = "Is practice flag is required") Boolean isPractice,

                @Min(value = 0, message = "Score cannot be negative") @Max(value = 100, message = "Score cannot be greater than 100") Integer score) {
}