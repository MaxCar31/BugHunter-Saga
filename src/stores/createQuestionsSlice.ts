import type { StateCreator } from "zustand";
import type { ModuleLesson } from "~/utils/lessons";
import { fetchModuleProblems } from "~/utils/lessons";
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
    // Si ya tenemos preguntas para este módulo, no las cargamos de nuevo
    if ((get().questions[moduleCode]?.length ?? 0) > 0) {
      return;
    }

    try {
      const token = localStorage.getItem("bh_token");
      const problems = await fetchModuleProblems(moduleCode, token || undefined);

      set((state) => ({
        questions: { ...state.questions, [moduleCode]: problems },
      }));
    } catch (error) {
      console.error(`Error loading questions for ${moduleCode}:`, error);

      // Mantener array vacío en caso de error
      set((state) => ({
        questions: { ...state.questions, [moduleCode]: [] },
      }));
    }
  },

  getQuestionsForModule: (moduleCode: string) =>
    get().questions[moduleCode] || [],
});