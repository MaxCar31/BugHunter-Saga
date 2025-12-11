package com.bughuntersaga.api.application.port.out;

import com.bughuntersaga.api.domain.model.ShopItem;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ShopItemRepositoryPort {
    /**
     * Obtiene todos los artículos de la tienda.
     */
    List<ShopItem> findAll();

    /**
     * Busca un artículo por su código único.
     */
    Optional<ShopItem> findByItemCode(String itemCode);

    /**
     * Obtiene los artículos de la tienda que el usuario NO ha comprado.
     * Filtra excluyendo items que ya existen en user_inventory para ese usuario.
     *
     * @param userId ID del usuario autenticado
     * @return Lista de artículos disponibles para compra
     */
    List<ShopItem> findAvailableItemsForUser(UUID userId);
}