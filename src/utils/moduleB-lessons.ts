

// Definición de tipos para las lecciones del Módulo B
export type LessonInfo = {
  type: "INFO";
  moduleTitle: string;
  introduction: string;
  objectives: string[];
};

export type LessonSelectOneOfThree = {
  type: "SELECT_1_OF_3";
  question: string;
  answers: Array<{  name: string }>;
  correctAnswer: number;
};

export type LessonWriteInEnglish = {
  type: "WRITE_IN_ENGLISH";
  question: string;
  answerTiles: string[];
  correctAnswer: number[];
};

export type ModuleBLesson = LessonInfo | LessonSelectOneOfThree | LessonWriteInEnglish;

// Lecciones del Módulo B - Nivel 1: Introducción a Tablas de Decisión
export const moduleBLevel1Lessons: readonly ModuleBLesson[] = [
  {
    type: "INFO",
    moduleTitle: "Módulo B – Tablas de Decisión",
    introduction: `Las Tablas de Decisión son una técnica de análisis y documentación que permite representar de manera clara y estructurada las diferentes combinaciones de condiciones y sus correspondientes acciones o resultados.

Esta técnica es especialmente útil en testing para:
• Identificar todos los casos de prueba posibles
• Garantizar cobertura completa de combinaciones
• Simplificar lógica compleja de negocio
• Documentar reglas de decisión de forma clara`,
    objectives: [
      "Comprender qué son las tablas de decisión",
      "Identificar componentes: condiciones, acciones y reglas",
      "Construir tablas básicas para casos simples",
      "Generar casos de prueba efectivos"
    ]
  },
  {
    type: "SELECT_1_OF_3",
    question: "¿Qué representa una fila en una tabla de decisión?",
    answers: [
      { name: "Una regla de decisión" },
      { name: "Una condición individual" },
      { name: "Una acción específica" },
    ],
    correctAnswer: 0,
  },
  {
    type: "WRITE_IN_ENGLISH",
    question: "Una tabla de decisión representa combinaciones de _____ y sus correspondientes _____",
    answerTiles: ["condiciones", "acciones", "reglas", "resultados", "decisiones", "casos"],
    correctAnswer: [0, 3], // ["condiciones", "resultados"]
  },
] as const;

// Función helper para obtener lecciones por nivel
export const getModuleBLessons = (level: number): readonly ModuleBLesson[] => {
  switch (level) {
    case 1:
      return moduleBLevel1Lessons;
    default:
      return moduleBLevel1Lessons;
  }
};
