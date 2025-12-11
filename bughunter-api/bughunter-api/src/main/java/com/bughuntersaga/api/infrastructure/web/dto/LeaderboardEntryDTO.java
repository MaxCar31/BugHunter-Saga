package com.bughuntersaga.api.infrastructure.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record LeaderboardEntryDTO(
        Integer rank,
        String name,
        Integer xp,
        Boolean isCurrentUser
) {}