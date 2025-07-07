import modules, { type Module } from "~/utils/modules";
import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type ModuleSlice = {
  module: Module;
  setModule: (newModule: Module) => void;
};

const defaultModuleIndex = 0; // Módulo A por defecto

export const createModuleSlice: BoundStateCreator<ModuleSlice> = (set) => ({
  module: modules[defaultModuleIndex],
  setModule: (newModule: Module) => set({ module: newModule }),
});
