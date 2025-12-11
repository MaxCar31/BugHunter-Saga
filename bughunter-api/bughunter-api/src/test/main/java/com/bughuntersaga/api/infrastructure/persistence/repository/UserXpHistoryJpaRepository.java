package com.bughuntersaga.api.infrastructure.persistence.repository;

import com.bughuntersaga.api.infrastructure.persistence.entity.UserXpHistoryEntity;
import com.bughuntersaga.api.infrastructure.persistence.repository.projections.LeaderboardProjection; // Importar
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List; // Importar
import java.util.UUID;

@Repository
public interface UserXpHistoryJpaRepository extends JpaRepository<UserXpHistoryEntity, Long> {

    // ... (Queries de SUM de Fase 4) ...
    @Query("SELECT COALESCE(SUM(h.xpEarned), 0) FROM UserXpHistoryEntity h WHERE h.user.id = :userId")
    int sumTotalXpByUserId(@Param("userId") UUID userId);

    @Query("SELECT COALESCE(SUM(h.xpEarned), 0) FROM UserXpHistoryEntity h WHERE h.user.id = :userId AND h.createdAt BETWEEN :start AND :end")
    int sumXpEarnedBetween(@Param("userId") UUID userId, @Param("start") ZonedDateTime start, @Param("end") ZonedDateTime end);

    @Query("""
        SELECT 
            h.user.id as userId, 
            h.user.name as name, 
            SUM(h.xpEarned) as totalXp
        FROM UserXpHistoryEntity h
        WHERE h.createdAt BETWEEN :start AND :end
        GROUP BY h.user.id, h.user.name
        ORDER BY totalXp DESC
    """)
    List<LeaderboardProjection> findLeaderboardForWeek(
            @Param("start") ZonedDateTime start,
            @Param("end") ZonedDateTime end
    );
}