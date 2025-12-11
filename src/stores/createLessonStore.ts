import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type LessonSlice = {
  // Caché temporal de lecciones completadas que vienen del backend
  // Solo se usa para mostrar el estado de los tiles hasta la próxima carga
  completedLessonsCache: Record<string, Set<number>>;

  // Obtiene el conjunto de lecciones completadas para un módulo (desde caché)
  getCompletedLessons: (moduleCode: string) => Set<number>;

  // Actualiza la caché con los datos que vienen del backend
  updateCompletedLessonsCache: (moduleCode: string, lessonIds: number[]) => void;

  // Limpia la caché (útil para forzar recarga desde backend)
  clearCompletedLessonsCache: (moduleCode?: string) => void;

  // Compatibilidad: Devuelve el conteo de lecciones completadas
  getLessonsCompletedForModule: (moduleCode: string) => number;
};

export const createLessonSlice: BoundStateCreator<LessonSlice> = (set, get) => ({
  // Caché temporal inicialmente vacía
  completedLessonsCache: {},

  getCompletedLessons: (moduleCode: string) => {
    const cache = get().completedLessonsCache[moduleCode];
    return cache ?? new Set<number>();
  },

  updateCompletedLessonsCache: (moduleCode: string, lessonIds: number[]) =>
    set(({ completedLessonsCache }) => ({
      completedLessonsCache: {
        ...completedLessonsCache,
        [moduleCode]: new Set(lessonIds),
      },
    })),

  clearCompletedLessonsCache: (moduleCode?: string) =>
    set(({ completedLessonsCache }) => {
      if (moduleCode) {
        const newCache = { ...completedLessonsCache };
        delete newCache[moduleCode];
        return { completedLessonsCache: newCache };
      } else {
        return { completedLessonsCache: {} };
      }
    }),

  getLessonsCompletedForModule: (moduleCode: string) => {
    const completed = get().getCompletedLessons(moduleCode);
    return completed.size;
  },
});
