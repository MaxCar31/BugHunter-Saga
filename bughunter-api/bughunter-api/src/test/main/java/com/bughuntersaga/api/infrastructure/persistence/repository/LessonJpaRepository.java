
package com.bughuntersaga.api.infrastructure.persistence.repository;

import com.bughuntersaga.api.infrastructure.persistence.entity.LessonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface LessonJpaRepository extends JpaRepository<LessonEntity, Integer> {
    /**
     * Obtiene todas las lecciones de una unidad.
     *
     * @param unitId ID de la unidad
     * @return Lista de lecciones ordenadas por posición
     */
    @Query("""
        SELECT l 
        FROM LessonEntity l
        WHERE l.unitId = :unitId
        ORDER BY l.position ASC
        """)
    List<LessonEntity> findByUnitIdOrderByPositionAsc(@Param("unitId") Integer unitId);

}
