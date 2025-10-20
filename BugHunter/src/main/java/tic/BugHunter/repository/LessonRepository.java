package tic.BugHunter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tic.BugHunter.model.Lesson;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Integer> {

    List<Lesson> findByUnitIdOrderByPosition(Integer unitId);

    List<Lesson> findByTypeOrderByPosition(String type);

    @Query("SELECT l FROM Lesson l LEFT JOIN FETCH l.problems WHERE l.id = :id")
    Optional<Lesson> findByIdWithProblems(@Param("id") Integer id);

    @Query("SELECT l FROM Lesson l WHERE l.unit.id = :unitId ORDER BY l.position")
    List<Lesson> findAllByUnitIdOrderedByPosition(@Param("unitId") Integer unitId);

    @Query("SELECT COUNT(l) FROM Lesson l WHERE l.unit.id = :unitId")
    Long countLessonsByUnitId(@Param("unitId") Integer unitId);
}