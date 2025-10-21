
    package com.bughuntersaga.api.infrastructure.persistence.repository;

    import com.bughuntersaga.api.infrastructure.persistence.entity.UserXpHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



    @Repository
public interface UserXpHistoryJpaRepository extends JpaRepository<UserXpHistoryEntity, Long> {

        // Contenido de la interfaz

    }
