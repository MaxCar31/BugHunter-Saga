
    package com.bughuntersaga.api.infrastructure.persistence.repository;

    import com.bughuntersaga.api.infrastructure.persistence.entity.UserProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;


    @Repository
public interface UserProfileJpaRepository extends JpaRepository<UserProfileEntity, UUID> {

        // Contenido de la interfaz

    }
