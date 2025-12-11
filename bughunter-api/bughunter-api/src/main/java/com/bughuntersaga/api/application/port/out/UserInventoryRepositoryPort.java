package com.bughuntersaga.api.application.port.out;

import com.bughuntersaga.api.domain.model.UserInventory;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Puerto de repositorio para el inventario de artículos del usuario.
 */
public interface UserInventoryRepositoryPort {
    /**
     * Busca un artículo en el inventario por usuario y código de item.
     */
    Optional<UserInventory> findByUserIdAndItemCode(UUID userId, String itemCode);

    /**
     * Guarda (crea o actualiza) un artículo en el inventario.
     */
    UserInventory save(UserInventory inventory);

    /**
     * Obtiene todos los items (badges/títulos) del inventario del usuario.
     */
    List<UserInventory> findAllByUserId(UUID userId);
}