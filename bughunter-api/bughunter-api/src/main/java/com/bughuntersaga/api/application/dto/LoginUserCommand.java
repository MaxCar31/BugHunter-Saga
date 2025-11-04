package com.bughuntersaga.api.application.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginUserCommand {
    private final String emailOrUsername;
    private final String password;
}