/**
 * @deprecated Este archivo ha sido refactorizado.
 * 
 * Los tipos ahora están en: src/types/lesson.ts
 * Los servicios ahora están en: src/services/lessonService.ts
 * Las funciones helper ahora están en: src/utils/lesson-helpers.ts
 * 
 * Por favor actualiza tus imports:
 * 
 * Antes:
 * import { ModuleLesson, fetchModuleProblems } from "~/utils/lessons";
 * 
 * Después:
 * import type { ModuleLesson } from "~/types/lesson";
 * import { fetchModuleProblems } from "~/services/lessonService";
 */

// Re-exports temporales para backward compatibility (eliminar después de migración)
export type {
    LessonInfo,
    LessonMultipleChoice,
    LessonFillInTheBlank,
    LessonMatchPairs,
    ModuleLesson,
} from "~/types/lesson";

export {
    fetchModuleProblems,
    fetchLessonProblems
} from "~/services/lessonService";

export {
    mapBackendProblemToFrontend,
    calculateAccuracyPercentage,
    isLessonPassed,
    formatLessonTime,
} from "~/utils/lesson-helpers";
