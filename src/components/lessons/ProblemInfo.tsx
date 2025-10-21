import React from "react";
import { ProgressBar } from "./ProgressBar";
import { QuitMessage } from "./QuitMessage";
import type { ModuleLesson } from "~/utils/lessons";

export const ProblemInfo = ({
    problem,
    correctAnswerCount,
    totalCorrectAnswersNeeded,
    quitMessageShown,
    setQuitMessageShown,
    onFinish,
    hearts,
}: {
    problem: ModuleLesson;
    correctAnswerCount: number;
    totalCorrectAnswersNeeded: number;
    quitMessageShown: boolean;
    setQuitMessageShown: React.Dispatch<React.SetStateAction<boolean>>;
    onFinish: () => void;
    hearts: number | null;
}) => {
    // Type guard para asegurar que es una lección tipo INFO
    if (problem.type !== "INFO") {
        return null;
    }

    const { moduleTitle, introduction, objectives } = problem;

    return (
        <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
            <div className="flex grow flex-col items-center gap-5">
                <div className="w-full max-w-5xl sm:mt-8 sm:px-5">
                    <ProgressBar
                        correctAnswerCount={correctAnswerCount}
                        totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
                        setQuitMessageShown={setQuitMessageShown}
                        hearts={hearts}
                    />
                </div>
                <section className="flex max-w-4xl grow flex-col gap-8 self-center sm:items-center sm:justify-center sm:px-5">
                    <div className="text-center">
                        <h1 className="mb-4 text-3xl font-bold text-[#f2a445] sm:text-4xl">
                            {moduleTitle}
                        </h1>
                        <div className="mb-6 text-left text-lg leading-relaxed text-gray-700 sm:text-center">
                            {introduction.split('\n').map((line, i) => (
                                <p key={i} className="mb-3">{line}</p>
                            ))}
                        </div>
                    </div>

                    <div className="w-full max-w-2xl">
                        <h2 className="mb-4 text-xl font-bold text-gray-800">Objetivos del Nivel:</h2>
                        <ul className="space-y-3">
                            {objectives.map((objective, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#f2a445]"></div>
                                    <span className="text-gray-700">{objective}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>

            <section className="border-gray-200 sm:border-t-2 sm:p-10">
                <div className="mx-auto flex max-w-5xl justify-center">
                    <button
                        onClick={onFinish}
                        className="w-full rounded-2xl border-b-4 border-[#d18a2a] bg-[#f2a445] p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
                    >
                        Comenzar
                    </button>
                </div>
            </section>

            <QuitMessage
                quitMessageShown={quitMessageShown}
                setQuitMessageShown={setQuitMessageShown}
            />
        </div>
    );
};