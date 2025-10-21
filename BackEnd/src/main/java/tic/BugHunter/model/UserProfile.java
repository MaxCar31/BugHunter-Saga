package tic.BugHunter.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "user_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {

    @Id
    @Column(name = "user_id")
    private UUID userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    @Builder.Default
    private Integer lingots = 0;

    @Column(name = "daily_xp_goal", nullable = false)
    @Builder.Default
    private Integer dailyXpGoal = 10;

    @Column(name = "sound_effects_enabled", nullable = false)
    @Builder.Default
    private Boolean soundEffectsEnabled = true;
}