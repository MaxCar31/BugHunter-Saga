import { apiBase } from "~/utils/config";
import type { Unit } from "~/types/unit";

/**
 * Service para gestionar unidades educativas
 */

const createAuthHeaders = (token?: string) => ({
    accept: "*/*",
    ...(token && { Authorization: `Bearer ${token}` }),
});

/**
 * Obtiene las unidades de un módulo específico
 * @param moduleCode - Código del módulo
 * @param token - Token JWT opcional
 * @returns Lista de unidades con sus tiles
 */
export const fetchModuleUnits = async (moduleCode: string, token?: string): Promise<Unit[]> => {
    try {
        const response = await fetch(`${apiBase}/api/content/modules/${moduleCode}/unit`, {
            headers: createAuthHeaders(token),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status} fetching units for module ${moduleCode}`);
        }

        const data = await response.json();
        return data as Unit[];
    } catch (error) {
        console.error(`Error fetching units for module ${moduleCode}:`, error);
        throw error;
    }
};
