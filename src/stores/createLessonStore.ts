import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type LessonSlice = {
  // Cambio: Ahora guardamos un Set de lessonIds completados por módulo
  completedLessonsByModule: Record<string, Set<number>>;

  // Verifica si una lección específica está completada
  isLessonCompleted: (moduleCode: string, lessonId: number) => boolean;

  // Marca una lección como completada
  markLessonAsCompleted: (moduleCode: string, lessonId: number) => void;

  // Obtiene todas las lecciones completadas de un módulo
  getCompletedLessons: (moduleCode: string) => Set<number>;

  // Compatibilidad: Devuelve el conteo de lecciones completadas
  getLessonsCompletedForModule: (moduleCode: string) => number;
};

export const createLessonSlice: BoundStateCreator<LessonSlice> = (set, get) => ({
  completedLessonsByModule: {},

  isLessonCompleted: (moduleCode: string, lessonId: number) => {
    const completed = get().completedLessonsByModule[moduleCode];
    return completed ? completed.has(lessonId) : false;
  },

  markLessonAsCompleted: (moduleCode: string, lessonId: number) =>
    set(({ completedLessonsByModule }) => {
      const currentCompleted = completedLessonsByModule[moduleCode] ?? new Set<number>();
      const newCompleted = new Set(currentCompleted);
      newCompleted.add(lessonId);

      return {
        completedLessonsByModule: {
          ...completedLessonsByModule,
          [moduleCode]: newCompleted,
        },
      };
    }),

  getCompletedLessons: (moduleCode: string) => {
    return get().completedLessonsByModule[moduleCode] ?? new Set<number>();
  },

  // Compatibilidad: Retorna el número de lecciones completadas
  getLessonsCompletedForModule: (moduleCode: string) => {
    const completed = get().completedLessonsByModule[moduleCode];
    return completed ? completed.size : 0;
  },
});
