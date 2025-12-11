package com.bughuntersaga.api.application.port.in;

import com.bughuntersaga.api.application.dto.UpdateUserAccountCommand;
import com.bughuntersaga.api.domain.model.User;

/**
 * Caso de uso para actualizar los datos de la cuenta (nombre, username) del usuario.
 */
public interface UpdateUserAccountUseCase {
    /**
     * Actualiza los datos de la cuenta y devuelve el User actualizado.
     */
    User updateAccount(UpdateUserAccountCommand command);
}