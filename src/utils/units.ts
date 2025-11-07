import { apiBase } from "./config";

export type Unit = {
  unitNumber: number;
  description: string;
  backgroundColor: `bg-${string}`;
  textColor: `text-${string}`;
  borderColor: `border-${string}`;
  tiles: Tile[];
};

// --- TIPO ACTUALIZADO PARA COINCIDIR CON LA API ---
export type Tile = {
  type: "star" | "dumbbell" | "book" | "trophy" | "fast-forward" | "treasure";
  description: string;
  lessonId: number; // Viene de la API
  status: "LOCKED" | "ACTIVE" | "COMPLETE"; // Viene de la API
};

export type TileType = Tile["type"];

// Función para cargar unidades desde el backend
export const fetchModuleUnit = async (moduleCode: string, token?: string): Promise<Unit> => {
  try {
    const response = await fetch(`${apiBase}/api/content/modules/${moduleCode}/unit`, {
      headers: {
        accept: "*/*",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status} fetching unit for module ${moduleCode}`);
    }

    const data = await response.json();
    return data as Unit;
  } catch (error) {
    console.error(`Error fetching unit for module ${moduleCode}:`, error);
    throw error;
  }
};