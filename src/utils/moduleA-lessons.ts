import { ModuleLesson } from "./lessons";

// Lecciones del Módulo A - Nivel 1: Introducción a Particiones de Equivalencia
export const moduleALevel1Lessons: readonly ModuleLesson[] = [
    {
        type: "INFO",
        moduleTitle: "Módulo A – Particiones de Equivalencia",
        introduction: `Las Particiones de Equivalencia son una técnica de testing que divide el dominio de entrada de un sistema en clases de equivalencia válidas e inválidas. Cada clase representa un conjunto de valores que deberían comportarse de manera similar.

Esta técnica es especialmente útil en testing para:
• Reducir el número de casos de prueba sin perder cobertura
• Identificar clases válidas e inválidas de entrada
• Optimizar el esfuerzo de testing
• Detectar errores en límites y valores extremos`,
        objectives: [
            "Comprender qué son las particiones de equivalencia",
            "Identificar clases válidas e inválidas",
            "Construir particiones para casos simples",
            "Generar casos de prueba efectivos"
        ]
    },
    // ...existing code...
    {
        type: "MULTIPLE_CHOICE",
        question: "¿Qué es la técnica de Partición de Equivalencia (EP)?",
        answers: [
            { name: "Un método para dividir los datos de entrada en grupos que se procesan de manera similar." },
            { name: "Un enfoque para probar todas las combinaciones posibles de entradas." },
            { name: "Una técnica de pruebas de caja blanca basada en el código." },
            { name: "Un método para diseñar la arquitectura del sistema." }
        ],
        correctAnswer: 0,
    },
    {
        type: "MULTIPLE_CHOICE",
        question: "¿Por qué se utiliza la técnica de Partición de Equivalencia?",
        answers: [
            { name: "Para reducir la cantidad de casos de prueba sin perder efectividad." },
            { name: "Para ejecutar pruebas más rápidas sin necesidad de documentación." },
            { name: "Para asegurar que el código fuente esté bien estructurado." },
            { name: "Para probar únicamente los valores inválidos." }
        ],
        correctAnswer: 0,
    },
    {
        type: "MULTIPLE_CHOICE",
        question: "¿Qué característica define a una partición de equivalencia?",
        answers: [
            { name: "Los valores dentro de la partición se espera que sean procesados de la misma forma." },
            { name: "Los valores de la partición son siempre distintos entre sí." },
            { name: "Cada partición contiene tanto datos válidos como inválidos mezclados." },
            { name: "Los valores de la partición cambian en cada ejecución." }
        ],
        correctAnswer: 0,
    },
    {
        type: "MULTIPLE_CHOICE",
        question: "¿Qué ocurre si un defecto es encontrado en un valor dentro de una partición?",
        answers: [
            { name: "Se asume que otros valores de la misma partición también podrían revelar el mismo defecto." },
            { name: "Es necesario probar nuevamente todos los valores posibles de entrada." },
            { name: "El defecto se limita únicamente a ese valor específico." },
            { name: "El defecto no tiene relación con la partición." }
        ],
        correctAnswer: 0,
    },
    {
        type: "MULTIPLE_CHOICE",
        question: "¿Qué es una partición válida?",
        answers: [
            { name: "Conjunto de valores que el sistema acepta y procesa." },
            { name: "Conjunto de valores que siempre producen errores." },
            { name: "Valores no definidos en la especificación." },
            { name: "Conjunto de datos irrelevantes para la prueba." }
        ],
        correctAnswer: 0,
    },
    {
        type: "MULTIPLE_CHOICE",
        question: "¿Qué es una partición inválida?",
        answers: [
            { name: "Valores que el sistema debe rechazar o para los cuales no existe un procesamiento definido." },
            { name: "Conjunto de datos que siempre generan resultados correctos." },
            { name: "Datos que no influyen en la ejecución del software." },
            { name: "Valores que siempre forman parte de una partición válida." }
        ],
        correctAnswer: 0,
    },
    {
        type: "MULTIPLE_CHOICE",
        question: "Para lograr una cobertura completa (100%) con Partición de Equivalencia, es necesario:",
        answers: [
            { name: "Probar al menos un valor representativo de cada partición, válida e inválida." },
            { name: "Probar absolutamente todos los valores de entrada posibles." },
            { name: "Ejecutar únicamente las particiones válidas." },
            { name: "Considerar solo los parámetros principales del sistema." }
        ],
        correctAnswer: 0,
    },
    {
        type: "MULTIPLE_CHOICE",
        question: "¿Cómo se mide la cobertura en la técnica de Partición de Equivalencia?",
        answers: [
            { name: "Número de particiones ejercidas ÷ número total de particiones identificadas." },
            { name: "Número de errores encontrados ÷ número de valores probados." },
            { name: "Número de casos de prueba ejecutados ÷ número de líneas de código." },
            { name: "Número de entradas inválidas ÷ número de entradas válidas." }
        ],
        correctAnswer: 0,
    },
    {
        type: "MULTIPLE_CHOICE",
        question: "Verdadero o Falso: Una partición de equivalencia puede ser continua o discreta, finita o infinita.",
        answers: [
            { name: "Verdadero" },
            { name: "Falso" }
        ],
        correctAnswer: 0,
    },
    {
        type: "MULTIPLE_CHOICE",
        question: "Verdadero o Falso: Las particiones de equivalencia pueden superponerse entre sí.",
        answers: [
            { name: "Verdadero" },
            { name: "Falso" }
        ],
        correctAnswer: 1,
    },
    // ...existing code...
] as const;


// Exporta por defecto para que coincida con el import en createQuestionsSlice.ts
export default moduleALevel1Lessons;


// Función helper para obtener lecciones por nivel
export const getModuleALessons = (level: number): readonly ModuleLesson[] => {
    switch (level) {
        case 1:
            return moduleALevel1Lessons;
        default:
            return moduleALevel1Lessons;
    }
};