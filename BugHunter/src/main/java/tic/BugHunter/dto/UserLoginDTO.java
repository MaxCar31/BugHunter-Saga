package tic.BugHunter.dto;

import jakarta.validation.constraints.NotBlank;

public record UserLoginDTO(
        @NotBlank(message = "Email or username is required")
        String emailOrUsername,

        @NotBlank(message = "Password is required")
        String password
) {}