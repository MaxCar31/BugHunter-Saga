import type { StateCreator } from "zustand";
import type { ModuleLesson } from "~/utils/lessons";
import { fetchModuleProblems, fetchLessonProblems } from "~/utils/lessons";
export interface QuestionsSlice {
  questions: Record<string, ModuleLesson[]>;
  problems: ModuleLesson[]; // Problemas de la lección actual
  loadQuestions: (moduleCode: string) => Promise<void>;
  loadLessonProblems: (lessonId: number) => Promise<void>;
  getQuestionsForModule: (moduleCode: string) => ModuleLesson[];
}


export const createQuestionsSlice: StateCreator<
  QuestionsSlice,
  [],
  [],
  QuestionsSlice
> = (set, get) => ({
  questions: {},
  problems: [],

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

  loadLessonProblems: async (lessonId: number) => {
    try {
      const token = localStorage.getItem("bh_token");
      const problems = await fetchLessonProblems(lessonId, token || undefined);

      set({ problems });
    } catch (error) {
      console.error(`Error loading problems for lesson ${lessonId}:`, error);
      set({ problems: [] });
    }
  },

  getQuestionsForModule: (moduleCode: string) =>
    get().questions[moduleCode] || [],
});