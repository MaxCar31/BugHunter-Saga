// Definición de tipos para las lecciones del Módulo B
export type LessonInfo = {
    type: "INFO";
    moduleTitle: string;
    introduction: string;
    objectives: string[];
};

export type LessonMultipleChoice = {
    type: "MULTIPLE_CHOICE";
    question: string;
    answers: Array<{ name: string }>;
    correctAnswer: number;
};

export type LessonFillInTheBlank = {
    type: "FILL_IN_THE_BLANK";
    question: string;
    answerTiles: string[];
    correctAnswerIndices: number[];
};

export type ModuleLesson = LessonInfo | LessonMultipleChoice | LessonFillInTheBlank;
