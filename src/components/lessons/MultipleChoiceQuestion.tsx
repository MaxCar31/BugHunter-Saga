import React from "react";
import { ProgressBar } from "./ProgressBar";
import { QuitMessage } from "./QuitMessage";
import { CheckAnswer } from "./CheckAnswer";
import type { ModuleLesson } from "~/types/lesson";

// Función para separar texto y código de una pregunta
const parseQuestionWithCode = (html: string): { text: string; code: string | null } => {
    // Buscar código entre <code>...</code>
    const codeMatch = html.match(/<code>([\s\S]*?)<\/code>/i);

    if (codeMatch && codeMatch[1]) {
        // Separar el texto de la pregunta del código
        const text = html.replace(/<code>[\s\S]*?<\/code>/gi, '').replace(/<br\s*\/?>/gi, ' ').trim();
        const code = codeMatch[1]
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"');
        return { text, code };
    }

    return { text: html, code: null };
};

// Función para formatear código Java/JavaScript con indentación correcta
const formatCode = (code: string): string => {
    // Limpiar espacios múltiples primero
    let formatted = code.replace(/\s+/g, ' ').trim();

    // Dividir por palabras clave para crear líneas separadas
    formatted = formatted
        // else if en nueva línea
        .replace(/\s*else\s+if\s*/g, '\nelse if ')
        // else solo en nueva línea  
        .replace(/\s*else\s+(?!if)/g, '\nelse ')
        // Después de ; agregar nueva línea (excepto si es el final)
        .replace(/;\s*(?=\S)/g, ';\n')
        // Después de { agregar nueva línea e indentación
        .replace(/\{\s*/g, ' {\n    ')
        // Antes de } quitar espacios y agregar nueva línea
        .replace(/\s*\}/g, '\n}');

    // Aplicar indentación correcta
    const lines = formatted.split('\n');
    let indentLevel = 0;
    const indentedLines = lines.map(line => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return '';

        // Reducir indent antes de }
        if (trimmedLine.startsWith('}')) {
            indentLevel = Math.max(0, indentLevel - 1);
        }

        const indentedLine = '    '.repeat(indentLevel) + trimmedLine;

        // Aumentar indent después de {
        if (trimmedLine.endsWith('{')) {
            indentLevel++;
        }

        return indentedLine;
    });

    return indentedLines.filter(line => line.trim()).join('\n');
};

export const MultipleChoiceQuestion = ({
    problem,
    answeredQuestionsCount,
    totalQuestionsCount,
    selectedAnswer,
    setSelectedAnswer,
    quitMessageShown,
    correctAnswerShown,
    setQuitMessageShown,
    isAnswerCorrect,
    onCheckAnswer,
    onFinish,
    onSkip,
    hearts,
}: {
    problem: ModuleLesson;
    answeredQuestionsCount: number;
    totalQuestionsCount: number;
    selectedAnswer: number | null;
    setSelectedAnswer: React.Dispatch<React.SetStateAction<number | null>>;
    correctAnswerShown: boolean;
    quitMessageShown: boolean;
    setQuitMessageShown: React.Dispatch<React.SetStateAction<boolean>>;
    isAnswerCorrect: boolean;
    onCheckAnswer: () => void;
    onFinish: () => void;
    onSkip: () => void;
    hearts: number | null;
}) => {
    // Type guard para asegurar que es una lección tipo MULTIPLE_CHOICE
    if (problem.type !== "MULTIPLE_CHOICE") {
        return null;
    }

    const { question, answers, correctAnswer } = problem;

    // Parsear la pregunta para separar texto y código
    const { text: questionText, code: questionCode } = parseQuestionWithCode(question || "Pregunta no disponible");

    return (
        <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
            <div className="flex grow flex-col items-center gap-5">
                <div className="w-full max-w-5xl sm:mt-8 sm:px-5">
                    <ProgressBar
                        answeredQuestionsCount={answeredQuestionsCount}
                        totalQuestionsCount={totalQuestionsCount}
                        setQuitMessageShown={setQuitMessageShown}
                        hearts={hearts}
                    />
                </div>
                <section className="flex max-w-5xl grow flex-col gap-6 self-center sm:items-start sm:justify-center sm:gap-10 sm:px-8 w-full">
                    {/* Pregunta (solo texto) */}
                    <h1
                        className="self-start text-xl font-semibold leading-relaxed sm:text-2xl text-gray-800 w-full"
                        dangerouslySetInnerHTML={{ __html: questionText }}
                    />

                    {/* Bloque de Código (si existe) */}
                    {questionCode && (
                        <div className="w-full rounded-xl border-2 border-gray-700 bg-gray-900 overflow-hidden shadow-lg">
                            {/* Barra de título */}
                            <div className="flex items-center gap-2 bg-gray-800 px-4 py-3 border-b border-gray-700">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <span className="text-gray-400 text-sm font-mono ml-2 font-medium">📄 Código</span>
                            </div>
                            {/* Código formateado */}
                            <div className="p-5 overflow-x-auto">
                                <pre className="text-base text-green-400 font-mono whitespace-pre-wrap leading-relaxed">
                                    <code>{formatCode(questionCode)}</code>
                                </pre>
                            </div>
                        </div>
                    )}

                    {/* Opciones de respuesta */}
                    <div
                        className="grid grid-cols-1 gap-3 sm:grid-cols-2 w-full sm:gap-4"
                        role="radiogroup"
                    >
                        {answers?.map((answer, i) => {
                            return (
                                <div
                                    key={i}
                                    className={`rounded-xl border-2 border-b-4 p-5 transition-all ${correctAnswerShown ? "cursor-not-allowed" : "cursor-pointer"} ${i === selectedAnswer ? "border-blue-400 bg-blue-100 text-blue-500" : "border-gray-300 bg-white"} ${!correctAnswerShown && "hover:bg-gray-50 hover:border-gray-400"}`}
                                    role="radio"
                                    aria-checked={i === selectedAnswer}
                                    tabIndex={0}
                                    onClick={() => !correctAnswerShown && setSelectedAnswer(i)}
                                >
                                    {answer.icon}
                                    <h2 className="text-center text-base font-medium leading-relaxed text-gray-800">{answer.name}</h2>
                                </div>
                            );
                        }) || (
                                <div className="col-span-full text-center text-base text-gray-500 font-normal">
                                    No hay opciones disponibles
                                </div>
                            )}
                    </div>
                </section>
            </div>

            <CheckAnswer
                correctAnswer={answers && correctAnswer !== undefined ? answers[correctAnswer]?.name ?? "" : ""}
                correctAnswerShown={correctAnswerShown}
                isAnswerCorrect={isAnswerCorrect}
                isAnswerSelected={selectedAnswer !== null}
                onCheckAnswer={onCheckAnswer}
                onFinish={onFinish}
                onSkip={onSkip}
            />

            <QuitMessage
                quitMessageShown={quitMessageShown}
                setQuitMessageShown={setQuitMessageShown}
            />
        </div>
    );
};