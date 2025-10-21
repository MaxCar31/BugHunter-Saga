
    package com.bughuntersaga.api.infrastructure.persistence.entity;

    import jakarta.persistence.*;
import lombok.*;


    @Entity
@Table(name = "user_streaks")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
    public class UserStreakEntity {

    @EmbeddedId
    private UserStreakId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private UserEntity user;

    }
