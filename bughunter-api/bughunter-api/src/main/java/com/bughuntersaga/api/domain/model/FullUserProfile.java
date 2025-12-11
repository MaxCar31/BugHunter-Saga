package com.bughuntersaga.api.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Modelo de dominio que combina User y UserProfile
 * para el endpoint GET /users/me/profile.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FullUserProfile {
    // Campos de User
    private UUID userId;
    private String name;
    private String username;
    private String email;
    private LocalDateTime joinedAt; // (createdAt de User)

    // Campos de UserProfile
    private Integer lingots;
    private Integer dailyXpGoal;
    private Boolean soundEffectsEnabled;

    // Badges obtenidos
    private List<Badge> badges;
}