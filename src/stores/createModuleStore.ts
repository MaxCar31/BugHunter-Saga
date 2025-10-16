import modules, { type Module } from "~/utils/modules";
import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type ModuleSlice = {
  module: Module;
  setModule: (newModule: Module) => void;
};

const defaultModuleIndex = 0; // Módulo A por defecto

export const createModuleSlice: BoundStateCreator<ModuleSlice> = (set, get) => {
  const defaultModule = modules[defaultModuleIndex];
  const slice = {
    module: defaultModule,
    setModule: (newModule: Module) => {
      set({ module: newModule });
      // Carga preguntas para el módulo seleccionado
      get().loadQuestions(newModule.code);
    },
  };

  // Carga preguntas para el módulo por defecto (Módulo A) al inicializar el slice
  // get().loadQuestions(defaultModule.code);

  return slice;
};