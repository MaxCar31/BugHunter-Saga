
package com.bughuntersaga.api.infrastructure.web.dto;

import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)

/**
 * DTO para UserInfoDTO.
 * Schema: UserInfoDTO de OpenAPI
 */
public record UserInfoDTO(
        // Schema: UserInfoDTO de OpenAPI
        String id,
        String username,
        String name,
        String email) {
}
