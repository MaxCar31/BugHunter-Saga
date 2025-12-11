
package com.bughuntersaga.api.domain.model;

import lombok.*;

import java.util.Map;


/**
 * Entidad de dominio Module.
 * POJO puro sin dependencias de frameworks.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Module {
    private Integer id;
    private String code;
    private String name;
    private String description;
    private Map<String, Object> uiConfig;
}