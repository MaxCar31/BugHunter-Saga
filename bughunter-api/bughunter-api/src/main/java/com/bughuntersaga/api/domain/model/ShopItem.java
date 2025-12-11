package com.bughuntersaga.api.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShopItem {
    private Integer id;
    private String itemCode;
    private String name;
    private String description;
    private Integer cost;
    private String icon;
}