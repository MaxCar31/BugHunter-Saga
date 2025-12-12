import React, { useState, useCallback } from "react";
import { ProgressBar } from "./ProgressBar";
import { QuitMessage } from "./QuitMessage";
import { CheckAnswer } from "./CheckAnswer";
import type { LessonCodeExercise, LessonCodeChallenge } from "~/types/lesson";

interface CodeExerciseContent {
  type: string;
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
}

interface ConsoleOutput {
  input: string;
  output: string;
  isError: boolean;
  description?: string;
}

export const CodeExerciseQuestion = ({
    problem,
    answeredQuestionsCount,
    totalQuestionsCount,
    userCode,
    setUserCode,
    quitMessageShown,
    correctAnswerShown,
    setQuitMessageShown,
    isAnswerCorrect,
    branchCoverage,
    onCheckAnswer,
    onFinish,
    onSkip,
    hearts,
}: {
    problem: LessonCodeExercise | LessonCodeChallenge;
    answeredQuestionsCount: number;
    totalQuestionsCount: number;
    userCode: string;
    setUserCode: React.Dispatch<React.SetStateAction<string>>;
    correctAnswerShown: boolean;
    quitMessageShown: boolean;
    setQuitMessageShown: React.Dispatch<React.SetStateAction<boolean>>;
    isAnswerCorrect: boolean;
    branchCoverage: { covered: number; total: number; percentage: number } | null;
    onCheckAnswer: () => void;
    onFinish: () => void;
    onSkip: () => void;
    hearts: number | null;
}) => {
    const [showHint, setShowHint] = useState(false);
    const [consoleOutputs, setConsoleOutputs] = useState<ConsoleOutput[]>([]);
    const [isExecuting, setIsExecuting] = useState(false);
    
    // Parsear el contenido
    let contentData: CodeExerciseContent | null = null;
    
    try {
        if (typeof problem.content === "string") {
            contentData = JSON.parse(problem.content);
        } else if (problem.content && typeof problem.content === "object") {
            contentData = problem.content;
        }
    } catch (e) {
        console.error("Error al parsear contenido del ejercicio de código:", e);
    }

    if (!contentData) {
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
                    <section className="flex max-w-4xl grow flex-col gap-5 self-center sm:items-center sm:justify-center sm:gap-6 w-full px-4">
                        <div className="text-center text-red-600">
                            <p>Error al cargar el ejercicio de código</p>
                        </div>
                    </section>
                </div>
            </div>
        );
    }

    const blankPlaceholder = "___BLANK___";
    const displayTemplate = (contentData.codeTemplate || "").replace(
        blankPlaceholder,
        "/* TU CÓDIGO AQUÍ */"
    );

    // Función para simular la ejecución del código
    const executeCode = useCallback(() => {
        if (!contentData?.testCases || userCode.trim().length === 0) {
            setConsoleOutputs([{
                input: "Error",
                output: "No hay código para ejecutar",
                isError: true
            }]);
            return;
        }

        setIsExecuting(true);
        const outputs: ConsoleOutput[] = [];
        const normalizedUserCode = userCode.toLowerCase().replace(/\s+/g, "");
        
        // Buscar todas las llamadas a funciones en el código del usuario
        contentData.testCases.forEach((testCase) => {
            const normalizedInput = testCase.input.toLowerCase().replace(/\s+/g, "");
            
            // Verificar si el usuario incluyó esta llamada a función
            if (normalizedUserCode.includes(normalizedInput)) {
                outputs.push({
                    input: testCase.input,
                    output: testCase.expectedOutput,
                    isError: false,
                    description: testCase.description
                });
            }
        });

        // Si no se encontraron llamadas válidas
        if (outputs.length === 0) {
            // Intentar detectar cualquier llamada a función para dar feedback
            const functionCallRegex = /(\w+)\s*\(\s*([^)]*)\s*\)/g;
            const matches = userCode.matchAll(functionCallRegex);
            
            for (const match of matches) {
                const fullCall = match[0];
                outputs.push({
                    input: fullCall,
                    output: `No se encontró caso de prueba para: ${fullCall}`,
                    isError: true
                });
            }

            if (outputs.length === 0) {
                outputs.push({
                    input: "⚠️",
                    output: "No se detectaron llamadas a funciones válidas. Escribe llamadas como: obtenerTrimestre(3);",
                    isError: true
                });
            }
        }

        // Simular un pequeño delay para dar sensación de "ejecución"
        setTimeout(() => {
            setConsoleOutputs(outputs);
            setIsExecuting(false);
        }, 300);
    }, [userCode, contentData?.testCases]);

    // Limpiar consola
    const clearConsole = useCallback(() => {
        setConsoleOutputs([]);
    }, []);

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
                
                <section className="flex max-w-2xl grow flex-col gap-5 self-center sm:items-center sm:justify-center sm:gap-6 sm:px-5 w-full">
                    {/* Pregunta */}
                    <h1 
                        className="self-start text-2xl font-bold sm:text-3xl [&>code]:rounded [&>code]:bg-gray-800 [&>code]:px-2 [&>code]:py-1 [&>code]:font-mono [&>code]:text-sm [&>code]:text-green-400"
                        dangerouslySetInnerHTML={{ __html: contentData.question || "Ejercicio de Código" }}
                    />

                    {/* Template del Código */}
                    <div className="w-full rounded-xl border-2 border-gray-200 bg-gray-900 p-4">
                        <pre className="overflow-x-auto text-sm text-green-400">
                            <code>{displayTemplate}</code>
                        </pre>
                    </div>

                    {/* Área de Entrada de Código */}
                    <div className="w-full">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            ✍️ Tu Respuesta:
                        </label>
                        <textarea
                            value={userCode}
                            onChange={(e) => !correctAnswerShown && setUserCode(e.target.value)}
                            disabled={correctAnswerShown}
                            className={`h-32 w-full rounded-xl border-2 border-b-4 p-4 font-mono text-sm focus:outline-none
                                ${correctAnswerShown 
                                    ? isAnswerCorrect 
                                        ? "border-green-300 bg-green-50" 
                                        : "border-red-300 bg-red-50"
                                    : "border-gray-200 hover:bg-gray-100 focus:border-blue-300 focus:bg-blue-50"
                                }
                                disabled:cursor-not-allowed`}
                            placeholder="Escribe tu código aquí..."
                        />
                    </div>

                    {/* Consola Simulada */}
                    {contentData.testCases && contentData.testCases.length > 0 && (
                        <div className="w-full">
                            {/* Botones de Control */}
                            <div className="flex items-center gap-2 mb-2">
                                <button
                                    onClick={executeCode}
                                    disabled={isExecuting || correctAnswerShown || userCode.trim().length === 0}
                                    className={`flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white transition-all
                                        ${isExecuting || correctAnswerShown || userCode.trim().length === 0
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-green-600 hover:bg-green-700 active:scale-95"
                                        }`}
                                >
                                    {isExecuting ? (
                                        <>
                                            <span className="animate-spin">⚙️</span>
                                            <span>Ejecutando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>▶</span>
                                            <span>Ejecutar</span>
                                        </>
                                    )}
                                </button>
                                {consoleOutputs.length > 0 && !correctAnswerShown && (
                                    <button
                                        onClick={clearConsole}
                                        className="flex items-center gap-1 rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                                    >
                                        <span>🗑️</span>
                                        <span>Limpiar</span>
                                    </button>
                                )}
                            </div>

                            {/* Terminal de Consola */}
                            <div className="w-full rounded-xl border-2 border-gray-700 bg-gray-900 overflow-hidden">
                                {/* Barra de título de la terminal */}
                                <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 border-b border-gray-700">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <span className="text-gray-400 text-sm font-mono ml-2">🖥️ Consola de Pruebas</span>
                                </div>

                                {/* Área de salida */}
                                <div className="p-4 min-h-[120px] max-h-[200px] overflow-y-auto font-mono text-sm">
                                    {consoleOutputs.length === 0 ? (
                                        <div className="text-gray-500 italic">
                                            <p>// Escribe tu código y presiona "Ejecutar" para ver los resultados</p>
                                            <p className="mt-1 text-gray-600">// Ejemplo: {contentData.testCases[0]?.input || "funcion(valor)"}</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {consoleOutputs.map((output, idx) => (
                                                <div key={idx} className="border-b border-gray-800 pb-2 last:border-0">
                                                    {/* Input */}
                                                    <div className="flex items-start gap-2">
                                                        <span className="text-blue-400 select-none">&gt;</span>
                                                        <span className="text-white">{output.input}</span>
                                                    </div>
                                                    {/* Output */}
                                                    <div className="flex items-start gap-2 mt-1 pl-4">
                                                        <span className={`select-none ${output.isError ? "text-red-400" : "text-green-400"}`}>
                                                            {output.isError ? "✗" : "←"}
                                                        </span>
                                                        <span className={output.isError ? "text-red-400" : "text-yellow-300"}>
                                                            {output.output}
                                                        </span>
                                                    </div>
                                                    {/* Descripción (opcional) */}
                                                    {output.description && !output.isError && (
                                                        <div className="text-gray-500 text-xs mt-1 pl-6 italic">
                                                            // {output.description}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Estadísticas rápidas */}
                                {consoleOutputs.length > 0 && (
                                    <div className="bg-gray-800 px-4 py-2 border-t border-gray-700 flex items-center justify-between">
                                        <span className="text-xs text-gray-400">
                                            {consoleOutputs.filter(o => !o.isError).length} de {contentData.testCases.length} casos ejecutados
                                        </span>
                                        <span className={`text-xs font-semibold ${
                                            consoleOutputs.some(o => o.isError) ? "text-yellow-500" : "text-green-500"
                                        }`}>
                                            {consoleOutputs.some(o => o.isError) 
                                                ? "⚠️ Algunos casos no encontrados" 
                                                : "✓ Ejecución exitosa"
                                            }
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Botón de Pista (antes de verificar) */}
                    {!correctAnswerShown && contentData.hint && (
                        <div className="w-full">
                            <button
                                onClick={() => setShowHint(!showHint)}
                                className="flex items-center gap-2 rounded-xl border-2 border-yellow-400 bg-yellow-50 px-4 py-2 font-semibold text-yellow-700 transition hover:bg-yellow-100"
                            >
                                <span>💡</span>
                                <span>{showHint ? "Ocultar Pista" : "Ver Pista"}</span>
                            </button>
                            {showHint && (
                                <div className="mt-3 rounded-xl border-l-4 border-yellow-400 bg-yellow-50 p-4">
                                    <p className="text-sm text-yellow-700">{contentData.hint}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Pista (después de respuesta incorrecta) */}
                    {correctAnswerShown && !isAnswerCorrect && contentData.hint && (
                        <div className="w-full rounded-xl border-l-4 border-yellow-500 bg-yellow-50 p-4">
                            <h4 className="mb-1 font-semibold text-yellow-700">💡 Pista:</h4>
                            <p className="text-sm text-yellow-600">{contentData.hint}</p>
                        </div>
                    )}
                </section>
            </div>

            <CheckAnswer
                correctAnswer={contentData.expectedAnswer || ""}
                correctAnswerShown={correctAnswerShown}
                isAnswerCorrect={isAnswerCorrect}
                isAnswerSelected={userCode.trim().length > 0}
                onCheckAnswer={onCheckAnswer}
                onFinish={onFinish}
                onSkip={onSkip}
                branchCoverage={branchCoverage}
            />

            <QuitMessage
                quitMessageShown={quitMessageShown}
                setQuitMessageShown={setQuitMessageShown}
            />
        </div>
    );
};
