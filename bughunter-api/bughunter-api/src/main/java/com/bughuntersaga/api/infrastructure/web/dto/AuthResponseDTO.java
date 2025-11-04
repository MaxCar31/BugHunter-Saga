
package com.bughuntersaga.api.infrastructure.web.dto;

import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)

/**
 * DTO para AuthResponseDTO.
 * Schema: AuthResponseDTO de OpenAPI
 */
public record AuthResponseDTO(
        // Schema: AuthResponseDTO de OpenAPI
        String token,
        UserInfoDTO user) {
}
