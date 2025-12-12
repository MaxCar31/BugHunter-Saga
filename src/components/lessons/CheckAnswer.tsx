import React from "react";
import { BigCloseSvg, DoneSvg } from "~/components/icons/ui";

interface BranchCoverageData {
    covered: number;
    total: number;
    percentage: number;
}

export const CheckAnswer = ({
    isAnswerSelected,
    isAnswerCorrect,
    correctAnswerShown,
    correctAnswer,
    onCheckAnswer,
    onFinish,
    onSkip,
    branchCoverage,
}: {
    isAnswerSelected: boolean;
    isAnswerCorrect: boolean;
    correctAnswerShown: boolean;
    correctAnswer: string;
    onCheckAnswer: () => void;
    onFinish: () => void;
    onSkip: () => void;
    branchCoverage?: BranchCoverageData | null;
}) => {
    return (
        <>
            <section className="border-gray-200 sm:border-t-2 sm:p-10">
                <div className="mx-auto flex max-w-5xl sm:justify-between">
                    <button
                        className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
                        onClick={onSkip}
                    >
                        Omitir
                    </button>
                    {!isAnswerSelected ? (
                        <button
                            className="grow rounded-2xl bg-gray-200 p-3 font-bold uppercase text-gray-400 sm:min-w-[150px] sm:max-w-fit sm:grow-0"
                            disabled
                        >
                            Verificar
                        </button>
                    ) : (
                        <button
                            onClick={onCheckAnswer}
                            className="grow rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white sm:min-w-[150px] sm:max-w-fit sm:grow-0"
                        >
                            Verificar
                        </button>
                    )}
                </div>
            </section>

            <div
                className={`fixed ${correctAnswerShown ? (isAnswerCorrect ? "bottom-0 bg-lime-100 font-bold text-green-600" : "bottom-0 bg-red-100 font-bold text-red-500") : "-bottom-52"} left-0 right-0 transition-all z-50`}
            >
                <div className="flex max-w-5xl flex-col gap-4 p-5 sm:mx-auto sm:flex-row sm:items-center sm:justify-between sm:p-10 sm:py-8">
                    <>
                        {isAnswerCorrect ? (
                            <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="hidden rounded-full bg-white p-5 text-green-500 sm:block">
                                    <DoneSvg />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-2xl">¡Buen trabajo!</div>
                                    {/* Panel de Cobertura de Ramas */}
                                    {branchCoverage && (
                                        <div className="flex items-center gap-3 mt-2 rounded-lg bg-white/80 px-4 py-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-normal text-gray-600">Cobertura:</span>
                                                <span className={`text-xl font-bold ${branchCoverage.percentage >= 50 ? "text-green-600" : "text-red-600"}`}>
                                                    {branchCoverage.percentage}%
                                                </span>
                                            </div>
                                            <div className="h-6 w-px bg-gray-300"></div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-normal text-gray-600">Ramas:</span>
                                                <span className="text-sm font-bold text-blue-600">{branchCoverage.covered}/{branchCoverage.total}</span>
                                            </div>
                                            <div className="h-6 w-px bg-gray-300"></div>
                                            <div className="text-xs font-normal text-gray-500">
                                                S(G) = {branchCoverage.covered}/{branchCoverage.total}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="hidden rounded-full bg-white p-5 text-red-500 sm:block">
                                    <BigCloseSvg />
                                </div>
                                <div className="flex flex-col gap-2">
                                    {/* Panel de Cobertura de Ramas (respuesta incorrecta) */}
                                    {branchCoverage ? (
                                        <>
                                            <div className="text-2xl">Cobertura Insuficiente</div>
                                            <div className="flex items-center gap-3 rounded-lg bg-white/80 px-4 py-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-normal text-gray-600">Cobertura:</span>
                                                    <span className="text-xl font-bold text-red-600">
                                                        {branchCoverage.percentage}%
                                                    </span>
                                                </div>
                                                <div className="h-6 w-px bg-gray-300"></div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-normal text-gray-600">Ramas:</span>
                                                    <span className="text-sm font-bold text-blue-600">{branchCoverage.covered}/{branchCoverage.total}</span>
                                                </div>
                                                <div className="h-6 w-px bg-gray-300"></div>
                                                <div className="text-xs font-normal text-gray-500">
                                                    Mínimo requerido: 50%
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-2xl">Solución correcta:</div>
                                            <div className="text-sm font-normal">{correctAnswer}</div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                    <button
                        onClick={onFinish}
                        className={`w-full rounded-2xl border-b-4 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit ${isAnswerCorrect ? "border-green-600 bg-green-500" : "border-red-600 bg-red-500"}`}
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </>
    );
};