package com.bughuntersaga.api.infrastructure.persistence.repository;

import com.bughuntersaga.api.infrastructure.persistence.entity.UserInventoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserInventoryJpaRepository extends JpaRepository<UserInventoryEntity, Long> {

    /**
     * Busca un registro de inventario por usuario y código de item.
     */
    @Query("SELECT inv FROM UserInventoryEntity inv WHERE inv.user.id = :userId AND inv.itemCode = :itemCode")
    Optional<UserInventoryEntity> findByUserIdAndItemCode(@Param("userId") UUID userId, @Param("itemCode") String itemCode);

    /**
     * Obtiene todos los items del inventario de un usuario.
     */
    @Query("SELECT inv FROM UserInventoryEntity inv WHERE inv.user.id = :userId ORDER BY inv.createdAt DESC")
    List<UserInventoryEntity> findAllByUserId(@Param("userId") UUID userId);
}