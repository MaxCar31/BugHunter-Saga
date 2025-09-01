import type { ModuleLesson } from "./lessons";

// Lecciones del Módulo C - Nivel 1: Introducción a Pruebas de Sentencia
export const moduleCLevel1Lessons: readonly ModuleLesson[] = [
    {
        type: "INFO",
        moduleTitle: "Módulo C – Pruebas de Sentencia",
        introduction: `Las Pruebas de Sentencia miden la cobertura de sentencias en el código, es decir, el porcentaje de sentencias ejecutadas durante las pruebas. Esta técnica asegura que cada línea de código se haya ejecutado al menos una vez.

Esta técnica es especialmente útil en testing para:
• Medir qué partes del código se han ejecutado
• Identificar código no alcanzado
• Mejorar la calidad del testing
• Detectar errores en sentencias específicas`,
        objectives: [
            "Comprender qué es la cobertura de sentencias",
            "Identificar sentencias ejecutadas y no ejecutadas",
            "Generar casos de prueba para cobertura completa",
            "Analizar resultados de cobertura"
        ]
    },
    {
        type: "MULTIPLE_CHOICE",
        question: "¿Qué mide la cobertura de sentencias?",
        answers: [
            { name: "El porcentaje de sentencias ejecutadas" },
            { name: "El número de líneas de código" },
            { name: "La complejidad ciclomática" },
        ],
        correctAnswer: 0,
    },
    {
        type: "FILL_IN_THE_BLANK",
        question: "La cobertura de sentencias mide el porcentaje de ______ que han sido ejecutadas durante las pruebas.",
        answerTiles: ["sentencias", "líneas", "código", "ejecutadas"],
        correctAnswer: [0, 3], // ["sentencias", "ejecutadas"]
    },
] as const;

// Exporta por defecto para que coincida con el import en createQuestionsSlice.ts
export default moduleCLevel1Lessons;

// Función helper para obtener lecciones por nivel
export const getModuleCLessons = (level: number): readonly ModuleLesson[] => {
    switch (level) {
        case 1:
            return moduleCLevel1Lessons;
        default:
            return moduleCLevel1Lessons;
    }
};