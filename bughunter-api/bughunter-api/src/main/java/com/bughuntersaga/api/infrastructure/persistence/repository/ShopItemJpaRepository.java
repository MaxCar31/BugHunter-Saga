package com.bughuntersaga.api.infrastructure.persistence.repository;

import com.bughuntersaga.api.infrastructure.persistence.entity.ShopItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShopItemJpaRepository extends JpaRepository<ShopItemEntity, Integer> {
    /**
     * Busca un artículo por su código de item.
     */
    Optional<ShopItemEntity> findByItemCode(String itemCode);
}