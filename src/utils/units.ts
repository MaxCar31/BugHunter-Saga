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
  lessonId: number; // Nuevo: viene de la API
  status: "LOCKED" | "ACTIVE" | "COMPLETE"; // Nuevo: viene de la API
};

export type TileType = Tile["type"];

// Estos datos estáticos ya no se usan en learn.tsx, pero se mantienen por compatibilidad
export const units: readonly Unit[] = [
  {
    unitNumber: 1,
    description: "Fundamentos de Partición de Equivalencia",
    backgroundColor: "bg-[#f2a445]",
    textColor: "text-[#f2a445]",
    borderColor: "border-[#d18a2a]",
    tiles: [
      {
        type: "star",
        description: "Introducción a Partición de Equivalencia",
        lessonId: 1,
        status: "ACTIVE"
      },
      {
        type: "book",
        description: "Conceptos básicos",
        lessonId: 2,
        status: "LOCKED"
      },
      {
        type: "star",
        description: "Valores límite",
        lessonId: 3,
        status: "LOCKED"
      },
      { 
        type: "treasure",
        description: "",
        lessonId: 0,
        status: "LOCKED"
      },
      { 
        type: "book",
        description: "Ejercicios prácticos",
        lessonId: 4,
        status: "LOCKED"
      },
      { 
        type: "trophy",
        description: "Evaluación Módulo A",
        lessonId: 5,
        status: "LOCKED"
      },
    ],
  },
  {
    unitNumber: 1,
    description: "Tablas de Decisión en Testing",
    backgroundColor: "bg-[#f2a445]",
    textColor: "text-[#f2a445]",
    borderColor: "border-[#d18a2a]",
    tiles: [
      { 
        type: "fast-forward",
        description: "Introducción a Tablas de Decisión",
        lessonId: 1,
        status: "ACTIVE"
      },
      { 
        type: "dumbbell",
        description: "Práctica personalizada",
        lessonId: 2,
        status: "LOCKED"
      },
      { 
        type: "book",
        description: "Construcción de tablas",
        lessonId: 3,
        status: "LOCKED"
      },
      { 
        type: "treasure",
        description: "",
        lessonId: 0,
        status: "LOCKED"
      },
      { 
        type: "star",
        description: "Reglas de decisión",
        lessonId: 4,
        status: "LOCKED"
      },
      { 
        type: "book",
        description: "Casos de prueba complejos",
        lessonId: 5,
        status: "LOCKED"
      },
      { 
        type: "star",
        description: "Optimización de tablas",
        lessonId: 6,
        status: "LOCKED"
      },
      { 
        type: "book",
        description: "Validación completa",
        lessonId: 7,
        status: "LOCKED"
      },
      { 
        type: "treasure",
        description: "",
        lessonId: 0,
        status: "LOCKED"
      },
      { 
        type: "dumbbell",
        description: "Práctica personalizada",
        lessonId: 8,
        status: "LOCKED"
      },
      { 
        type: "trophy",
        description: "Evaluación Módulo B",
        lessonId: 9,
        status: "LOCKED"
      },
    ],
  },
  {
    unitNumber: 1,
    description: "Pruebas de Sentencia y Cobertura",
    backgroundColor: "bg-[#f2a445]",
    textColor: "text-[#f2a445]",
    borderColor: "border-[#d18a2a]",
    tiles: [
      { 
        type: "fast-forward",
        description: "Introducción a Pruebas de Sentencia",
        lessonId: 1,
        status: "ACTIVE"
      },
      { 
        type: "book",
        description: "Análisis de código",
        lessonId: 2,
        status: "LOCKED"
      },
      { 
        type: "star",
        description: "Cobertura de sentencias",
        lessonId: 3,
        status: "LOCKED"
      },
      { 
        type: "treasure",
        description: "",
        lessonId: 0,
        status: "LOCKED"
      },
      { 
        type: "book",
        description: "Métricas de cobertura",
        lessonId: 4,
        status: "LOCKED"
      },
      { 
        type: "star",
        description: "Optimización de pruebas",
        lessonId: 5,
        status: "LOCKED"
      },
      { 
        type: "treasure",
        description: "",
        lessonId: 0,
        status: "LOCKED"
      },
      { 
        type: "dumbbell",
        description: "Práctica personalizada",
        lessonId: 6,
        status: "LOCKED"
      },
      { 
        type: "book",
        description: "Casos avanzados",
        lessonId: 7,
        status: "LOCKED"
      },
      { 
        type: "trophy",
        description: "Evaluación Módulo C",
        lessonId: 8,
        status: "LOCKED"
      },
    ],
  },
];

// Esta función ya no se usa en learn.tsx, pero se mantiene por compatibilidad
export const getUnitForModule = (moduleCode: string): Unit | null => {
  switch (moduleCode) {
    case "moduleA":
      return units[0] ?? null;
    case "moduleB":
      return units[1] ?? null;
    case "moduleC":
      return units[2] ?? null;
    default:
      return null;
  }
};