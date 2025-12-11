package com.bughuntersaga.api.infrastructure.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ForgotPasswordDTO(
        @NotBlank(message = "El email es obligatorio")
        @Email(message = "Debe ser un email válido")
        String email
) {}