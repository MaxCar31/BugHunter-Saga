import type { StateCreator } from "zustand";
import { create } from "zustand";
import type { GoalXpSlice } from "~/stores/createGoalXpStore";
import { createGoalXpSlice } from "~/stores/createGoalXpStore";
import type { ModuleSlice } from "~/stores/createModuleStore";
import { createModuleSlice } from "~/stores/createModuleStore";
import type { LessonSlice } from "~/stores/createLessonStore";
import { createLessonSlice } from "~/stores/createLessonStore";
import type { LingotSlice } from "~/stores/createLingotStore";
import { createLingotSlice } from "~/stores/createLingotStore";
import type { SoundSettingsSlice } from "~/stores/createSoundSettingsStore";
import { createSoundSettingsSlice } from "~/stores/createSoundSettingsStore";
import type { StreakSlice } from "~/stores/createStreakStore";
import { createStreakSlice } from "~/stores/createStreakStore";
import type { UserSlice } from "~/stores/createUserStore";
import { createUserSlice } from "~/stores/createUserStore";
import type { XpSlice } from "~/stores/createXpStore";
import { createXpSlice } from "~/stores/createXpStore";
import type { QuestionsSlice } from "~/stores/createQuestionsSlice"; // Importa el tipo para QuestionsSlice
import { createQuestionsSlice } from "~/stores/createQuestionsSlice"; // Importa el slice de preguntas

type BoundState = GoalXpSlice &
  ModuleSlice &
  LessonSlice &
  LingotSlice &
  SoundSettingsSlice &
  StreakSlice &
  UserSlice &
  XpSlice &
  QuestionsSlice; // Agrega QuestionsSlice al tipo BoundState

export type BoundStateCreator<SliceState> = StateCreator<
  BoundState,
  [],
  [],
  SliceState
>;

export const useBoundStore = create<BoundState>((...args) => ({
  ...createGoalXpSlice(...args),
  ...createModuleSlice(...args),
  ...createLessonSlice(...args),
  ...createLingotSlice(...args),
  ...createSoundSettingsSlice(...args),
  ...createStreakSlice(...args),
  ...createUserSlice(...args),
  ...createXpSlice(...args),
  ...createQuestionsSlice(...args), // Agrega el slice de preguntas al store
}));

// Inicializar las preguntas del módulo por defecto DESPUÉS de crear el store
// Esto se ejecuta una sola vez cuando se importa el módulo
if (typeof window !== 'undefined') {
  const currentModule = useBoundStore.getState().module;
  useBoundStore.getState().loadQuestions(currentModule.code);
}