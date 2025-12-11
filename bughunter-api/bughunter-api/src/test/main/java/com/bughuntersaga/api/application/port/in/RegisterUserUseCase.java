package com.bughuntersaga.api.application.port.in;

import com.bughuntersaga.api.application.dto.RegisterUserCommand;
import com.bughuntersaga.api.domain.model.AuthToken;

public interface RegisterUserUseCase {
    AuthToken register(RegisterUserCommand command);
}
