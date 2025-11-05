package com.bughuntersaga.api.application.port.in;

import com.bughuntersaga.api.domain.model.FullUserProfile;

/**
 * Caso de uso para obtener el perfil combinado del usuario autenticado.
 */
public interface GetUserProfileUseCase {
    FullUserProfile getProfile();
}