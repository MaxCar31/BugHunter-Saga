/**
 * 🔍 Explicación:
 * Componente para preguntas tipo FILL_IN_THE_BLANK (escribir código)
 * Proporciona un editor de código con validación de respuestas
 * Muestra retroalimentación y casos de prueba
 */

import React, { useState } from "react";
import { CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";

interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

interface CodeEditorQuestionProps {
  id: string;
  question: string;
  codeTemplate: string;
  expectedAnswer: string;
  hint: string;
  explanation: string;
  testCases: TestCase[];
  onAnswer: (answer: string, correct: boolean) => void;
}

export const CodeEditorQuestion: React.FC<CodeEditorQuestionProps> = ({
  id,
  question,
  codeTemplate,
  expectedAnswer,
  hint,
  explanation,
  testCases,
  onAnswer,
}) => {
  const [userCode, setUserCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showTestCases, setShowTestCases] = useState(false);

  const blankPlaceholder = "___BLANK___";
  const displayTemplate = codeTemplate.replace(
    blankPlaceholder,
    "[[RESPUESTA AQUÍ]]"
  );

  const normalizeCode = (code: string) => {
    return code
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();
  };

  const validateAnswer = () => {
    const correct =
      normalizeCode(userCode) === normalizeCode(expectedAnswer);
    setIsCorrect(correct);
    setSubmitted(true);
    onAnswer(userCode, correct);
  };

  const copyTemplate = () => {
    navigator.clipboard.writeText(codeTemplate);
  };

  return (
    <div className="rounded-lg border-2 border-purple-500 bg-gradient-to-br from-purple-50 to-white p-6">
      {/* Encabezado */}
      <div className="mb-6">
        <h3 
          className="mb-2 text-xl font-bold text-gray-800 [&>code]:rounded [&>code]:bg-gray-800 [&>code]:px-2 [&>code]:py-1 [&>code]:font-mono [&>code]:text-sm [&>code]:text-green-400"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>

      {/* Template del Código */}
      <div className="mb-6 rounded-lg bg-gray-900 p-4">
        <div className="mb-3 flex items-center justify-between">
          <label className="block text-sm font-semibold text-gray-300">
            📄 Template de Código
          </label>
          <button
            onClick={copyTemplate}
            className="rounded bg-gray-700 px-3 py-1 text-xs font-medium text-white hover:bg-gray-600"
          >
            Copiar
          </button>
        </div>
        <pre className="overflow-x-auto rounded bg-gray-800 p-4 text-sm text-green-400">
          <code>{displayTemplate}</code>
        </pre>
      </div>

      {/* Área de Entrada de Código */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          ✍️ Tu Respuesta (Completa los ___BLANK___)
        </label>
        <textarea
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          disabled={submitted && isCorrect}
          className="h-32 w-full rounded-lg border-2 border-purple-300 bg-gray-50 p-4 font-mono text-sm focus:border-purple-500 focus:outline-none disabled:bg-gray-200"
          placeholder={`// Escribe aquí qué debería reemplazar a ${blankPlaceholder}\nif (condicion) { ... }`}
        />
      </div>

      {/* Botones */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={validateAnswer}
          disabled={!userCode.trim() || (submitted && isCorrect)}
          className="flex items-center gap-2 rounded-lg bg-green-500 px-6 py-2 font-semibold text-white hover:bg-green-600 disabled:bg-gray-400"
        >
          <CheckCircle size={18} />
          {submitted && isCorrect ? "✓ Correcto" : "Verificar Respuesta"}
        </button>

        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-2 rounded-lg border-2 border-blue-500 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50"
        >
          💡 Pista
          {showHint ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center gap-2 rounded-lg border-2 border-orange-500 px-4 py-2 font-semibold text-orange-600 hover:bg-orange-50"
        >
          📚 Explicación
          {showExplanation ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Feedback Inmediato */}
      {submitted && (
        <div
          className={`mb-6 rounded-lg p-4 ${
            isCorrect
              ? "border-2 border-green-500 bg-green-50"
              : "border-2 border-red-500 bg-red-50"
          }`}
        >
          <div className="flex items-center gap-3">
            {isCorrect ? (
              <>
                <CheckCircle className="text-green-600" size={24} />
                <div>
                  <h4 className="font-bold text-green-700">¡Correcto! 🎉</h4>
                  <p className="text-sm text-green-600">
                    Excelente trabajo. Has completado el ejercicio correctamente.
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="text-red-600" size={24} />
                <div>
                  <h4 className="font-bold text-red-700">No es correcto</h4>
                  <p className="text-sm text-red-600">
                    Intenta de nuevo. Usa la pista si lo necesitas.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Pista */}
      {showHint && (
        <div className="mb-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
          <h4 className="mb-2 font-semibold text-blue-700">💡 Pista:</h4>
          <p className="text-sm text-blue-600">{hint}</p>
        </div>
      )}

      {/* Explicación */}
      {showExplanation && (
        <div className="mb-4 rounded-lg border-l-4 border-orange-500 bg-orange-50 p-4">
          <h4 className="mb-2 font-semibold text-orange-700">📚 Explicación:</h4>
          <p className="text-sm text-orange-600">{explanation}</p>
          <div className="mt-3 rounded bg-white p-3">
            <p className="text-xs font-mono text-gray-700">
              <strong>Respuesta esperada:</strong>
            </p>
            <pre className="mt-1 overflow-x-auto rounded bg-gray-100 p-2 text-xs text-gray-800">
              {expectedAnswer}
            </pre>
          </div>
        </div>
      )}

      {/* Casos de Prueba */}
      <div className="rounded-lg bg-gray-100 p-4">
        <button
          onClick={() => setShowTestCases(!showTestCases)}
          className="flex w-full items-center justify-between font-semibold text-gray-700"
        >
          <span>🧪 Casos de Prueba ({testCases.length})</span>
          {showTestCases ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {showTestCases && (
          <div className="mt-4 space-y-3">
            {testCases.map((testCase, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-gray-300 bg-white p-3"
              >
                <p className="mb-2 text-sm font-semibold text-gray-700">
                  {testCase.description}
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded bg-blue-50 p-2">
                    <p className="font-mono font-semibold text-blue-600">
                      Input:
                    </p>
                    <p className="mt-1 font-mono text-gray-700">
                      {testCase.input}
                    </p>
                  </div>
                  <div className="rounded bg-green-50 p-2">
                    <p className="font-mono font-semibold text-green-600">
                      Output Esperado:
                    </p>
                    <p className="mt-1 font-mono text-gray-700">
                      {testCase.expectedOutput}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
