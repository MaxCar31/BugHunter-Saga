import type {
    ModuleLesson,
    LessonType,
    BackendProblem,
    BackendProblemType
} from "~/types/lesson";

/**
 * Utilidades para trabajar con lecciones
 */

/**
 * Mapea el tipo de problema del backend al tipo del frontend
 * @param backendType - Tipo de problema del backend
 * @returns Tipo de lección del frontend
 */
export const mapBackendTypeToFrontend = (backendType: BackendProblemType): LessonType => {
    switch (backendType) {
        case "INFO":
            return "INFO";
        case "SELECT_1_OF_3":
        case "MULTIPLE_CHOICE":
            return "MULTIPLE_CHOICE";
        case "FILL_IN_THE_BLANK":
            return "FILL_IN_THE_BLANK";
        case "MATCH_PAIRS":
            return "MATCH_PAIRS";
        default:
            console.warn(`Unknown problem type: ${String(backendType)}, defaulting to INFO`);
            return "INFO";
    }
};

/**
 * Mapea un problema del backend al formato del frontend
 * @param backendProblem - Problema en formato del backend
 * @returns Problema en formato del frontend
 */
export const mapBackendProblemToFrontend = (backendProblem: BackendProblem): ModuleLesson => {
    const type = mapBackendTypeToFrontend(backendProblem.type);

    // Normalizar objectives como array si es tipo INFO
    const normalizedProblem = { ...backendProblem, type };

    if (type === "INFO" && normalizedProblem.objectives) {
        normalizedProblem.objectives = Array.isArray(normalizedProblem.objectives)
            ? normalizedProblem.objectives
            : [normalizedProblem.objectives];
    }

    return normalizedProblem as ModuleLesson;
};

/**
 * Calcula el porcentaje de respuestas correctas
 * @param correct - Número de respuestas correctas
 * @param total - Total de preguntas
 * @returns Porcentaje (0-100)
 */
export const calculateAccuracyPercentage = (correct: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((correct / total) * 100);
};

/**
 * Verifica si una lección fue aprobada
 * @param correct - Número de respuestas correctas
 * @param total - Total de preguntas
 * @param passingScore - Puntaje mínimo para aprobar (default: 80%)
 * @returns true si aprobó, false si no
 */
export const isLessonPassed = (
    correct: number,
    total: number,
    passingScore: number = 80
): boolean => {
    const accuracy = calculateAccuracyPercentage(correct, total);
    return accuracy >= passingScore;
};

/**
 * Calcula el tiempo en formato legible
 * @param milliseconds - Tiempo en milisegundos
 * @returns Tiempo formateado (ej: "2:30")
 */
export const formatLessonTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
