package com.bughuntersaga.api.infrastructure.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ShopItemDTO(
        String itemId,
        String name,
        String description,
        Integer cost
) {}