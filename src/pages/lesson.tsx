import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import {
  BigCloseSvg,
  CloseSvg,
  DoneSvg,
  LessonFastForwardEndFailSvg,
  LessonFastForwardEndPassSvg,
  LessonFastForwardStartSvg,
  LessonTopBarEmptyHeart,
  LessonTopBarHeart,
} from "~/components/Svgs";
import { useBoundStore } from "~/hooks/useBoundStore";
import { useRouter } from "next/router";
import { type ModuleLesson } from "~/utils/lessons";
import { completeLessonAPI, type LessonCompletionRequest } from "~/services/lessonService";

// Importar componentes refactorizados
import { ProgressBar } from "~/components/lessons/ProgressBar";
import { QuitMessage } from "~/components/lessons/QuitMessage";
import { CheckAnswer } from "~/components/lessons/CheckAnswer";
import { ReviewLesson } from "~/components/lessons/ReviewLesson";
import { ProblemInfo } from "~/components/lessons/ProblemInfo";
import { FillInTheBlankQuestion } from "~/components/lessons/FillInTheBlankQuestion";
import { MultipleChoiceQuestion } from "~/components/lessons/MultipleChoiceQuestion";

const numbersEqual = (a: readonly number[], b: readonly number[]): boolean => {
  return a.length === b.length && a.every((_, i) => a[i] === b[i]);
};

const formatTime = (timeMs: number): string => {
  const seconds = Math.floor(timeMs / 1000) % 60;
  const minutes = Math.floor(timeMs / 1000 / 60) % 60;
  const hours = Math.floor(timeMs / 1000 / 60 / 60);
  if (hours === 0)
    return [minutes, seconds]
      .map((x) => x.toString().padStart(2, "0"))
      .join(":");
  return [hours, minutes, seconds]
    .map((x) => x.toString().padStart(2, "0"))
    .join(":");
};

