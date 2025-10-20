package tic.BugHunter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tic.BugHunter.model.UserStreak;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserStreakRepository extends JpaRepository<UserStreak, UserStreak.UserStreakId> {

    List<UserStreak> findByUserIdOrderByActivityDateDesc(UUID userId);

    Optional<UserStreak> findByUserIdAndActivityDate(UUID userId, LocalDate activityDate);

    boolean existsByUserIdAndActivityDate(UUID userId, LocalDate activityDate);

    @Query("SELECT us FROM UserStreak us WHERE us.userId = :userId AND us.activityDate BETWEEN :startDate AND :endDate ORDER BY us.activityDate")
    List<UserStreak> findByUserIdAndDateRange(@Param("userId") UUID userId,
                                              @Param("startDate") LocalDate startDate,
                                              @Param("endDate") LocalDate endDate);

    @Query("SELECT COUNT(us) FROM UserStreak us WHERE us.userId = :userId")
    Long countStreakDaysByUserId(@Param("userId") UUID userId);

    @Query(value = """
        WITH RECURSIVE streak_cte AS (
            SELECT activity_date, 1 as streak_length
            FROM user_streaks
            WHERE user_id = :userId
            AND activity_date = :currentDate
            
            UNION ALL
            
            SELECT us.activity_date, sc.streak_length + 1
            FROM user_streaks us
            INNER JOIN streak_cte sc ON us.activity_date = sc.activity_date - INTERVAL '1 day'
            WHERE us.user_id = :userId
        )
        SELECT MAX(streak_length) FROM streak_cte
        """, nativeQuery = true)
    Long calculateCurrentStreak(@Param("userId") UUID userId, @Param("currentDate") LocalDate currentDate);
}