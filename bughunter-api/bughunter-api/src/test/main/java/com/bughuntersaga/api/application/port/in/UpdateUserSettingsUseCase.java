package com.bughuntersaga.api.application.port.in;

import com.bughuntersaga.api.application.dto.UpdateUserSettingsCommand;
import com.bughuntersaga.api.domain.model.FullUserProfile;

/**
 * Caso de uso para actualizar la configuración (coach, sonido) del usuario.
 */
public interface UpdateUserSettingsUseCase {
    /**
     * Actualiza las configuraciones y devuelve el perfil completo actualizado.
     */
    FullUserProfile updateSettings(UpdateUserSettingsCommand command);
}