package com.bughuntersaga.api.application.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * Comando para el caso de uso UpdateUserAccount.
 */
@Getter
@Builder
public class UpdateUserAccountCommand {
    private final String name;
    private final String username;
}