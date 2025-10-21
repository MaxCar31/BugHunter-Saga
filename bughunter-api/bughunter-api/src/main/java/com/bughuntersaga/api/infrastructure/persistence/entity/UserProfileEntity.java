
    package com.bughuntersaga.api.infrastructure.persistence.entity;

    import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;


    @Entity
@Table(name = "user_profiles")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
    public class UserProfileEntity {

    @Id
    @Column(name = "user_id")
    private UUID userId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(nullable = false)
    private Integer lingots;

    @Column(name = "daily_xp_goal", nullable = false)
    private Integer dailyXpGoal;

    @Column(name = "sound_effects_enabled", nullable = false)
    private Boolean soundEffectsEnabled;

    }
