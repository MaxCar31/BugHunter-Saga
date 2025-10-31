
package com.bughuntersaga.api.infrastructure.persistence.repository;

import com.bughuntersaga.api.infrastructure.persistence.entity.ProblemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProblemJpaRepository extends JpaRepository<ProblemEntity, Integer> {

    /**
     * Obtiene todos los problemas de un módulo.
     * JOIN: problems -> lessons -> units -> modules
     */
    @Query("""
        SELECT p 
        FROM ProblemEntity p
        JOIN LessonEntity l ON p.lessonId = l.id
        JOIN UnitEntity u ON l.unitId = u.id
        JOIN ModuleEntity m ON u.moduleId = m.id
        WHERE m.code = :moduleCode
        ORDER BY u.unitNumber ASC, l.position ASC, p.position ASC
        """)
    List<ProblemEntity> findProblemsByModuleCode(@Param("moduleCode") String moduleCode);

    /**
     * Obtiene problemas de una lección específica.
     */
    @Query("""
        SELECT p 
        FROM ProblemEntity p
        WHERE p.lessonId = :lessonId
        ORDER BY p.position ASC
        """)
    List<ProblemEntity> findByLessonIdOrderByPositionAsc(@Param("lessonId") Integer lessonId);

}
