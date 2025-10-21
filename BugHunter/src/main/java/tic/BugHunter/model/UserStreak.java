package tic.BugHunter.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "user_streaks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(UserStreak.UserStreakId.class)
public class UserStreak {

    @Id
    @Column(name = "user_id")
    private UUID userId;

    @Id
    @Column(name = "activity_date")
    private LocalDate activityDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserStreakId implements Serializable {
        private UUID userId;
        private LocalDate activityDate;
    }
}