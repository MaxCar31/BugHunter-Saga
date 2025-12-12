import type React from "react";

/**
 * Tipos para lecciones y problemas del sistema de aprendizaje
 */

// ==================== LESSON TYPES ====================

/**
 * Tipos de problemas/lecciones disponibles
 */
export type LessonType = "INFO" | "MULTIPLE_CHOICE" | "FILL_IN_THE_BLANK" | "MATCH_PAIRS" | "CODE_EXERCISE" | "CODE_CHALLENGE";

/**
 * Tipo base para todos los problemas de lección
 */
interface BaseLessonProblem {
    type: LessonType;
}

/**
 * Lección de tipo información (introducción, objetivos)
 */
export interface LessonInfo extends BaseLessonProblem {
    type: "INFO";
    moduleTitle?: string;
    introduction?: string;
    objectives?: string[];
}

/**
 * Lección de opción múltiple
 */
export interface LessonMultipleChoice extends BaseLessonProblem {
    type: "MULTIPLE_CHOICE";
    question?: string;
    answers?: Array<{ name: string; icon?: React.ReactNode }>;
    correctAnswer?: number;
}

/**
 * Lección de llenar espacios en blanco
 */
export interface LessonFillInTheBlank extends BaseLessonProblem {
    type: "FILL_IN_THE_BLANK";
    question?: string;
    answerTiles?: string[];
    correctAnswerIndices?: number[];
    // Para ejercicios de código
    content?: string | {
        type: "FILL_IN_THE_BLANK";
        question?: string;
        codeTemplate?: string;
        expectedAnswer?: string;
        hint?: string;
        explanation?: string;
        testCases?: Array<{
            input: string;
            expectedOutput: string;
            description: string;
        }>;
    };
}

/**
 * Lección de emparejar pares
 */
export interface LessonMatchPairs extends BaseLessonProblem {
    type: "MATCH_PAIRS";
    question?: string;
    pairs?: Array<{ left: string; right: string }>;
}

/**
 * Lección de ejercicio de código (new type)
 */
export interface LessonCodeExercise extends BaseLessonProblem {
    type: "CODE_EXERCISE";
    content?: string | {
        type: "CODE_EXERCISE";
        question?: string;
        codeTemplate?: string;
        expectedAnswer?: string;
        hint?: string;
        explanation?: string;
        testCases?: Array<{
            input: string;
            expectedOutput: string;
            description: string;
        }>;
    };
}

/**
 * Lección de desafío de código (CODE_CHALLENGE) - Módulo C
 */
export interface LessonCodeChallenge extends BaseLessonProblem {
    type: "CODE_CHALLENGE";
    content?: string | {
        type: "CODE_CHALLENGE";
        question?: string;
        codeTemplate?: string;
        expectedAnswer?: string;
        hint?: string;
        explanation?: string;
        testCases?: Array<{
            input: string;
            expectedOutput: string;
            description: string;
        }>;
    };
}

/**
 * Unión de todos los tipos de lecciones
 */
export type ModuleLesson = LessonInfo | LessonMultipleChoice | LessonFillInTheBlank | LessonMatchPairs | LessonCodeExercise | LessonCodeChallenge;

// ==================== LESSON COMPLETION ====================

/**
 * Request para completar una lección (POST /api/progress/lesson)
 */
export interface LessonCompletionRequest {
    lessonId: number;
    correctAnswerCount: number;
    incorrectAnswerCount: number;
    score?: number; // Nota en porcentaje 0-100 (opcional)
    timeTakenMs: number;
    isPractice: boolean;
}

/**
 * Response de completar una lección
 */
export interface LessonCompletionResponse {
    xpEarned: number;
    lingotsEarned: number;
    newTotalLingots: number;
    newStreak: number;
}

// ==================== BACKEND PROBLEM MAPPING ====================

/**
 * Tipos de problemas como vienen del backend
 */
export type BackendProblemType = "INFO" | "SELECT_1_OF_3" | "MULTIPLE_CHOICE" | "FILL_IN_THE_BLANK" | "MATCH_PAIRS" | "CODE_CHALLENGE" | "CODE_EXERCISE";

/**
 * Estructura genérica de problema del backend
 */
export interface BackendProblem {
    type: BackendProblemType;
    moduleTitle?: string;
    introduction?: string;
    objectives?: string | string[];
    question?: string;
    answers?: Array<{ name: string; icon?: React.ReactNode }>;
    correctAnswer?: number;
    answerTiles?: string[];
    correctAnswerIndices?: number[];
    pairs?: Array<{ left: string; right: string }>;
    // Para CODE_CHALLENGE
    codeTemplate?: string;
    expectedAnswer?: string;
    hint?: string;
    explanation?: string;
    testCases?: Array<{
        input: string;
        expectedOutput: string;
        description: string;
    }>;
}
