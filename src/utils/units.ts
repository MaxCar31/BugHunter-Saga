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
    backgroundColor: "bg-[#58cc02]",
    textColor: "text-[#58cc02]",
    borderColor: "border-[#46a302]",
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
    unitNumber: 2,
    description: "Tablas de Decisión en Testing",
    backgroundColor: "bg-[#ce82ff]",
    textColor: "text-[#ce82ff]",
    borderColor: "border-[#a568cc]",
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
    unitNumber: 3,
    description: "Pruebas de Sentencia y Cobertura",
    backgroundColor: "bg-[#00cd9c]",
    textColor: "text-[#00cd9c]",
    borderColor: "border-[#00a47d]",
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
