import React from "react";
import { apiBase } from "./config";

// Definición de tipos para las lecciones del Módulo B
export type LessonInfo = {
    type: "INFO";
    moduleTitle?: string;
    introduction?: string;
    objectives?: string[];
};

export type LessonMultipleChoice = {
    type: "MULTIPLE_CHOICE";
    question?: string;
    answers?: Array<{ name: string; icon?: React.ReactNode }>;
    correctAnswer?: number;
};

export type LessonFillInTheBlank = {
    type: "FILL_IN_THE_BLANK";
    question?: string;
    answerTiles?: string[];
    correctAnswerIndices?: number[];
};

export type LessonMatchPairs = {
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

    // Normalizar objectives como array
    const normalizedProblem = { ...backendProblem, type };

    if (type === "INFO" && normalizedProblem.objectives) {
        normalizedProblem.objectives = Array.isArray(normalizedProblem.objectives)
            ? normalizedProblem.objectives
            : [normalizedProblem.objectives];
    }

    return normalizedProblem as ModuleLesson;
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

// Nueva función para cargar problemas de una lección específica
export const fetchLessonProblems = async (lessonId: number, token?: string): Promise<ModuleLesson[]> => {
    try {
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

        // Mapear cada problema del backend al formato del frontend
        const mappedProblems = data.map(mapBackendProblemToFrontend);

        return mappedProblems;
    } catch (error) {
        console.error(`Error fetching problems for lesson ${lessonId}:`, error);
        throw error;
    }
};
