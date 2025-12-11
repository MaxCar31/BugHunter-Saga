package com.bughuntersaga.api.application.port.in;

import com.bughuntersaga.api.domain.model.ShopItem;
import java.util.List;

/**
 * Caso de uso para obtener todos los artículos de la tienda.
 */
public interface GetShopItemsUseCase {
    List<ShopItem> getShopItems();
}