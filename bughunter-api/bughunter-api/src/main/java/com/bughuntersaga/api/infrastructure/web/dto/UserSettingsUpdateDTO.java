package com.bughuntersaga.api.infrastructure.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserSettingsUpdateDTO(
        Integer dailyXpGoal, // (Tu OpenAPI permite [1, 10, 20, 30, 50])
        Boolean soundEffectsEnabled,
        Boolean speakingExercises,
        Boolean listeningExercises
) {}