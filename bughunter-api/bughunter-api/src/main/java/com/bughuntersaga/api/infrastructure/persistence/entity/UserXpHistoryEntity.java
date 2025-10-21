
    package com.bughuntersaga.api.infrastructure.persistence.entity;

    import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;
import java.time.ZonedDateTime;


    @Entity
@Table(name = "user_xp_history")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
    public class UserXpHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(name = "xp_earned", nullable = false)
    private Integer xpEarned;

    @Column(name = "source_type", length = 50)
    private String sourceType;

    @Column(name = "source_id")
    private Integer sourceId;

    @Column(name = "created_at", columnDefinition = "timestamptz DEFAULT (now())")
    private ZonedDateTime createdAt;

    }