const Lesson: NextPage = () => {
  // --- TODOS LOS HOOKS AL PRINCIPIO ---
  const router = useRouter();
  const lessonId = parseInt(router.query.lessonId as string);
  const isPractice = "practice" in router.query;

  const currentModule = useBoundStore((x) => x.module);
  const loadLessonProblems = useBoundStore((x) => x.loadLessonProblems);
  const lessonProblems = useBoundStore((x) => x.problems);

  const [lessonProblem, setLessonProblem] = useState(0);
  const [lessonFinished, setLessonFinished] = useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [incorrectAnswerCount, setIncorrectAnswerCount] = useState(0);
  const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState(0); // Nueva variable para el progreso total
  const [selectedAnswer, setSelectedAnswer] = useState<null | number>(null);
  const [correctAnswerShown, setCorrectAnswerShown] = useState(false);
  const [quitMessageShown, setQuitMessageShown] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
  const [reviewLessonShown, setReviewLessonShown] = useState(false);
  const [isStartingLesson, setIsStartingLesson] = useState(true);
  const [isWaitingForModule, setIsWaitingForModule] = useState(false);

  const startTime = useRef(Date.now());
  const endTime = useRef(startTime.current + 1000 * 60 * 3 + 1000 * 33);

  // Cargar problemas de la lección cuando se obtiene el lessonId
  useEffect(() => {
    if (lessonId && !isNaN(lessonId)) {
      console.log("Loading problems for lesson:", lessonId);
      void loadLessonProblems(lessonId);
    }
  }, [lessonId, loadLessonProblems]);

  // Redirigir si no hay módulo después de un delay para permitir carga
  useEffect(() => {
    if (!currentModule && typeof window !== "undefined") {
      setIsWaitingForModule(true);
      
      // Dar tiempo para que el módulo se cargue antes de redirigir
      const timer = setTimeout(() => {
        if (!useBoundStore.getState().module) {
          // Redirigir a /learn en lugar de /register para mantener mejor UX
          void router.push('/learn');
        } else {
          setIsWaitingForModule(false);
        }
      }, 2000); // Esperar 2 segundos antes de redirigir

      return () => clearTimeout(timer);
    } else if (currentModule) {
      setIsWaitingForModule(false);
    }
  }, [currentModule, router]);

  // --- LÓGICA CONDICIONAL DESPUÉS DE TODOS LOS HOOKS ---

  // Si no hay lessonId válido, redirigir
  if (!lessonId || isNaN(lessonId)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Redireccionando...</p>
      </div>
    );
  }

  // Si no hay módulo, mostrar loading mientras se redirige
  if (!currentModule || isWaitingForModule) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Cargando módulo...</p>
          {isWaitingForModule && (
            <p className="text-sm text-gray-500 mt-2">
              Verificando configuración del módulo...
            </p>
          )}
        </div>
      </div>
    );
  }

  // Verificación: Si no hay preguntas, mostrar mensaje de carga
  if (lessonProblems.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Cargando preguntas...</h1>
          <p className="text-gray-600">Por favor, espera mientras se cargan las lecciones para el módulo {currentModule!.name}.</p>
        </div>
      </div>
    );
  }

  const problem = lessonProblems[lessonProblem] ?? lessonProblems[0]!;

  // Solo contar problemas que no sean INFO para el cálculo de XP
  const totalCorrectAnswersNeeded = lessonProblems.filter(p => p.type !== "INFO").length;
  // Para la barra de progreso, usar todos los problemas
  const totalQuestionsCount = lessonProblems.length;

  // 🎯 PROGRESO CONSISTENTE: Siempre basado en la posición actual + 1
  const currentProgressCount = lessonProblem + 1;

  // Si no hay preguntas en absoluto, mostrar mensaje de error
  if (lessonProblems.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No hay preguntas disponibles</h1>
          <p className="text-gray-600">El módulo {currentModule!.name} no tiene lecciones configuradas.</p>
          <Link
            href="/learn"
            className="mt-4 inline-block rounded-2xl border-b-4 border-blue-500 bg-blue-400 px-6 py-3 font-bold uppercase text-white transition hover:brightness-110"
          >
            Volver a Aprender
          </Link>
        </div>
      </div>
    );
  }

  const hearts =
    "fast-forward" in router.query &&
      !isNaN(Number(router.query["fast-forward"]))
      ? 3 - incorrectAnswerCount
      : null;



  const isAnswerCorrect = (() => {
    if (!problem || problem.type === "INFO") {
      return false;
    }
    if (problem.type === "MULTIPLE_CHOICE") {
      return selectedAnswer === problem.correctAnswer;
    }
    if (problem.type === "FILL_IN_THE_BLANK") {
      return numbersEqual(selectedAnswers, problem.correctAnswerIndices || []);
    }
    return false;
  })();

  const onCheckAnswer = () => {
    // No hay verificación de respuesta para pantallas INFO
    if (!problem || problem.type === "INFO") {
      return;
    }

    setCorrectAnswerShown(true);
    // Incrementar el contador de preguntas respondidas (correctas e incorrectas)
    setAnsweredQuestionsCount((x) => x + 1);

    if (isAnswerCorrect) {
      setCorrectAnswerCount((x) => x + 1);
    } else {
      setIncorrectAnswerCount((x) => x + 1);
    }

    // Solo agregar resultados para problemas con preguntas
    if (problem.type === "MULTIPLE_CHOICE") {
      setQuestionResults((questionResults) => [
        ...questionResults,
        {
          question: problem.question || "Pregunta no disponible",
          yourResponse: problem.answers?.[selectedAnswer ?? 0]?.name ?? "",
          correctResponse: problem.answers?.[problem.correctAnswer ?? 0]?.name ?? "",
        },
      ]);
    } else if (problem.type === "FILL_IN_THE_BLANK") {
      setQuestionResults((questionResults) => [
        ...questionResults,
        {
          question: problem.question || "Pregunta no disponible",
          yourResponse: selectedAnswers.map((i) => problem.answerTiles?.[i] || "").join(" "),
          correctResponse: (problem.correctAnswerIndices || []).map((i) => problem.answerTiles?.[i] || "").join(" "),
        },
      ]);
    }
  };

  const onFinish = () => {
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setCorrectAnswerShown(false);

    // Solo avanzar al siguiente problema, sin reiniciar con módulo
    const nextProblemIndex = lessonProblem + 1;
    if (nextProblemIndex < lessonProblems.length) {
      setLessonProblem(nextProblemIndex);
    } else {
      // Si no hay más problemas, marcar como terminada
      setLessonFinished(true);
    }

    endTime.current = Date.now();
  };

  // Función especial para preguntas INFO que no cuentan como preguntas respondidas
  const onFinishInfo = () => {
    console.log("onFinishInfo called - Current problem:", lessonProblem, "Total problems:", lessonProblems.length);
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setCorrectAnswerShown(false);

    // Solo avanzar al siguiente problema
    const nextProblemIndex = lessonProblem + 1;
    console.log("Next problem index:", nextProblemIndex);
    if (nextProblemIndex < lessonProblems.length) {
      setLessonProblem(nextProblemIndex);
      console.log("Advanced to problem:", nextProblemIndex);
    } else {
      console.log("Reached end of problems, marking lesson as finished");
      // Si no hay más problemas, marcar como terminada
      setLessonFinished(true);
    }

    endTime.current = Date.now();
  };

  const onSkip = () => {
    setSelectedAnswer(null);
    setCorrectAnswerShown(true);
  };

  const unitNumber = Number(router.query["fast-forward"]);

  if (hearts !== null && hearts < 0 && !correctAnswerShown) {
    return (
      <LessonFastForwardEndFail
        unitNumber={unitNumber}
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    );
  }

  if (
    hearts !== null &&
    hearts >= 0 &&
    !correctAnswerShown &&
    answeredQuestionsCount >= totalQuestionsCount
  ) {
    return (
      <LessonFastForwardEndPass
        unitNumber={unitNumber}
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    );
  }

  if (hearts !== null && isStartingLesson) {
    return (
      <LessonFastForwardStart
        unitNumber={unitNumber}
        setIsStartingLesson={setIsStartingLesson}
      />
    );
  }

  // Calcular porcentaje de respuestas correctas
  const totalAnswered = correctAnswerCount + incorrectAnswerCount;
  const correctPercentage = totalAnswered > 0 ? (correctAnswerCount / totalAnswered) * 100 : 0;
  
  // Mostrar LessonComplete cuando:
  // 1. Hemos respondido todas las preguntas no-INFO, O
  // 2. Se marcó explícitamente como terminada (para lecciones que terminan en INFO), O
  // 3. Hemos llegado al final de todos los problemas
  // 4. Y ADEMÁS: El porcentaje de respuestas correctas debe ser >= 50%
  const hasMinimumScore = correctPercentage >= 50;
  
  const shouldShowLessonComplete =
    (lessonFinished ||
    (totalCorrectAnswersNeeded > 0 && answeredQuestionsCount >= totalCorrectAnswersNeeded) ||
    (lessonProblem >= lessonProblems.length)) && hasMinimumScore;

  // Función para reiniciar el cuestionario
  const resetLesson = () => {
    setLessonProblem(0);
    setLessonFinished(false);
    setCorrectAnswerCount(0);
    setIncorrectAnswerCount(0);
    setAnsweredQuestionsCount(0);
    setSelectedAnswer(null);
    setCorrectAnswerShown(false);
    setQuitMessageShown(false);
    setSelectedAnswers([]);
    setQuestionResults([]);
    setReviewLessonShown(false);
    setIsStartingLesson(true);
    
    // Reiniciar tiempos
    startTime.current = Date.now();
    endTime.current = startTime.current + 1000 * 60 * 3 + 1000 * 33;
  };

  // Mostrar pantalla de fallo si completó todas las preguntas pero no alcanzó el 50%
  const shouldShowLessonFailed = 
    (lessonFinished ||
    (totalCorrectAnswersNeeded > 0 && answeredQuestionsCount >= totalCorrectAnswersNeeded) ||
    (lessonProblem >= lessonProblems.length)) && !hasMinimumScore && totalAnswered > 0;

  if (shouldShowLessonFailed && !correctAnswerShown) {
    return (
      <LessonFailed
        correctAnswerCount={correctAnswerCount}
        incorrectAnswerCount={incorrectAnswerCount}
        correctPercentage={correctPercentage}
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
        currentModule={currentModule}
        onTryAgain={resetLesson}
      />
    );
  }

  if (shouldShowLessonComplete && !correctAnswerShown) {
    return (
      <LessonComplete
        correctAnswerCount={correctAnswerCount}
        incorrectAnswerCount={incorrectAnswerCount}
        startTime={startTime}
        endTime={endTime}
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
        lessonId={lessonId}
        isPractice={isPractice}
      />
    );
  }

  switch (problem.type) {
    case "INFO": {
      return (
        <ProblemInfo
          problem={problem}
          answeredQuestionsCount={currentProgressCount}
          totalQuestionsCount={totalQuestionsCount}
          quitMessageShown={quitMessageShown}
          setQuitMessageShown={setQuitMessageShown}
          onFinish={onFinishInfo}
          hearts={hearts}
        />
      );
    }

    case "MULTIPLE_CHOICE": {
      return (
        <MultipleChoiceQuestion
          problem={problem}
          answeredQuestionsCount={currentProgressCount}
          totalQuestionsCount={totalQuestionsCount}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          quitMessageShown={quitMessageShown}
          correctAnswerShown={correctAnswerShown}
          setQuitMessageShown={setQuitMessageShown}
          isAnswerCorrect={isAnswerCorrect}
          onCheckAnswer={onCheckAnswer}
          onFinish={onFinish}
          onSkip={onSkip}
          hearts={hearts}
        />
      );
    }

    case "FILL_IN_THE_BLANK": {
      return (
        <FillInTheBlankQuestion
          problem={problem}
          answeredQuestionsCount={currentProgressCount}
          totalQuestionsCount={totalQuestionsCount}
          selectedAnswers={selectedAnswers}
          setSelectedAnswers={setSelectedAnswers}
          quitMessageShown={quitMessageShown}
          correctAnswerShown={correctAnswerShown}
          setQuitMessageShown={setQuitMessageShown}
          isAnswerCorrect={isAnswerCorrect}
          onCheckAnswer={onCheckAnswer}
          onFinish={onFinish}
          onSkip={onSkip}
          hearts={hearts}
        />
      );
    }

    case "MATCH_PAIRS": {
      // Por ahora, tratar MATCH_PAIRS como INFO hasta que se implemente
      return (
        <ProblemInfo
          problem={{
            type: "INFO",
            moduleTitle: "Ejercicio de Emparejamiento",
            introduction: "Este tipo de ejercicio aún está en desarrollo. Continuando..."
          }}
          answeredQuestionsCount={currentProgressCount}
          totalQuestionsCount={totalQuestionsCount}
          quitMessageShown={quitMessageShown}
          setQuitMessageShown={setQuitMessageShown}
          onFinish={onFinishInfo}
          hearts={hearts}
        />
      );
    }

    default: {
      console.error("Unknown problem type:", (problem as any).type, problem);
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Tipo de pregunta no reconocido</h1>
            <p className="text-gray-600">Tipo: {(problem as any).type}</p>
            <button
              onClick={onFinish}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Continuar
            </button>
          </div>
        </div>
      );
    }
  }
};

