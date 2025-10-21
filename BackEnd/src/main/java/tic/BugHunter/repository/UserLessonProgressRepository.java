package tic.BugHunter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tic.BugHunter.model.UserLessonProgress;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserLessonProgressRepository extends JpaRepository<UserLessonProgress, UserLessonProgress.UserLessonProgressId> {

    List<UserLessonProgress> findByUserId(UUID userId);

    Optional<UserLessonProgress> findByUserIdAndLessonId(UUID userId, Integer lessonId);

    boolean existsByUserIdAndLessonId(UUID userId, Integer lessonId);

    @Query("SELECT ulp FROM UserLessonProgress ulp WHERE ulp.userId = :userId ORDER BY ulp.completedAt DESC")
    List<UserLessonProgress> findByUserIdOrderByCompletedAtDesc(@Param("userId") UUID userId);

    @Query("SELECT COUNT(ulp) FROM UserLessonProgress ulp WHERE ulp.userId = :userId")
    Long countCompletedLessonsByUserId(@Param("userId") UUID userId);

    @Query("SELECT ulp FROM UserLessonProgress ulp WHERE ulp.userId = :userId AND ulp.lesson.unit.module.id = :moduleId")
    List<UserLessonProgress> findByUserIdAndModuleId(@Param("userId") UUID userId, @Param("moduleId") Integer moduleId);
}
