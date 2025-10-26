
package com.bughuntersaga.api.infrastructure.web.dto;

import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)

/**
 * DTO para UserLoginDTO.
 * Schema: UserLoginDTO de OpenAPI
 */
public record UserLoginDTO(
        // Schema: UserLoginDTO de OpenAPI
        String emailOrUsername,
        String password) {
}
