
    package com.bughuntersaga.api.infrastructure.persistence.repository;

    import com.bughuntersaga.api.infrastructure.persistence.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;


    @Repository
public interface UserJpaRepository extends JpaRepository<UserEntity, UUID> {

        // Contenido de la interfaz

    }
