import React from "react";
import { ProgressBar } from "./ProgressBar";
import { QuitMessage } from "./QuitMessage";
import type { ModuleLesson } from "~/types/lesson";

export const ProblemInfo = ({
    problem,
    answeredQuestionsCount,
    totalQuestionsCount,
    quitMessageShown,
    setQuitMessageShown,
    onFinish,
    hearts,
}: {
    problem: ModuleLesson;
    answeredQuestionsCount: number;
    totalQuestionsCount: number;
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
                        answeredQuestionsCount={answeredQuestionsCount}
                        totalQuestionsCount={totalQuestionsCount}
                        setQuitMessageShown={setQuitMessageShown}
                        hearts={hearts}
                    />
                </div>
                <section className="flex max-w-5xl grow flex-col gap-10 self-center sm:items-center sm:justify-center sm:px-8">
                    <div className="text-center w-full">
                        <h1 className="mb-6 text-3xl font-bold text-[#f2a445] sm:text-4xl">
                            {moduleTitle || "Información del Módulo"}
                        </h1>
                        <div className="mb-6 text-left text-base leading-relaxed text-gray-700 font-normal sm:text-lg max-w-4xl mx-auto">
                            {introduction?.split('\n').map((line, i) => (
                                <p key={i} className="mb-3">{line}</p>
                            )) || (
                                    <p className="mb-3 text-gray-500">No hay introducción disponible.</p>
                                )}
                        </div>
                    </div>

                    <div className="w-full max-w-4xl">
                        <h2 className="mb-5 text-2xl font-bold text-gray-800">Objetivos del Nivel:</h2>
                        <ul className="space-y-4">
                            {objectives?.map((objective, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#f2a445]"></div>
                                    <span className="text-base font-normal text-gray-700 leading-relaxed">{objective}</span>
                                </li>
                            )) || (
                                    // Objetivos por defecto si no vienen del backend
                                    [
                                        "Comprender los conceptos fundamentales del tema",
                                        "Aplicar las técnicas aprendidas en ejercicios prácticos",
                                        "Desarrollar habilidades de análisis y resolución de problemas"
                                    ].map((objective, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#f2a445]"></div>
                                            <span className="text-gray-700">{objective}</span>
                                        </li>
                                    ))
                                )}
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