import { apiBase } from "./config";

export type Module = {
  id: number;
  code: string;
  name: string;
  shortName: string;
  description: string;
  uiConfig: {
    backgroundColor: string;
    color: string;
    borderColor?: string;
    icon: string;
    textColor?: string;
  };
  viewBox?: string; // Para compatibilidad con Flag.tsx
};

export const fetchModules = async (token?: string): Promise<Module[]> => {
  try {
    const response = await fetch(`${apiBase}/api/content/modules`, {
      headers: {
        accept: "*/*",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status} fetching modules`);
    }

    const modules: Module[] = await response.json();

    return modules.map((module) => ({
      ...module,
      viewBox: "0 0 24 19", // Default viewBox para Flag component
      uiConfig: {
        ...module.uiConfig,
        backgroundColor: module.uiConfig.backgroundColor as `bg-${string}`,
        borderColor: (module.uiConfig.borderColor ?? `border-${module.uiConfig.color}-600`) as `border-${string}`,
        textColor: (module.uiConfig.textColor ?? `text-${module.uiConfig.color}-500`) as `text-${string}`,
      },
    }));
  } catch (error) {
    console.error("Error fetching modules:", error);
    throw error;
  }
};

const modules: Module[] = [];

export default modules;