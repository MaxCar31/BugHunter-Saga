package tic.BugHunter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tic.BugHunter.model.Problem;

import java.util.List;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Integer> {

    List<Problem> findByLessonIdOrderByPosition(Integer lessonId);

    List<Problem> findByTypeOrderByPosition(String type);

    @Query("SELECT p FROM Problem p WHERE p.lesson.id = :lessonId ORDER BY p.position")
    List<Problem> findAllByLessonIdOrderedByPosition(@Param("lessonId") Integer lessonId);

    @Query("SELECT COUNT(p) FROM Problem p WHERE p.lesson.id = :lessonId")
    Long countProblemsByLessonId(@Param("lessonId") Integer lessonId);
}