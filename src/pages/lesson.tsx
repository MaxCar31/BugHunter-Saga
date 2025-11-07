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
// Elimina import de getModuleBLessons (ya no se usa)

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
  const currentModule = useBoundStore((x) => x.module);
  const getQuestionsForModule = useBoundStore((x) => x.getQuestionsForModule);
  const loadQuestions = useBoundStore((x) => x.loadQuestions);

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

  const startTime = useRef(Date.now());
  const endTime = useRef(startTime.current + 1000 * 60 * 3 + 1000 * 33);

  // Cargar preguntas cuando el componente se monta
  useEffect(() => {
    if (currentModule?.code) {
      console.log("Loading questions for module:", currentModule?.code);
      void loadQuestions(currentModule.code);
    }
  }, [currentModule?.code]); // Removido loadQuestions de las dependencias

  // Redirigir si no hay módulo
  useEffect(() => {
    if (!currentModule && typeof window !== "undefined") {
      void router.push('/register');
    }
  }, [currentModule, router]);

  // --- LÓGICA CONDICIONAL DESPUÉS DE TODOS LOS HOOKS ---

  // Si no hay módulo, mostrar loading mientras se redirige
  if (!currentModule) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Cargando módulo...</p>
      </div>
    );
  }

  // Obtiene preguntas del módulo actual desde el store
  const lessonProblems = getQuestionsForModule(currentModule!.code);
  // console.log("Lesson problems for", currentModule!.code, ":", lessonProblems);
  // console.log("Current problem type:", lessonProblems[lessonProblem]?.type);

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

  // Mostrar LessonComplete cuando:
  // 1. Hemos respondido todas las preguntas no-INFO, O
  // 2. Se marcó explícitamente como terminada (para lecciones que terminan en INFO), O
  // 3. Hemos llegado al final de todos los problemas
  const shouldShowLessonComplete = 
    lessonFinished ||
    (totalCorrectAnswersNeeded > 0 && answeredQuestionsCount >= totalCorrectAnswersNeeded) ||
    (lessonProblem >= lessonProblems.length);

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

// Función helper para obtener el lessonId actual basado en el módulo
// Mapeo temporal basado en unit.json - cada módulo tiene sus propios lessonIds
const getCurrentLessonId = (moduleCode: string): number => {
  const moduleToLessonId: Record<string, number> = {
    "moduleA": 1, // Equivale al primer lessonId del moduleA
    "moduleB": 2, // Equivale al primer lessonId del moduleB  
    "moduleC": 3, // Equivale al primer lessonId del moduleC
    "moduleD": 4, // etc...
    "moduleE": 5,
  };
  
  return moduleToLessonId[moduleCode] || 1;
};

export default Lesson;const MultipleChoiceQuestion = ({
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

  const { question, answers = [], correctAnswer } = problem;

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
        <section className="flex max-w-2xl grow flex-col gap-5 self-center sm:items-center sm:justify-center sm:gap-24 sm:px-5">
          <h1 className="self-start text-2xl font-bold sm:text-3xl">
            {question}
          </h1>
          <div
            className="grid grid-cols-2 gap-2 sm:grid-cols-3"
            role="radiogroup"
          >
            {answers.map((answer, i) => {
              return (
                <div
                  key={i}
                  className={
                    i === selectedAnswer
                      ? "cursor-pointer rounded-xl border-2 border-b-4 border-blue-300 bg-blue-100 p-4 text-blue-400"
                      : "cursor-pointer rounded-xl border-2 border-b-4 border-gray-200 p-4 hover:bg-gray-100"
                  }
                  role="radio"
                  aria-checked={i === selectedAnswer}
                  tabIndex={0}
                  onClick={() => setSelectedAnswer(i)}
                >

                  <h2 className="text-center">{answer.name}</h2>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <CheckAnswer
        correctAnswer={correctAnswer !== undefined ? answers[correctAnswer]?.name ?? "" : ""}
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

const LessonComplete = ({
  correctAnswerCount,
  incorrectAnswerCount,
  startTime,
  endTime,
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
}: {
  correctAnswerCount: number;
  incorrectAnswerCount: number;
  startTime: React.MutableRefObject<number>;
  endTime: React.MutableRefObject<number>;
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
}) => {
  const router = useRouter();
  const isPractice = "practice" in router.query;

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
  const increaseLessonsCompleted = useBoundStore(
    (x) => x.increaseLessonsCompleted,
  );
  const currentModule = useBoundStore((x) => x.module);

  const handleContinue = async () => {
    if (lessonCompleted || isCompletingLesson) {
      // Si ya se completó, solo navegar
      await router.push("/learn");
      return;
    }

    setIsCompletingLesson(true);

    try {
      // Obtener lessonId basado en el módulo actual
      // Por ahora uso un mapeo simple - esto se puede mejorar más tarde
      const lessonId = getCurrentLessonId(currentModule?.code || '');
      
      // Preparar la request
      const request: LessonCompletionRequest = {
        lessonId,
        correctAnswerCount,
        incorrectAnswerCount,
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

      if (!isPractice) {
        increaseLessonsCompleted(currentModule?.code || '', 1);
      }

      setLessonCompleted(true);
      
      // Navegar a /learn
      await router.push("/learn");

    } catch (error) {
      console.error("Error completing lesson:", error);
      
      // En caso de error, usar fallback con datos locales
      setBackendResponse({
        xpEarned: correctAnswerCount,
        lingotsEarned: isPractice ? 0 : 5,
        newTotalLingots: useBoundStore.getState().lingots + (isPractice ? 0 : 5),
        newStreak: currentStreak + 1,
      });
      
      // Actualizar store con fallback local
      increaseXp(correctAnswerCount);
      addToday();
      const currentLingots = useBoundStore.getState().lingots;
      setLingots(currentLingots + (isPractice ? 0 : 5));
      if (!isPractice) {
        increaseLessonsCompleted(currentModule?.code || '', 1);
      }
      
      // Mostrar mensaje de error pero permitir continuar
      alert("Error guardando progreso en el servidor, pero se guardó localmente.");
      await router.push("/learn");
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
            <h2 className="py-1 text-center text-white">Amazing</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-green-400">
              {Math.round(
                (correctAnswerCount /
                  (correctAnswerCount + incorrectAnswerCount)) *
                100,
              )}
              %
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
            className={[
              "flex w-full items-center justify-center rounded-2xl border-b-4 p-3 font-bold uppercase text-white transition sm:min-w-[150px] sm:max-w-fit",
              isCompletingLesson 
                ? "border-gray-400 bg-gray-300 cursor-not-allowed" 
                : "border-green-600 bg-green-500 hover:brightness-105"
            ].join(" ")}
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