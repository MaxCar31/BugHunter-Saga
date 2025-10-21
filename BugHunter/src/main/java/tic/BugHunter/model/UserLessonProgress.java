package tic.BugHunter.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "user_lesson_progress")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(UserLessonProgress.UserLessonProgressId.class)
public class UserLessonProgress {

    @Id
    @Column(name = "user_id")
    private UUID userId;

    @Id
    @Column(name = "lesson_id")
    private Integer lessonId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", insertable = false, updatable = false)
    private Lesson lesson;

    @CreationTimestamp
    @Column(name = "completed_at")
    private ZonedDateTime completedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserLessonProgressId implements Serializable {
        private UUID userId;
        private Integer lessonId;
    }
}