import React from "react";
import { ProgressBar } from "./ProgressBar";
import { QuitMessage } from "./QuitMessage";
import { CheckAnswer } from "./CheckAnswer";
import type { ModuleLesson } from "~/types/lesson";

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
                        {question || "Pregunta no disponible"}
                    </h1>
                    <div
                        className="grid grid-cols-2 gap-2 sm:grid-cols-3"
                        role="radiogroup"
                    >
                        {answers?.map((answer, i) => {
                            return (
                                <div
                                    key={i}
                                    className={`rounded-xl border-2 border-b-4 p-4 ${correctAnswerShown ? "cursor-not-allowed" : "cursor-pointer"} ${i === selectedAnswer ? "border-blue-300 bg-blue-100 text-blue-400" : "border-gray-200"} ${!correctAnswerShown && "hover:bg-gray-100"}`}
                                    role="radio"
                                    aria-checked={i === selectedAnswer}
                                    tabIndex={0}
                                    onClick={() => !correctAnswerShown && setSelectedAnswer(i)}
                                >
                                    {answer.icon}
                                    <h2 className="text-center">{answer.name}</h2>
                                </div>
                            );
                        }) || (
                                <div className="col-span-full text-center text-gray-500">
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