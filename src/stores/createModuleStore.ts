import type { BoundStateCreator } from "~/hooks/useBoundStore";
import type {Module}  from "~/utils/modules";


export type ModuleSlice = {
  module: Module | null; 
  setModule: (newModule: Module) => void;
};



export const createModuleSlice: BoundStateCreator<ModuleSlice> = (set, get) => {
  const slice = {
    module: null, // <-- CAMBIADO: Estado inicial es null
    setModule: (newModule: Module) => {
      set({ module: newModule });
      // Carga preguntas para el módulo seleccionado
      get().loadQuestions(newModule.code);
    },
  };

  return slice;
};