
    package com.bughuntersaga.api.infrastructure.persistence.entity;

    import jakarta.persistence.Embeddable;
import lombok.*;
import java.io.Serializable;
import java.util.UUID;
import java.time.LocalDate;


    @Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
    public class UserStreakId implements Serializable {

    private UUID userId;
    private LocalDate activityDate;

    }
