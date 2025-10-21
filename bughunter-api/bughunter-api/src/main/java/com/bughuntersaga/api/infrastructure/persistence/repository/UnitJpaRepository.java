
    package com.bughuntersaga.api.infrastructure.persistence.repository;

    import com.bughuntersaga.api.infrastructure.persistence.entity.UnitEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



    @Repository
public interface UnitJpaRepository extends JpaRepository<UnitEntity, Integer> {

        // Contenido de la interfaz

    }
