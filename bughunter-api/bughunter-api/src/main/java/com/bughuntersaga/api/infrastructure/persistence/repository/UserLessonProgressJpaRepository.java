
    package com.bughuntersaga.api.infrastructure.persistence.repository;

    import com.bughuntersaga.api.infrastructure.persistence.entity.UserLessonProgressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserLessonProgressId;


    @Repository
public interface UserLessonProgressJpaRepository extends JpaRepository<UserLessonProgressEntity, UserLessonProgressId> {

        // Contenido de la interfaz

    }
