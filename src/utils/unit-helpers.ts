import type { Unit, UnitProgress, Tile, TileStatus } from "~/types/unit";

/**
 * Utilidades para trabajar con unidades
 */

/**
 * Calcula el progreso total de una unidad
 * @param progress - Información de progreso de la unidad
 * @returns Porcentaje de completación (0-100)
 */
export const calculateUnitProgress = (progress: UnitProgress): number => {
    if (progress.totalLessons === 0) return 0;
    return Math.round((progress.completedLessons / progress.totalLessons) * 100);
};

/**
 * Verifica si una unidad está desbloqueada
 * @param unit - Unidad a verificar
 * @param previousUnitProgress - Progreso de la unidad anterior
 * @returns true si está desbloqueada, false si no
 */
export const isUnitUnlocked = (
    unit: Unit,
    previousUnitProgress?: UnitProgress
): boolean => {
    // La primera unidad siempre está desbloqueada
    if (unit.unitNumber === 1) return true;

    // Las demás unidades requieren completar la anterior
    if (!previousUnitProgress) return false;

    return previousUnitProgress.completedLessons === previousUnitProgress.totalLessons;
};

/**
 * Cuenta el número de lecciones completadas en una unidad
 * @param unit - Unidad a analizar
 * @returns Número de lecciones completadas
 */
export const countCompletedLessons = (unit: Unit): number => {
    return unit.tiles.filter((tile) => tile.status === "COMPLETE").length;
};

/**
 * Obtiene el siguiente tile activo de una unidad
 * @param unit - Unidad a analizar
 * @returns Primer tile con status ACTIVE, o undefined si no hay
 */
export const getActiveLesson = (unit: Unit): Tile | undefined => {
    return unit.tiles.find((tile) => tile.status === "ACTIVE");
};

/**
 * Verifica si una unidad está completada
 * @param unit - Unidad a verificar
 * @returns true si todos los tiles están completos
 */
export const isUnitComplete = (unit: Unit): boolean => {
    return unit.tiles.every((tile) => tile.status === "COMPLETE");
};

/**
 * Obtiene el color de fondo basado en el estado del tile
 * @param status - Estado del tile
 * @returns Clase de Tailwind para el color de fondo
 */
export const getTileBackgroundColor = (status: TileStatus): string => {
    switch (status) {
        case "COMPLETE":
            return "bg-green-500";
        case "ACTIVE":
            return "bg-yellow-400";
        case "LOCKED":
            return "bg-gray-400";
        default:
            return "bg-gray-400";
    }
};

/**
 * Ordena unidades por número
 * @param units - Lista de unidades
 * @returns Unidades ordenadas ascendentemente
 */
export const sortUnitsByNumber = (units: Unit[]): Unit[] => {
    return [...units].sort((a, b) => a.unitNumber - b.unitNumber);
};
