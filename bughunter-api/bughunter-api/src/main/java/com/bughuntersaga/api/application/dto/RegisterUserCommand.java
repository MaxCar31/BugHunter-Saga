package com.bughuntersaga.api.application.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RegisterUserCommand {
    private final String username;
    private final String name;
    private final String email;
    private final String rawPassword;
}
