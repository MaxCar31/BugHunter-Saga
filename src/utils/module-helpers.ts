import type { Module, ModuleWithTypedUI } from "~/types/module";

/**
 * Utilidades para trabajar con módulos
 */

/**
 * Encuentra un módulo por su código
 * @param modules - Lista de módulos
 * @param code - Código del módulo a buscar
 * @returns Módulo encontrado o undefined
 */
export const findModuleByCode = (modules: Module[], code: string): Module | undefined => {
    return modules.find((module) => module.code === code);
};

/**
 * Encuentra un módulo por su ID
 * @param modules - Lista de módulos
 * @param id - ID del módulo a buscar
 * @returns Módulo encontrado o undefined
 */
export const findModuleById = (modules: Module[], id: number): Module | undefined => {
    return modules.find((module) => module.id === id);
};

/**
 * Ordena módulos por ID
 * @param modules - Lista de módulos
 * @returns Módulos ordenados ascendentemente por ID
 */
export const sortModulesById = (modules: Module[]): Module[] => {
    return [...modules].sort((a, b) => a.id - b.id);
};

/**
 * Obtiene la clase de color de borde de un módulo
 * @param module - Módulo con configuración UI
 * @returns Clase de Tailwind para el borde
 */
export const getModuleBorderColor = (module: ModuleWithTypedUI): string => {
    return module.uiConfig.borderColor;
};

/**
 * Obtiene la clase de color de fondo de un módulo
 * @param module - Módulo con configuración UI
 * @returns Clase de Tailwind para el fondo
 */
export const getModuleBackgroundColor = (module: ModuleWithTypedUI): string => {
    return module.uiConfig.backgroundColor;
};

/**
 * Obtiene la clase de color de texto de un módulo
 * @param module - Módulo con configuración UI
 * @returns Clase de Tailwind para el texto
 */
export const getModuleTextColor = (module: ModuleWithTypedUI): string => {
    return module.uiConfig.textColor;
};

/**
 * Valida si un módulo tiene configuración UI completa
 * @param module - Módulo a validar
 * @returns true si tiene todas las propiedades UI requeridas
 */
export const hasCompleteUIConfig = (module: Module): boolean => {
    const { uiConfig } = module;
    return !!(
        uiConfig.backgroundColor &&
        uiConfig.color &&
        uiConfig.icon
    );
};