export default Lesson;

const LessonComplete = ({
  correctAnswerCount,
  incorrectAnswerCount,
  startTime,
  endTime,
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
  lessonId,
  isPractice,
}: {
  correctAnswerCount: number;
  incorrectAnswerCount: number;
  startTime: React.MutableRefObject<number>;
  endTime: React.MutableRefObject<number>;
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
  lessonId: number;
  isPractice: boolean;
}) => {
  const router = useRouter();

  // Estados para el API call
  const [isCompletingLesson, setIsCompletingLesson] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  // 🎯 NUEVO: Estado para almacenar la respuesta del backend
  const [backendResponse, setBackendResponse] = useState<{
    xpEarned: number;
    lingotsEarned: number;
    newTotalLingots: number;
    newStreak: number;
  } | null>(null);

  // Store methods
  const increaseXp = useBoundStore((x) => x.increaseXp);
  const addToday = useBoundStore((x) => x.addToday);
  const setLingots = useBoundStore((x) => x.setLingots);
  const setStreak = useBoundStore((x) => x.setStreak);
  const currentStreak = useBoundStore((x) => x.streak);
  const currentModule = useBoundStore((x) => x.module);

  const handleContinue = async () => {
    if (lessonCompleted || isCompletingLesson) {
      // Si ya se completó, solo navegar
      await router.push("/learn");
      return;
    }

    setIsCompletingLesson(true);

    try {
      // Calcular nota como porcentaje de aciertos redondeado a entero
      const totalAnswered = correctAnswerCount + incorrectAnswerCount;
      const score = totalAnswered > 0 ? Math.round((correctAnswerCount / totalAnswered) * 100) : 0;

      // Preparar la request usando el lessonId de los props (incluye score)
      const request: LessonCompletionRequest = {
        lessonId,
        correctAnswerCount,
        incorrectAnswerCount,
        score,
        timeTakenMs: endTime.current - startTime.current,
        isPractice,
      };

      // Llamar al backend
      const response = await completeLessonAPI(request);

      // 🎯 GUARDAR la respuesta para mostrarla en la UI
      setBackendResponse(response);

      // Actualizar el store con los datos del backend
      increaseXp(response.xpEarned);
      setLingots(response.newTotalLingots);
      setStreak(response.newStreak);
      addToday();

      // NO guardamos nada localmente - todo viene del backend
      // El progreso se sincronizará automáticamente cuando regresemos a /learn

      setLessonCompleted(true);

      // Navegar a /learn
      await router.push("/learn");

    } catch (error) {
      console.error("Error completing lesson:", error);
      
      // Verificar si el error es por score insuficiente
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      if (errorMessage.includes("50%")) {
        // Error de score insuficiente - no guardar nada localmente
        alert("No pudiste completar la lección. Necesitas al menos 50% de respuestas correctas.");
        // Recargar la página para intentar de nuevo
        window.location.reload();
        return;
      }
      
      // Para otros errores, mostrar mensaje y permitir reintentar
      alert(`Error al guardar progreso en el servidor: ${errorMessage}. Intenta nuevamente.`);
      
      // NO navegar, permitir que el usuario reintente
    } finally {
      setIsCompletingLesson(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
      <div className="flex grow flex-col items-center justify-center gap-8 font-bold">
        <h1 className="text-center text-3xl text-yellow-400">
          Lesson Complete!
        </h1>
        <div className="flex flex-wrap justify-center gap-5">
          <div className="min-w-[110px] rounded-xl border-2 border-yellow-400 bg-yellow-400">
            <h2 className="py-1 text-center text-white">Total XP</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-yellow-400">
              {backendResponse?.xpEarned || correctAnswerCount}
            </div>
          </div>
          <div className="min-w-[110px] rounded-xl border-2 border-blue-400 bg-blue-400">
            <h2 className="py-1 text-center text-white">Committed</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-blue-400">
              {formatTime(endTime.current - startTime.current)}
            </div>
          </div>
          <div className="min-w-[110px] rounded-xl border-2 border-green-400 bg-green-400">
            <h2 className="py-1 text-center text-white">Porcentaje</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-green-400">
              {Math.round(
                (correctAnswerCount /
                  (correctAnswerCount + incorrectAnswerCount)) *
                100,
              )}
              %
            </div>
          </div>
          <div className="min-w-[110px] rounded-xl border-2 border-emerald-400 bg-emerald-400">
            <h2 className="py-1 text-center text-white">Correctas</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-emerald-400">
              {correctAnswerCount}
            </div>
          </div>
          <div className="min-w-[110px] rounded-xl border-2 border-red-400 bg-red-400">
            <h2 className="py-1 text-center text-white">Incorrectas</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-red-400">
              {incorrectAnswerCount}
            </div>
          </div>
          {/* Mostrar lingots ganados solo si no es práctica */}
          {!isPractice && (
            <div className="min-w-[110px] rounded-xl border-2 border-purple-400 bg-purple-400">
              <h2 className="py-1 text-center text-white">Puntos QA</h2>
              <div className="flex justify-center rounded-xl bg-white py-4 text-purple-400">
                +{backendResponse?.lingotsEarned || 5}
              </div>
            </div>
          )}
          {/* Mostrar nueva racha */}
          <div className="min-w-[110px] rounded-xl border-2 border-orange-400 bg-orange-400">
            <h2 className="py-1 text-center text-white">Racha</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-orange-400">
              {backendResponse?.newStreak || (currentStreak + 1)}
            </div>
          </div>
        </div>
      </div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl sm:justify-between">
          <button
            className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setReviewLessonShown(true)}
          >
            Review lesson
          </button>
          <button
            className={`flex w-full items-center justify-center rounded-2xl border-b-4 p-3 font-bold uppercase text-white transition sm:min-w-[150px] sm:max-w-fit ${isCompletingLesson ? "border-gray-400 bg-gray-300 cursor-not-allowed" : "border-green-600 bg-green-500 hover:brightness-105"}`}
            onClick={handleContinue}
            disabled={isCompletingLesson}
          >
            {isCompletingLesson ? "Saving..." : "Continue"}
          </button>
        </div>
      </section>
      <ReviewLesson
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    </div>
  );
};

type QuestionResult = {
  question: string;
  yourResponse: string;
  correctResponse: string;
};

const LessonFastForwardStart = ({
  unitNumber,
  setIsStartingLesson,
}: {
  unitNumber: number;
  setIsStartingLesson: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex min-h-screen flex-col px-5 py-8 text-center">
      <div className="flex grow flex-col items-center justify-center gap-5">
        <LessonFastForwardStartSvg />
        <h1 className="text-lg font-bold">
          Want to jump to Unit {unitNumber}?
        </h1>
        <p className="text-sm text-gray-400">
          {`Pass the test to jump ahead. We won't make it easy for you though.`}
        </p>
      </div>
      <div className="flex flex-col gap-5"></div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-5 sm:flex-row sm:justify-between">
          <Link
            href="/learn"
            className="font-bold uppercase text-blue-400 transition hover:brightness-110"
          >
            Maybe later
          </Link>
          <button
            className="w-full rounded-2xl border-b-4 border-blue-500 bg-blue-400 p-3 font-bold uppercase text-white transition hover:brightness-110 sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setIsStartingLesson(false)}
          >
            {`Let's go`}
          </button>
        </div>
      </section>
    </div>
  );
};

const LessonFastForwardEndFail = ({
  unitNumber,
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
}: {
  unitNumber: number;
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
}) => {
  return (
    <div className="flex min-h-screen flex-col px-5 py-8 text-center">
      <div className="flex grow flex-col items-center justify-center gap-5">
        <LessonFastForwardEndFailSvg />
        <h1 className="text-2xl font-bold">
          {`You didn't unlock Unit ${unitNumber}`}
        </h1>
        <p className="text-lg text-gray-500">
          {`Don't worry! Practice makes perfect.`}
        </p>
      </div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl sm:justify-between">
          <button
            className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setReviewLessonShown(true)}
          >
            Review lesson
          </button>
          <Link
            className="flex w-full items-center justify-center rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
            href="/learn"
          >
            Continue
          </Link>
        </div>
      </section>
      <ReviewLesson
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    </div>
  );
};

