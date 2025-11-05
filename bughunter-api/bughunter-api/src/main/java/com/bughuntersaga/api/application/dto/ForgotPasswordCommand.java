package com.bughuntersaga.api.application.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * Comando para el caso de uso ForgotPassword.
 */
@Getter
@Builder
public class ForgotPasswordCommand {
    private final String email;
}