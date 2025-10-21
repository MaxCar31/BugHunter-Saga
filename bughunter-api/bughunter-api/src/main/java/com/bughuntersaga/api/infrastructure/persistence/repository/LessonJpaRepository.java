
    package com.bughuntersaga.api.infrastructure.persistence.repository;

    import com.bughuntersaga.api.infrastructure.persistence.entity.LessonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



    @Repository
public interface LessonJpaRepository extends JpaRepository<LessonEntity, Integer> {

        // Contenido de la interfaz

    }
