package com.bughuntersaga.api.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthToken {
    private String token;
    private User user;
}
