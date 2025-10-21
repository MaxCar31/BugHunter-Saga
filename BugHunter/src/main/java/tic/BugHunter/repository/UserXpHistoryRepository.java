package tic.BugHunter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tic.BugHunter.model.UserXpHistory;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface UserXpHistoryRepository extends JpaRepository<UserXpHistory, Long> {

    List<UserXpHistory> findByUserIdOrderByCreatedAtDesc(UUID userId);

    List<UserXpHistory> findByUserIdAndSourceType(UUID userId, String sourceType);

    @Query("SELECT SUM(uxh.xpEarned) FROM UserXpHistory uxh WHERE uxh.user.id = :userId")
    Long sumXpByUserId(@Param("userId") UUID userId);

    @Query("SELECT SUM(uxh.xpEarned) FROM UserXpHistory uxh WHERE uxh.user.id = :userId AND uxh.createdAt >= :startDate")
    Long sumXpByUserIdSinceDate(@Param("userId") UUID userId, @Param("startDate") ZonedDateTime startDate);

    @Query("SELECT uxh FROM UserXpHistory uxh WHERE uxh.user.id = :userId AND uxh.createdAt BETWEEN :startDate AND :endDate ORDER BY uxh.createdAt DESC")
    List<UserXpHistory> findByUserIdAndDateRange(@Param("userId") UUID userId,
                                                 @Param("startDate") ZonedDateTime startDate,
                                                 @Param("endDate") ZonedDateTime endDate);
}