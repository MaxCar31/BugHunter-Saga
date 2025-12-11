/**
 * @deprecated Este archivo ha sido refactorizado.
 * 
 * Los tipos ahora están en: src/types/unit.ts
 * Los servicios ahora están en: src/services/unitService.ts
 * Las funciones helper ahora están en: src/utils/unit-helpers.ts
 * 
 * Por favor actualiza tus imports:
 * 
 * Antes:
 * import { Unit, Tile, fetchModuleUnits } from "~/utils/units";
 * 
 * Después:
 * import type { Unit, Tile } from "~/types/unit";
 * import { fetchModuleUnits } from "~/services/unitService";
 */

// Re-exports temporales para backward compatibility (eliminar después de migración)
export type { Unit, Tile, TileType, TileStatus, UnitProgress } from "~/types/unit";
export { fetchModuleUnits } from "~/services/unitService";
export {
  calculateUnitProgress,
  isUnitUnlocked,
  countCompletedLessons,
  getActiveLesson,
  isUnitComplete,
  getTileBackgroundColor,
  sortUnitsByNumber,
} from "~/utils/unit-helpers";