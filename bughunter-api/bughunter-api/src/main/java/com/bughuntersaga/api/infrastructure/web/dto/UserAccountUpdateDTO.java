package com.bughuntersaga.api.infrastructure.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Size;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserAccountUpdateDTO(
        @Size(max = 100)
        String name,

        @Size(min = 3, max = 50)
        String username
) {}