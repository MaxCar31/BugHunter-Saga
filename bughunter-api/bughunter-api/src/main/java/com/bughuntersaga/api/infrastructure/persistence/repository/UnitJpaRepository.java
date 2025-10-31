
package com.bughuntersaga.api.infrastructure.persistence.repository;

import com.bughuntersaga.api.infrastructure.persistence.entity.UnitEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UnitJpaRepository extends JpaRepository<UnitEntity, Integer> {
    /**
     * Obtiene la primera unidad de un módulo (ordenada por unit_number).
     *
     * SOLUCIÓN: Usar stream().findFirst() para obtener solo el primer resultado.
     *
     * @param moduleCode Código del módulo
     * @return Primera unidad si existe
     */
    @Query("""
        SELECT u 
        FROM UnitEntity u
        JOIN ModuleEntity m ON u.moduleId = m.id
        WHERE m.code = :moduleCode
        ORDER BY u.unitNumber ASC
        """)
    List<UnitEntity> findByModuleCodeOrderByUnitNumber(@Param("moduleCode") String moduleCode);

    /**
     * Obtiene todas las unidades de un módulo.
     *
     * @param moduleCode Código del módulo
     * @return Lista de unidades ordenadas por número
     */
    @Query("""
        SELECT u 
        FROM UnitEntity u
        JOIN ModuleEntity m ON u.moduleId = m.id
        WHERE m.code = :moduleCode
        ORDER BY u.unitNumber ASC
        """)
    List<UnitEntity> findByModuleCode(@Param("moduleCode") String moduleCode);

}
