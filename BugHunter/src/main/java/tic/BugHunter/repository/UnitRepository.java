package tic.BugHunter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tic.BugHunter.model.Unit;

import java.util.List;
import java.util.Optional;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Integer> {

    List<Unit> findByModuleIdOrderByUnitNumber(Integer moduleId);

    Optional<Unit> findByModuleIdAndUnitNumber(Integer moduleId, Integer unitNumber);

    @Query("SELECT u FROM Unit u LEFT JOIN FETCH u.lessons WHERE u.id = :id")
    Optional<Unit> findByIdWithLessons(@Param("id") Integer id);

    @Query("SELECT u FROM Unit u WHERE u.module.id = :moduleId ORDER BY u.unitNumber")
    List<Unit> findAllByModuleIdOrderedByUnitNumber(@Param("moduleId") Integer moduleId);
}