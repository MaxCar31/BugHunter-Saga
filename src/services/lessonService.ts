import { apiBase } from "~/utils/config";
import type {
  ModuleLesson,
  LessonCompletionRequest,
  LessonCompletionResponse,
  BackendProblem
} from "~/types/lesson";
import { mapBackendProblemToFrontend } from "~/utils/lesson-helpers";

/**
 * Service para gestionar lecciones y problemas
 */

const createAuthHeaders = (token?: string) => ({
  accept: "*/*",
  "Content-Type": "application/json",
  ...(token && { Authorization: `Bearer ${token}` }),
});

/**
 * Obtiene los problemas de un módulo específico
 * @param moduleCode - Código del módulo
 * @param token - Token JWT opcional
 * @returns Lista de problemas de la lección
 */
export const fetchModuleProblems = async (moduleCode: string, token?: string): Promise<ModuleLesson[]> => {
  try {
    const response = await fetch(`${apiBase}/api/content/modules/${moduleCode}/problems`, {
      headers: createAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status} fetching problems for module ${moduleCode}`);
    }

    const data: BackendProblem[] = await response.json();
    return data.map(mapBackendProblemToFrontend);
  } catch (error) {
    console.error(`Error fetching problems for module ${moduleCode}:`, error);
    throw error;
  }
};

/**
 * Obtiene los problemas de una lección específica
 * @param lessonId - ID de la lección
 * @param token - Token JWT opcional
 * @returns Lista de problemas de la lección
 */
export const fetchLessonProblems = async (lessonId: number, token?: string): Promise<ModuleLesson[]> => {
  try {
    const response = await fetch(`${apiBase}/api/content/modules/lessons/${lessonId}/problems`, {
      headers: createAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status} fetching problems for lesson ${lessonId}`);
    }

    const data: BackendProblem[] = await response.json();
    return data.map(mapBackendProblemToFrontend);
  } catch (error) {
    console.error(`Error fetching problems for lesson ${lessonId}:`, error);
    throw error;
  }
};

/**
 * Completa una lección y registra el progreso
 * @param request - Datos de completación de la lección
 * @returns Recompensas obtenidas (XP, lingots, racha)
 */
export const completeLessonAPI = async (
  request: LessonCompletionRequest
): Promise<LessonCompletionResponse> => {
  const token = localStorage.getItem("bh_token");

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(`${apiBase}/api/progress/lesson`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to complete lesson: ${errorText}`);
  }

  return response.json();
};