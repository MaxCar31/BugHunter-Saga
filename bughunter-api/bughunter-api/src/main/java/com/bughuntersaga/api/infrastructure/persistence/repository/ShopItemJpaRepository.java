package com.bughuntersaga.api.infrastructure.persistence.repository;

import com.bughuntersaga.api.infrastructure.persistence.entity.ShopItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ShopItemJpaRepository extends JpaRepository<ShopItemEntity, Integer> {
    /**
     * Busca un artículo por su código de item.
     */
    Optional<ShopItemEntity> findByItemCode(String itemCode);

    /**
     * Obtiene todos los items de la tienda que el usuario NO ha comprado.
     * Usa NOT EXISTS para filtrar items que ya están en user_inventory.
     */
    @Query("""
        SELECT s FROM ShopItemEntity s
        WHERE NOT EXISTS (
            SELECT 1 FROM UserInventoryEntity inv
            WHERE inv.itemCode = s.itemCode AND inv.user.id = :userId
        )
        ORDER BY s.cost ASC
    """)
    List<ShopItemEntity> findAvailableForUser(@Param("userId") UUID userId);
}