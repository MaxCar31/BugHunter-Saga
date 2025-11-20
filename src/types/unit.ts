/**
 * Tipos para unidades y tiles del sistema de aprendizaje
 */

// ==================== TILE TYPES ====================

/**
 * Tipos de tiles disponibles en el mapa de aprendizaje
 */
export type TileType = "star" | "dumbbell" | "book" | "trophy" | "fast-forward" | "treasure";

/**
 * Estados posibles de un tile/lección
 */
export type TileStatus = "LOCKED" | "ACTIVE" | "COMPLETE";

/**
 * Estructura de un tile (lección) en la unidad
 */
export interface Tile {
    type: TileType;
    description: string;
    lessonId: number;
    status: TileStatus;
}

// ==================== UNIT ====================

/**
 * Estructura de una unidad educativa (Response de GET /api/content/modules/{moduleCode}/unit)
 */
export interface Unit {
    unitNumber: number;
    description: string;
    backgroundColor: `bg-${string}`;
    textColor: `text-${string}`;
    borderColor: `border-${string}`;
    tiles: Tile[];
}

/**
 * Progreso de una unidad
 */
export interface UnitProgress {
    unitId: string;
    completedLessons: number;
    totalLessons: number;
    isUnlocked: boolean;
}
