package com.bughuntersaga.api.infrastructure.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ModuleResponseDTO(
        Integer id,
        String code,
        String name,
        String shortName,
        String description,
        Map<String, Object> uiConfig
) {}