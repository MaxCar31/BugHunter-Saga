/**
 * 🔍 Explicación:
 * Interfaces TypeScript para el sistema de tienda (shop).
 * Basadas en el contrato OpenAPI (.results/openapi.yml).
 * 
 * ShopItemDTO: Representa un artículo disponible en la tienda.
 * PurchaseResultDTO: Respuesta después de comprar un artículo.
 */

/**
 * Interfaz que representa un artículo de la tienda.
 * Corresponde al schema ShopItemDTO del contrato OpenAPI.
 * 
 * Endpoint: GET /api/shop/items
 */
export interface ShopItemDTO {
    itemId: string;        // Identificador único (ej. "double-xp", "triple-xp", "avatar-tester")
    name: string;          // Nombre en español (ej. "Potenciador de XP x2")
    description: string;   // Descripción del artículo
    cost: number;          // Costo en lingots/Puntos QA
}

/**
 * Interfaz que representa el resultado de una compra.
 * Basada en la respuesta UserStatsDTO del contrato OpenAPI.
 * 
 * Endpoint: POST /api/shop/purchase/{itemId}
 * Response: UserStatsDTO con campo totalLingots
 */
export interface PurchaseResultDTO {
    totalLingots: number;  // Nuevo saldo de lingots después de la compra
    message?: string;      // Mensaje opcional de éxito/error
}