const LessonFailed = ({
  correctAnswerCount,
  incorrectAnswerCount,
  correctPercentage,
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
  currentModule,
  onTryAgain,
}: {
  correctAnswerCount: number;
  incorrectAnswerCount: number;
  correctPercentage: number;
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
  currentModule: any; // Tipo del módulo actual
  onTryAgain: () => void;
}) => {
  const router = useRouter();

  const handleTryAgain = () => {
    // Llamar a la función de reinicio pasada como prop
    onTryAgain();
  };

  const handleGoBack = async () => {
    // Debug: verificar que el módulo actual esté disponible
    console.log("🔄 Volviendo a lecciones, módulo actual:", currentModule);
    
    // Redirigir a /learn que debería mostrar las lecciones del módulo actual
    await router.push("/learn");
  };

  return (
    <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
      <div className="flex grow flex-col items-center justify-center gap-8 font-bold">
        <h1 className="text-center text-3xl text-red-500">
          ¡Necesitas mejorar!
        </h1>
        <p className="text-center text-lg text-gray-600">
          Necesitas al menos 50% de respuestas correctas para pasar a la siguiente lección.
        </p>
        
        <div className="flex flex-wrap justify-center gap-5">
          <div className="min-w-[110px] rounded-xl border-2 border-red-400 bg-red-400">
            <h2 className="py-1 text-center text-white">Tu Puntuación</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-red-400">
              {Math.round(correctPercentage)}%
            </div>
          </div>
          <div className="min-w-[110px] rounded-xl border-2 border-emerald-400 bg-emerald-400">
            <h2 className="py-1 text-center text-white">Correctas</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-emerald-400">
              {correctAnswerCount}
            </div>
          </div>
          <div className="min-w-[110px] rounded-xl border-2 border-red-400 bg-red-400">
            <h2 className="py-1 text-center text-white">Incorrectas</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-red-400">
              {incorrectAnswerCount}
            </div>
          </div>
          <div className="min-w-[110px] rounded-xl border-2 border-gray-400 bg-gray-400">
            <h2 className="py-1 text-center text-white">Requerido</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-gray-600">
              50%
            </div>
          </div>
        </div>
      </div>

      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 sm:flex-row sm:justify-between">
          <button
            className="flex w-full items-center justify-center rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setReviewLessonShown(true)}
          >
            Revisar Errores
          </button>
          <button
            className="flex w-full items-center justify-center rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:min-w-[150px] sm:max-w-fit"
            onClick={handleGoBack}
          >
            Volver a Lecciones
          </button>
          <button
            className="flex w-full items-center justify-center rounded-2xl border-b-4 border-orange-600 bg-orange-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
            onClick={handleTryAgain}
          >
            Intentar de Nuevo
          </button>
        </div>
      </section>
      
      <ReviewLesson
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    </div>
  );
};

const LessonFastForwardEndPass = ({
  unitNumber,
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
}: {
  unitNumber: number;
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
}) => {
  return (
    <div className="flex min-h-screen flex-col px-5 py-8 text-center">
      <div className="flex grow flex-col items-center justify-center gap-5">
        <LessonFastForwardEndPassSvg />
        <h1 className="text-2xl font-bold">You unlocked Unit {unitNumber}!</h1>
        <p className="text-lg text-gray-500">
          Way to go! You’re making great strides!
        </p>
      </div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl sm:justify-between">
          <button
            className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setReviewLessonShown(true)}
          >
            Review lesson
          </button>
          <Link
            className="flex w-full items-center justify-center rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
            href="/learn"
          >
            Continue
          </Link>
        </div>
      </section>
      <ReviewLesson
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    </div>
  );
};