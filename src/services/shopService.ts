/**
 * 🔍 Explicación:
 * Servicio para interactuar con los endpoints de la tienda (shop) del backend.
 * Maneja las llamadas HTTP a /api/shop/items y /api/shop/purchase/{itemId}.
 * 
 * Flujo:
 * 1. getShopItems(): Carga todos los artículos disponibles
 * 2. purchaseItem(itemId): Compra un artículo específico
 * 
 * Autenticación: Bearer token desde sessionStorage (clave 'bh_token')
 * Manejo de errores: 400 (fondos insuficientes), 401 (no autenticado), 500 (error servidor)
 */

import { apiBase } from "~/utils/config";
import type { ShopItemDTO, PurchaseResultDTO } from "~/types/shop";

/**
 * Crea los headers de autenticación con el token Bearer.
 */
const createAuthHeaders = (): HeadersInit => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem('bh_token') || ''}`,
});

/**
 * Obtener todos los artículos disponibles en la tienda.
 * 
 * Endpoint: GET /api/shop/items
 * Autenticación: Sí (Bearer token)
 * 
 * @returns Promise<ShopItemDTO[]> - Lista de artículos
 * @throws Error si no está autenticado (401) o error de servidor
 */
export const getShopItems = async (): Promise<ShopItemDTO[]> => {
    const response = await fetch(`${apiBase}/api/shop/items`, {
        method: 'GET',
        headers: createAuthHeaders(),
    });

    // Manejo de códigos de estado del contrato OpenAPI
    if (response.status === 401) {
        throw new Error('No autorizado - sesión expirada. Por favor inicia sesión nuevamente.');
    }

    if (!response.ok) {
        throw new Error(`Error al cargar artículos de la tienda: ${response.statusText}`);
    }

    return response.json();
};

/**
 * Comprar un artículo de la tienda usando lingots/Puntos QA.
 * 
 * Endpoint: POST /api/shop/purchase/{itemId}
 * Autenticación: Sí (Bearer token)
 * 
 * @param itemId - Identificador del artículo (ej. "double-xp", "triple-xp", "avatar-tester")
 * @returns Promise<PurchaseResultDTO> - Nuevo saldo de lingots después de la compra
 * @throws Error si fondos insuficientes (400), no autenticado (401), o error de servidor
 */
export const purchaseItem = async (itemId: string): Promise<PurchaseResultDTO> => {
    const response = await fetch(`${apiBase}/api/shop/purchase/${itemId}`, {
        method: 'POST',
        headers: createAuthHeaders(),
    });

    // Manejo de códigos de estado del contrato OpenAPI
    if (response.status === 401) {
        throw new Error('No autorizado - sesión expirada. Por favor inicia sesión nuevamente.');
    }

    if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'No tienes suficientes Puntos QA para comprar este artículo.');
    }

    if (!response.ok) {
        throw new Error(`Error al comprar artículo: ${response.statusText}`);
    }

    // La respuesta es UserStatsDTO, extraemos totalLingots
    const userStats = await response.json();

    return {
        totalLingots: userStats.totalLingots,
        message: 'Artículo comprado exitosamente',
    };
};
