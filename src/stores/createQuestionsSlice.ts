import type { StateCreator } from "zustand";
import type { ModuleLesson } from "~/utils/lessons";
import { apiBase } from "~/utils/config";
export interface QuestionsSlice {
  questions: Record<string, ModuleLesson[]>;
  loadQuestions: (moduleCode: string) => Promise<void>;
  getQuestionsForModule: (moduleCode: string) => ModuleLesson[];
}


export const createQuestionsSlice: StateCreator<
  QuestionsSlice,
  [],
  [],
  QuestionsSlice
> = (set, get) => ({
  questions: {},
  
  loadQuestions: async (moduleCode: string) => {

  if ((get().questions[moduleCode]?.length ?? 0) > 0) {
    return;
  }

    try {
      // Obtenemos el token de autenticación del localStorage
      const token = localStorage.getItem("bh_token");
      
      const response = await fetch(
        `${apiBase}/api/content/modules/${moduleCode}/problems`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          console.error("Error 401: Token no válido o expirado.");
        }
        throw new Error(`Error ${response.status} cargando preguntas de ${moduleCode}`);
      }

      const data: ModuleLesson[] = await response.json();

      set((state) => ({
        questions: { ...state.questions, [moduleCode]: data },
      }));
    } catch (error) {
      console.error(`Error cargando preguntas para ${moduleCode} desde la API:`, error);
      set((state) => ({
        questions: { ...state.questions, [moduleCode]: [] },
      }));
    }
  },

  getQuestionsForModule: (moduleCode: string) => 
    get().questions[moduleCode] || [],
});