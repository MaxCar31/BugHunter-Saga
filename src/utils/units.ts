export type Unit = {
  unitNumber: number;
  description: string;
  backgroundColor: `bg-${string}`;
  textColor: `text-${string}`;
  borderColor: `border-${string}`;
  tiles: Tile[];
};

export type Tile =
  | {
      type: "star" | "dumbbell" | "book" | "trophy" | "fast-forward";
      description: string;
    }
  | { type: "treasure" };

export type TileType = Tile["type"];

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
      },
      {
        type: "book",
        description: "Conceptos básicos",
      },
      {
        type: "star",
        description: "Valores límite",
      },
      { type: "treasure" },
      { type: "book", description: "Ejercicios prácticos" },
      { type: "trophy", description: "Evaluación Módulo A" },
    ],
  },
  {
    unitNumber: 1,
    description: "Tablas de Decisión en Testing",
    backgroundColor: "bg-[#f2a445]",
    textColor: "text-[#f2a445]",
    borderColor: "border-[#d18a2a]",
    tiles: [
      { type: "fast-forward", description: "Introducción a Tablas de Decisión" },
      { type: "dumbbell", description: "Práctica personalizada" },
      { type: "book", description: "Construcción de tablas" },
      { type: "treasure" },
      { type: "star", description: "Reglas de decisión" },
      { type: "book", description: "Casos de prueba complejos" },
      { type: "star", description: "Optimización de tablas" },
      { type: "book", description: "Validación completa" },
      { type: "treasure" },
      { type: "dumbbell", description: "Práctica personalizada" },
      { type: "trophy", description: "Evaluación Módulo B" },
    ],
  },
  {
    unitNumber: 1,
    description: "Pruebas de Sentencia y Cobertura",
    backgroundColor: "bg-[#f2a445]",
    textColor: "text-[#f2a445]",
    borderColor: "border-[#d18a2a]",
    tiles: [
      { type: "fast-forward", description: "Introducción a Pruebas de Sentencia" },
      { type: "book", description: "Análisis de código" },
      { type: "star", description: "Cobertura de sentencias" },
      { type: "treasure" },
      { type: "book", description: "Métricas de cobertura" },
      { type: "star", description: "Optimización de pruebas" },
      { type: "treasure" },
      { type: "dumbbell", description: "Práctica personalizada" },
      { type: "book", description: "Casos avanzados" },
      { type: "trophy", description: "Evaluación Módulo C" },
    ],
  },
];

// Función para obtener la unidad correspondiente a un módulo
export const getUnitForModule = (moduleCode: string): Unit | null => {
  switch (moduleCode) {
    case "mod-a":
      return units[0] ?? null;
    case "mod-b":
      return units[1] ?? null;
    case "mod-c":
      return units[2] ?? null;
    default:
      return null;
  }
};
