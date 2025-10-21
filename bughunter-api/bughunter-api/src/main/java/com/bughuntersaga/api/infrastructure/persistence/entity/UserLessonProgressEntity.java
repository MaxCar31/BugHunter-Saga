
    package com.bughuntersaga.api.infrastructure.persistence.entity;

    import jakarta.persistence.*;
import lombok.*;
import java.time.ZonedDateTime;


    @Entity
@Table(name = "user_lesson_progress")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
    public class UserLessonProgressEntity {

    @EmbeddedId
    private UserLessonProgressId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("lessonId")
    @JoinColumn(name = "lesson_id")
    private LessonEntity lesson;

    @Column(name = "completed_at", columnDefinition = "timestamptz DEFAULT (now())")
    private ZonedDateTime completedAt;

    }
