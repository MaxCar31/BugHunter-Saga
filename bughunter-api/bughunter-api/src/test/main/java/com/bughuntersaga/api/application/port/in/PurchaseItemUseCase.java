package com.bughuntersaga.api.application.port.in;

import com.bughuntersaga.api.application.port.in.UserStatsResult;

/**
 * Caso de uso para comprar un artículo de la tienda.
 */
public interface PurchaseItemUseCase {

    /**
     * Permite a un usuario autenticado comprar un artículo.
     *
     * @param itemCode El código del artículo a comprar (ej. "streak-freeze")
     * @return Las estadísticas actualizadas del usuario (UserStatsResult)
     * @throws com.bughuntersaga.api.domain.exception.ResourceNotFoundException si el artículo no existe.
     * @throws com.bughuntersaga.api.domain.exception.InsufficientFundsException si el usuario no tiene suficientes lingots.
     */
    UserStatsResult purchaseItem(String itemCode);
}