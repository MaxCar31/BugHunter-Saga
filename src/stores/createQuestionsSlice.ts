import type { StateCreator } from "zustand";
import type { ModuleLesson } from "~/utils/lessons"; // Importa los tipos de lecciones

export interface QuestionsSlice {
    questions: Record<string, ModuleLesson[]>; // Usa ModuleLesson[] en lugar de Question[]
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
        try {
            // Corrige la ruta: usa _lesson.ts en lugar de -lessons.ts para coincidir con los nombres de archivos
            const moduleData = await import(`~/utils/${moduleCode}-lessons.ts`);
            const data: ModuleLesson[] = moduleData.default || moduleData.questions; // Asume que exporta default o named 'questions'
            set((state) => ({
                questions: { ...state.questions, [moduleCode]: data },
            }));
        } catch (error) {
            console.error(`Error cargando preguntas para ${moduleCode}:`, error);
        }
    },
    getQuestionsForModule: (moduleCode: string) => get().questions[moduleCode] || [],
});