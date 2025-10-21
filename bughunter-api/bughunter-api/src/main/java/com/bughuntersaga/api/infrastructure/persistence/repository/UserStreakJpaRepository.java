
    package com.bughuntersaga.api.infrastructure.persistence.repository;

    import com.bughuntersaga.api.infrastructure.persistence.entity.UserStreakEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserStreakId;


    @Repository
public interface UserStreakJpaRepository extends JpaRepository<UserStreakEntity, UserStreakId> {

        // Contenido de la interfaz

    }
