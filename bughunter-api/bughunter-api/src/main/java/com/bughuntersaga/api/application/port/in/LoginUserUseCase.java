package com.bughuntersaga.api.application.port.in;

import com.bughuntersaga.api.application.dto.LoginUserCommand;
import com.bughuntersaga.api.domain.model.AuthToken;

public interface LoginUserUseCase {

    /**
     * Autentica a un usuario y devuelve un token.
     * @throws com.bughuntersaga.api.domain.exception.InvalidCredentialsException si las credenciales son incorrectas.
     */
    AuthToken login(LoginUserCommand command);
}