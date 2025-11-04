
package com.bughuntersaga.api.infrastructure.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)

/**
 * DTO para ModuleSummaryDTO.
 * Schema: ModuleSummaryDTO de OpenAPI
 */
public record ModuleResponseDTO(
        Integer id,
        String code,
        String name,
        String description,
        Map<String, Object> uiConfig

) {
}
