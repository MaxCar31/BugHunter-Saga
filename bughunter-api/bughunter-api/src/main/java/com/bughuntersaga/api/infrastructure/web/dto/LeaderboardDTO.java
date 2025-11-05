package com.bughuntersaga.api.infrastructure.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record LeaderboardDTO(
        String leagueName,
        String timeUntilEnd,
        List<LeaderboardEntryDTO> users
) {}