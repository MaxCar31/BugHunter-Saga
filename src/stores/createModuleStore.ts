import type { BoundStateCreator } from "~/hooks/useBoundStore";
import type { ModuleWithTypedUI } from "~/types/module";

export type ModuleSlice = {
  module: ModuleWithTypedUI | null;
  setModule: (newModule: ModuleWithTypedUI) => void;
};

// Cargar módulo desde localStorage (solo en cliente)
const getInitialModule = (): ModuleWithTypedUI | null => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("bh_module");
  if (!stored) return null;
  try {
    return JSON.parse(stored) as ModuleWithTypedUI;
  } catch {
    return null;
  }
};

export const createModuleSlice: BoundStateCreator<ModuleSlice> = (set, get) => {
  const slice = {
    module: getInitialModule(),
    setModule: (newModule: ModuleWithTypedUI) => {
      set({ module: newModule });
      // Persistir en localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("bh_module", JSON.stringify(newModule));
      }
      // Carga preguntas para el módulo seleccionado
      void get().loadQuestions(newModule.code);
    },
  };

  return slice;
};