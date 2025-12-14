import React from "react";
import { apiBase } from "./config";

// Agrega lessonId a los tipos base o al tipo unión
export type LessonBase = {
    lessonId: number; // <--- AGREGAR ESTO
    id?: number;
    position?: number;
}

// Definición de tipos para las lecciones del Módulo B
export type LessonInfo = LessonBase & { // Extender de LessonBase
    type: "INFO";
    moduleTitle?: string;
    introduction?: string;
    objectives?: string[];
};

export type LessonMultipleChoice = LessonBase & { // Extender de LessonBase
    type: "MULTIPLE_CHOICE";
    question?: string;
    answers?: Array<{ name: string; icon?: React.ReactNode }>;
    correctAnswer?: number;
};

export type LessonFillInTheBlank = LessonBase & { // Extender de LessonBase
    type: "FILL_IN_THE_BLANK";
    question?: string;
    answerTiles?: string[];
    correctAnswerIndices?: number[];
};

export type LessonMatchPairs = LessonBase & { // Extender de LessonBase
    type: "MATCH_PAIRS";
    // Agregar propiedades específicas según sea necesario
    question?: string;
    pairs?: Array<{ left: string; right: string }>;
};

export type ModuleLesson = LessonInfo | LessonMultipleChoice | LessonFillInTheBlank | LessonMatchPairs;

// Función para mapear tipos del backend a tipos del frontend
const mapBackendProblemToFrontend = (backendProblem: any): ModuleLesson => {
    // Mapear tipos del backend a tipos del frontend
    let type: "INFO" | "MULTIPLE_CHOICE" | "FILL_IN_THE_BLANK" | "MATCH_PAIRS" = "INFO";

    switch (backendProblem.type) {
        case "INFO":
            type = "INFO";
            break;
        case "SELECT_1_OF_3":
        case "MULTIPLE_CHOICE":
            type = "MULTIPLE_CHOICE";
            break;
        case "FILL_IN_THE_BLANK":
            type = "FILL_IN_THE_BLANK";
            break;
        case "MATCH_PAIRS":
            type = "MATCH_PAIRS";
            break;
        default:
            console.warn(`Unknown problem type: ${backendProblem.type}, defaulting to INFO`);
            type = "INFO";
    }

    return {
        ...backendProblem,
        type,
    } as ModuleLesson;
};

// Nueva función para cargar lecciones desde el backend
export const fetchModuleProblems = async (moduleCode: string, token?: string): Promise<ModuleLesson[]> => {
    try {
        const response = await fetch(`${apiBase}/api/content/modules/${moduleCode}/problems`, {
            headers: {
                accept: "*/*",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status} fetching problems for module ${moduleCode}`);
        }

        const data = await response.json();

        // Mapear cada problema del backend al formato del frontend
        const mappedProblems = data.map(mapBackendProblemToFrontend);

        return mappedProblems;
    } catch (error) {
        console.error(`Error fetching problems for module ${moduleCode}:`, error);
        throw error;
    }
};

export const fetchProblemsByLessonId = async (lessonId: number, token?: string): Promise<ModuleLesson[]> => {
    try {
        // Usamos el endpoint específico que creaste en el Backend
        const response = await fetch(`${apiBase}/api/content/modules/lessons/${lessonId}/problems`, {
            headers: {
                accept: "*/*",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status} fetching problems for lesson ${lessonId}`);
        }

        const data = await response.json();
        return data.map(mapBackendProblemToFrontend);
    } catch (error) {
        console.error(`Error fetching problems for lesson ${lessonId}:`, error);
        throw error;
    }
};
