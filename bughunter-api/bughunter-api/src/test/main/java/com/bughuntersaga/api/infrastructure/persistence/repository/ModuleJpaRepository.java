
package com.bughuntersaga.api.infrastructure.persistence.repository;

import com.bughuntersaga.api.infrastructure.persistence.entity.ModuleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface ModuleJpaRepository extends JpaRepository<ModuleEntity, Integer> {
    /**
     * Busca un módulo por su código único.
     *
     * @param code Código del módulo (ej. "mod-a")
     * @return Optional con la entidad si existe
     */
    Optional<ModuleEntity> findByCode(String code);
}
