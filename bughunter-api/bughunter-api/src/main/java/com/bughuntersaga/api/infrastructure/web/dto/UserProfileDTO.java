package com.bughuntersaga.api.infrastructure.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserProfileDTO(
        UUID userId,
        String name,
        String username,
        String email,
        LocalDateTime joinedAt,
        Integer lingots,
        Integer dailyXpGoal,
        Boolean soundEffectsEnabled
) {}