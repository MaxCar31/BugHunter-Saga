import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type LessonSlice = {
  lessonsCompletedByModule: Record<string, number>;
  getLessonsCompletedForModule: (moduleCode: string) => number;
  increaseLessonsCompleted: (moduleCode: string, by?: number) => void;
};

export const createLessonSlice: BoundStateCreator<LessonSlice> = (set, get) => ({
  lessonsCompletedByModule: {},
  getLessonsCompletedForModule: (moduleCode: string) =>
    get().lessonsCompletedByModule[moduleCode] ?? 0,
  increaseLessonsCompleted: (moduleCode: string, by = 1) =>
    set(({ lessonsCompletedByModule }) => ({
      lessonsCompletedByModule: {
        ...lessonsCompletedByModule,
        [moduleCode]: (lessonsCompletedByModule[moduleCode] ?? 0) + by,
      },
    })),
});
