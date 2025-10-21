
    package com.bughuntersaga.api.infrastructure.persistence.repository;

    import com.bughuntersaga.api.infrastructure.persistence.entity.ShopItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



    @Repository
public interface ShopItemJpaRepository extends JpaRepository<ShopItemEntity, Integer> {

        // Contenido de la interfaz

    }
