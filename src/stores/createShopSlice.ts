/**
 * 🔍 Explicación:
 * Slice de Zustand para gestionar el estado de la tienda (shop).
 * Integrado en el store principal mediante useBoundStore.
 * 
 * Estado:
 * - shopItems: Lista de artículos disponibles
 * - loading: Indica si se están cargando datos
 * - error: Mensaje de error (si hay alguno)
 * 
 * Acciones:
 * - setShopItems: Actualiza la lista de artículos
 * - setLoading: Cambia el estado de carga
 * - setError: Establece un mensaje de error
 */

import type { BoundStateCreator } from "~/hooks/useBoundStore";
import type { ShopItemDTO } from "~/types/shop";

export type ShopSlice = {
    // Estado
    shopItems: ShopItemDTO[];
    loading: boolean;
    error: string | null;

    // Acciones
    setShopItems: (items: ShopItemDTO[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
};

export const createShopSlice: BoundStateCreator<ShopSlice> = (set) => ({
    // Estado inicial
    shopItems: [],
    loading: false,
    error: null,

    // Implementación de acciones
    setShopItems: (items) => set(() => ({ shopItems: items })),
    setLoading: (loading) => set(() => ({ loading })),
    setError: (error) => set(() => ({ error })),
});
