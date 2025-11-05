package com.bughuntersaga.api.application.port.out;

import com.bughuntersaga.api.domain.model.ShopItem;
import java.util.List;
import java.util.Optional;

public interface ShopItemRepositoryPort {
    /**
     * Obtiene todos los artículos de la tienda.
     */
    List<ShopItem> findAll();

    /**
     * Busca un artículo por su código único.
     */
    Optional<ShopItem> findByItemCode(String itemCode);
}