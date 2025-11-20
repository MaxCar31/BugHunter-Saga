import type { BoundStateCreator } from "~/hooks/useBoundStore";
import type { ModuleWithTypedUI } from "~/types/module";

export type ModuleSlice = {
  module: ModuleWithTypedUI | null;
  setModule: (newModule: ModuleWithTypedUI) => void;
};

export const createModuleSlice: BoundStateCreator<ModuleSlice> = (set, get) => {
  const slice = {
    module: null,
    setModule: (newModule: ModuleWithTypedUI) => {
      set({ module: newModule });
      // Carga preguntas para el módulo seleccionado
      void get().loadQuestions(newModule.code);
    },
  };

  return slice;
};