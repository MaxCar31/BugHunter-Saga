import { apiBase } from "~/utils/config";
import type { Module, ModuleWithTypedUI } from "~/types/module";

/**
 * Service para gestionar módulos educativos
 */

const createAuthHeaders = (token?: string) => ({
    accept: "*/*",
    ...(token && { Authorization: `Bearer ${token}` }),
});

/**
 * Obtiene todos los módulos disponibles
 * @param token - Token JWT opcional
 * @returns Lista de módulos con configuración UI tipada
 */
export const fetchModules = async (token?: string): Promise<ModuleWithTypedUI[]> => {
    try {
        const response = await fetch(`${apiBase}/api/content/modules`, {
            headers: createAuthHeaders(token),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status} fetching modules`);
        }

        const modules: Module[] = await response.json();

        // Transformar a formato con tipos Tailwind correctos
        return modules.map((module) => ({
            ...module,
            viewBox: "0 0 24 19", // Default viewBox para Flag component
            uiConfig: {
                ...module.uiConfig,
                backgroundColor: module.uiConfig.backgroundColor as `bg-${string}`,
                borderColor: (module.uiConfig.borderColor ?? `border-${module.uiConfig.color}-600`) as `border-${string}`,
                textColor: (module.uiConfig.textColor ?? `text-${module.uiConfig.color}-500`) as `text-${string}`,
            },
        }));
    } catch (error) {
        console.error("Error fetching modules:", error);
        throw error;
    }
};
