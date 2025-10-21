
    package com.bughuntersaga.api.infrastructure.persistence.repository;

    import com.bughuntersaga.api.infrastructure.persistence.entity.ModuleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



    @Repository
public interface ModuleJpaRepository extends JpaRepository<ModuleEntity, Integer> {

        // Contenido de la interfaz

    }
