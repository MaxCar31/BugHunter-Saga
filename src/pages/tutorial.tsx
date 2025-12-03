/**
 * 🔍 Explicación:
 * Página de tutorial simple que explica las mecánicas de BugHunter Saga
 * antes de que el usuario seleccione su módulo.
 * 
 * Flujo: Login → Tutorial → Register (selecciona módulo) → Learn
 */

import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { LightningProgressSvg, GemSvg, FireSvg, LingotsTreasureChestSvg } from "~/components/icons/gamification";
import _bgSnow from "../../public/bg-snow.svg";
import type { StaticImageData } from "next/image";

const bgSnow = _bgSnow as StaticImageData;

export default function TutorialPage() {
    const router = useRouter();

    const handleStart = async () => {
        await router.push("/register");
    };

    return (
        <>
            <Head>
                <title>Cómo Funciona - BugHunter Saga</title>
                <meta name="description" content="Aprende técnicas de testing de software de forma divertida" />
            </Head>

            <main
                className="flex min-h-screen flex-col items-center justify-center bg-[#235390] text-white px-4"
                style={{ backgroundImage: `url(${bgSnow.src})` }}
            >
                <div className="w-full max-w-6xl">
                    {/* Header - Logo y Texto lado a lado */}
                    <div className="mb-8 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
                        <Image
                            src="/Logo.svg"
                            alt="BugHunter Saga"
                            width={250}
                            height={45}
                        />
                        <div className="text-center md:text-left">
                            <h2 className="mb-2 text-xl font-bold md:text-2xl">
                                ¿Qué es BugHunter Saga?
                            </h2>
                            <p className="max-w-xl text-sm md:text-base">
                                Plataforma gamificada para enseñar técnicas de pruebas de software.
                                Aprende testing mientras juegas y conviértete en un experto cazador de bugs.
                            </p>
                        </div>
                    </div>

                    {/* Grid de mecánicas - 4 tarjetas en 1 fila */}
                    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {/* XP */}
                        <div className="rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-4 text-gray-800">
                            <div className="mb-2 flex flex-col items-center gap-2 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-400">
                                    <LightningProgressSvg size={28} />
                                </div>
                                <h3 className="text-base font-bold">Gana XP</h3>
                            </div>
                            <p className="text-center text-xs text-gray-600">
                                <strong>10 XP base</strong> por lección + bonos por respuestas correctas
                            </p>
                        </div>

                        {/* Puntos QA */}
                        <div className="rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-4 text-gray-800">
                            <div className="mb-2 flex flex-col items-center gap-2 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-400">
                                    <GemSvg width={28} height={28} />
                                </div>
                                <h3 className="text-base font-bold">Puntos QA</h3>
                            </div>
                            <p className="text-center text-xs text-gray-600">
                                <strong>5 puntos</strong> por lección, <strong>20 en tesoros</strong>. Compra badges e items
                            </p>
                        </div>

                        {/* Rachas */}
                        <div className="rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-4 text-gray-800">
                            <div className="mb-2 flex flex-col items-center gap-2 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-400">
                                    <FireSvg />
                                </div>
                                <h3 className="text-base font-bold">Mantén tu Racha</h3>
                            </div>
                            <p className="text-center text-xs text-gray-600">
                                Practica cada día. <strong>+1 por día consecutivo</strong>
                            </p>
                        </div>

                        {/* Tienda */}
                        <div className="rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-4 text-gray-800">
                            <div className="mb-2 flex flex-col items-center gap-2 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-400">
                                    <LingotsTreasureChestSvg width={28} height={28} />
                                </div>
                                <h3 className="text-base font-bold">Tienda</h3>
                            </div>
                            <p className="text-center text-xs text-gray-600">
                                Usa Puntos QA para comprar badges e items especiales
                            </p>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center">
                        <button
                            onClick={handleStart}
                            className="rounded-2xl border-b-4 border-[#d68123] bg-[#f29e3b] px-10 py-3 font-bold uppercase transition hover:brightness-110"
                        >
                            ¡Comenzar a Aprender!
                        </button>
                        <p className="mt-2 text-sm opacity-90">
                            Selecciona tu módulo y empieza a cazar bugs
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
