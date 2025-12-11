/**
 * @deprecated Este archivo ha sido refactorizado.
 * 
 * Los tipos ahora están en: src/types/module.ts
 * Los servicios ahora están en: src/services/moduleService.ts
 * Las funciones helper ahora están en: src/utils/module-helpers.ts
 * 
 * Por favor actualiza tus imports:
 * 
 * Antes:
 * import { Module, fetchModules } from "~/utils/modules";
 * 
 * Después:
 * import type { Module } from "~/types/module";
 * import { fetchModules } from "~/services/moduleService";
 */

// Re-exports temporales para backward compatibility (eliminar después de migración)
export type { Module, ModuleWithTypedUI } from "~/types/module";
export { fetchModules } from "~/services/moduleService";
export {
  findModuleByCode,
  findModuleById,
  sortModulesById,
  getModuleBorderColor,
  getModuleBackgroundColor,
  getModuleTextColor,
  hasCompleteUIConfig,
} from "~/utils/module-helpers";