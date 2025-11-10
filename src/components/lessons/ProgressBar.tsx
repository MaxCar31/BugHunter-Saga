import React from "react";
import Link from "next/link";
import { CloseSvg, LessonTopBarEmptyHeart, LessonTopBarHeart } from "~/components/Svgs";

export const ProgressBar = ({
    answeredQuestionsCount,
    totalQuestionsCount,
    setQuitMessageShown,
    hearts,
}: {
    answeredQuestionsCount: number;
    totalQuestionsCount: number;
    setQuitMessageShown: (isShown: boolean) => void;
    hearts: null | number;
}) => {
    // Asegurar que el progreso nunca supere el 100%
    const progressPercentage = Math.min(100, (answeredQuestionsCount / Math.max(1, totalQuestionsCount)) * 100);

    return (
        <header className="flex items-center gap-4">
            {answeredQuestionsCount === 0 ? (
                <Link href="/learn" className="text-gray-400">
                    <CloseSvg />
                    <span className="sr-only">Exit lesson</span>
                </Link>
            ) : (
                <button
                    className="text-gray-400"
                    onClick={() => setQuitMessageShown(true)}
                >
                    <CloseSvg />
                    <span className="sr-only">Exit lesson</span>
                </button>
            )}
            <div
                className="h-4 grow rounded-full bg-gray-200"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={1}
                aria-valuenow={answeredQuestionsCount / Math.max(1, totalQuestionsCount)}
            >
                <div
                    className={`h-full rounded-full bg-green-500 transition-all duration-700 ${answeredQuestionsCount > 0 ? "px-2 pt-1" : ""}`}
                    style={{
                        width: `${progressPercentage}%`,
                    }}
                >
                    <div className="h-[5px] w-full rounded-full bg-green-400"></div>
                </div>
            </div>
            {hearts !== null &&
                [1, 2, 3].map((heart) => {
                    if (heart <= hearts) {
                        return <LessonTopBarHeart key={heart} />;
                    }
                    return <LessonTopBarEmptyHeart key={heart} />;
                })}
        </header>
    );
};