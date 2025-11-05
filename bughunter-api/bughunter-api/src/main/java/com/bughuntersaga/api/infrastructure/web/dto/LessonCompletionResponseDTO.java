package com.bughuntersaga.api.infrastructure.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record LessonCompletionResponseDTO(
        Integer xpEarned,
        Integer lingotsEarned,
        Integer newTotalLingots,
        Integer newStreak
) {
}