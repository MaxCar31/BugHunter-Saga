package com.bughuntersaga.api.application.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * Comando para el caso de uso UpdateUserSettings.
 */
@Getter
@Builder
public class UpdateUserSettingsCommand {
    private final Integer dailyXpGoal;
    private final Boolean soundEffectsEnabled;
}