/**
 * 🔍 Explicación:
 * Componente que renderiza diferentes tipos de problemas
 * Soporta: INFO, MULTIPLE_CHOICE, FILL_IN_THE_BLANK (código)
 * Se integra en el flujo de lecciones del módulo
 */

import React, { useState } from "react";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { CodeEditorQuestion } from "./CodeEditorQuestion";
import Image from "next/image";

interface ProblemContent {
  type: "INFO" | "MULTIPLE_CHOICE" | "FILL_IN_THE_BLANK" | "CODE_CHALLENGE" | "CODE_EXERCISE";
  question?: string;
  moduleTitle?: string;
  introduction?: string;
  objectives?: string[];
  answers?: Array<{ name: string }>;
  correctAnswer?: number | string;
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

interface ProblemsRendererProps {
  problem: {
    type: string;
    content: string | ProblemContent;
  };
  problemNumber?: number;
  totalProblems?: number;
  onAnswer?: (answer: any, correct: boolean) => void;
}

export const ProblemsRenderer: React.FC<ProblemsRendererProps> = ({
  problem,
  problemNumber = 1,
  totalProblems = 1,
  onAnswer,
}) => {
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Parse del contenido si es string JSON
  let content: ProblemContent;
  try {
    content =
      typeof problem.content === "string"
        ? JSON.parse(problem.content)
        : problem.content;
  } catch {
    return (
      <div className="rounded-lg bg-red-50 p-4">
        <p className="text-red-700">Error al cargar el problema</p>
      </div>
    );
  }

  const handleAnswer = (answer: any, correct: boolean) => {
    setAnswered(true);
    setIsCorrect(correct);
    onAnswer?.(answer, correct);
  };

  // INFO - Bloque informativo
  if (content.type === "INFO") {
    return (
      <div className="mb-8 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-6">
        <div className="mb-4 flex items-center gap-3">
          <Image src="/logo.svg" alt="" width={40} height={40} />
          <div>
            <h2 className="text-2xl font-bold text-blue-900">
              {content.moduleTitle}
            </h2>
          </div>
        </div>

        <p className="mb-4 text-gray-700">{content.introduction}</p>

        {content.objectives && content.objectives.length > 0 && (
          <div className="rounded-lg bg-white p-4">
            <h3 className="mb-2 font-semibold text-blue-800">
              📚 Objetivos de aprendizaje:
            </h3>
            <ul className="space-y-1">
              {content.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-blue-600">✓</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // MULTIPLE_CHOICE - Pregunta de opción múltiple
  if (
    content.type === "MULTIPLE_CHOICE" &&
    content.question &&
    content.answers
  ) {
    return (
      <div className="mb-8 rounded-lg border-2 border-purple-500 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">
            Pregunta {problemNumber} de {totalProblems}
          </h3>
          <span className="text-sm text-gray-600">
            {answered && (isCorrect ? "✓ Correcto" : "✗ Incorrecto")}
          </span>
        </div>

        <div className="mb-6 rounded-lg bg-gray-50 p-4">
          <div
            className="mb-4 text-gray-800"
            dangerouslySetInnerHTML={{ __html: content.question }}
          />
        </div>

        <div className="space-y-3">
          {content.answers.map((answer, idx) => (
            <button
              key={idx}
              className={`w-full rounded-lg border-2 p-4 text-left transition ${
                answered
                  ? idx === content.correctAnswer
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 bg-gray-50"
                  : "border-gray-300 hover:border-purple-500"
              }`}
              onClick={() => {
                handleAnswer(idx, idx === content.correctAnswer);
              }}
              disabled={answered}
            >
              <span className="font-semibold text-gray-700">
                {answer.name}
              </span>
            </button>
          ))}
        </div>

        {answered && (
          <div className="mt-6 rounded-lg bg-yellow-50 p-4 text-sm text-gray-700">
            <strong>Explicación:</strong> (Ver en el siguiente problema)
          </div>
        )}
      </div>
    );
  }

  // FILL_IN_THE_BLANK o CODE_CHALLENGE/CODE_EXERCISE - Ejercicio de código
  if (
    (content.type === "FILL_IN_THE_BLANK" || content.type === "CODE_CHALLENGE" || content.type === "CODE_EXERCISE") &&
    content.question &&
    content.codeTemplate &&
    content.expectedAnswer
  ) {
    return (
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">
            Ejercicio {problemNumber} de {totalProblems}
          </h3>
        </div>
        <CodeEditorQuestion
          id={`problem-${problemNumber}`}
          question={content.question}
          codeTemplate={content.codeTemplate}
          expectedAnswer={content.expectedAnswer}
          hint={content.hint || "Revisa el código detenidamente"}
          explanation={
            content.explanation || "Analiza la lógica del problema"
          }
          testCases={content.testCases || []}
          onAnswer={handleAnswer}
        />
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-yellow-50 p-4">
      <p className="text-yellow-700">Tipo de problema no soportado</p>
    </div>
  );
};
