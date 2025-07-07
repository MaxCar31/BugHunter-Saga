import Link from "next/link";
import type { ComponentProps } from "react";
import React, { useState } from "react";
import dayjs from "dayjs";
import {
  BronzeLeagueSvg,
  EmptyFireSvg,
  EmptyGemSvg,
  FireSvg,
  GemSvg,
  LightningProgressSvg,
  LingotsTreasureChestSvg,
  TreasureProgressSvg,
} from "./Svgs";
import { Calendar } from "./Calendar";
import { useBoundStore } from "~/hooks/useBoundStore";
import { ModuleIcon } from "./ModuleIcon";
import type { LoginScreenState } from "./LoginScreen";
import { LoginScreen } from "./LoginScreen";
import { useLeaderboardRank } from "~/hooks/useLeaderboard";

export const RightBar = () => {
  const loggedIn = useBoundStore((x) => x.loggedIn);
  const lingots = useBoundStore((x) => x.lingots);
  const streak = useBoundStore((x) => x.streak);
  const module = useBoundStore((x) => x.module);
  const lessonsCompleted = useBoundStore((x) => x.lessonsCompleted);

  const [modulesShown, setModulesShown] = useState(false);
  const [streakShown, setStreakShown] = useState(false);
  const [now, setNow] = useState(dayjs());
  const [gemsShown, setGemsShown] = useState(false);
  const [loginScreenState, setLoginScreenState] = useState<LoginScreenState>("HIDDEN");

  return (
    <>
      <aside className="sticky top-0 hidden w-96 flex-col gap-6 self-start sm:flex">
        <article className="my-6 flex justify-between gap-4">
          <div
            className="relative flex cursor-default items-center gap-2 rounded-xl p-3 font-bold uppercase text-gray-500 hover:bg-gray-100"
            onMouseEnter={() => setModulesShown(true)}
            onMouseLeave={() => setModulesShown(false)}
            onClick={() => setModulesShown((x) => !x)}
            role="button"
            tabIndex={0}
          >
            <ModuleIcon module={module} width={45} />
            <div>{module.name}</div>
            <div
              className="absolute top-full z-10 rounded-2xl border-2 border-gray-300 bg-white"
              style={{
                left: "calc(50% - 150px)",
                width: 300,
                display: modulesShown ? "block" : "none",
              }}
            >
              <h2 className="px-5 py-3 font-bold uppercase text-gray-400">
                Mis Módulos
              </h2>
              <button className="flex w-full items-center gap-3 border-t-2 border-gray-300 bg-blue-100 px-5 py-3 text-left font-bold">
                <ModuleIcon module={module} width={45} />
                <span className="text-blue-500">{module.name}</span>
              </button>
              <Link
                className="flex w-full items-center gap-3 rounded-b-2xl border-t-2 border-gray-300 px-5 py-3 text-left font-bold hover:bg-gray-100"
                href="/register"
              >
                <span className="flex items-center justify-center rounded-lg border-2 border-gray-400 px-2 text-lg font-bold text-gray-400">
                  +
                </span>
                <span className="text-gray-600">Agregar nuevo módulo</span>
              </Link>
            </div>
          </div>
          <span
            className="relative flex items-center gap-2 rounded-xl p-3 font-bold text-orange-500 hover:bg-gray-100"
            onMouseEnter={() => setStreakShown(true)}
            onMouseLeave={() => {
              setStreakShown(false);
              setNow(dayjs());
            }}
            onClick={(event) => {
              if (event.target !== event.currentTarget) return;
              setStreakShown((x) => !x);
              setNow(dayjs());
            }}
            role="button"
            tabIndex={0}
          >
            <div className="pointer-events-none">
              {streak > 0 ? <FireSvg /> : <EmptyFireSvg />}
            </div>
            <span className={streak > 0 ? "text-orange-500" : "text-gray-300"}>
              {streak}
            </span>
            <div
              className="absolute top-full z-10 flex flex-col gap-5 rounded-2xl border-2 border-gray-300 bg-white p-5 text-black"
              style={{
                left: "calc(50% - 200px)",
                width: 400,
                display: streakShown ? "flex" : "none",
              }}
            >
              <h2 className="text-center text-lg font-bold">Racha</h2>
              <p className="text-center text-sm font-normal text-gray-400">
                Pero tu racha se reiniciará mañana si no practicas mañana. ¡Ten cuidado!
              </p>
              <Calendar now={now} setNow={setNow} />
            </div>
          </span>
          <span
            className="relative flex items-center gap-2 rounded-xl p-3 font-bold text-red-500 hover:bg-gray-100"
            onMouseEnter={() => setGemsShown(true)}
            onMouseLeave={() => setGemsShown(false)}
            onClick={() => setGemsShown((x) => !x)}
            role="button"
            tabIndex={0}
          >
            {lingots > 0 ? <GemSvg /> : <EmptyGemSvg />}
            <span className={lingots > 0 ? "text-red-500" : "text-gray-300"}>
              {lingots}
            </span>
            <div
              className="absolute top-full z-10 flex w-72 items-center gap-3 rounded-2xl border-2 border-gray-300 bg-white p-5"
              style={{
                left: "calc(50% - 150px)",
                display: gemsShown ? "flex" : "none",
              }}
            >
              <LingotsTreasureChestSvg className="w-24" />
              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-bold text-black">Puntos QA</h2>
                <p className="text-sm font-normal text-gray-400">
                  Tienes {lingots} {lingots === 1 ? "punto" : "puntos"} QA.
                </p>
                <Link
                  className="uppercase text-blue-400 transition hover:brightness-110"
                  href="/shop"
                >
                  Ir a la tienda
                </Link>
              </div>
            </div>
          </span>
        </article>
        {loggedIn && lessonsCompleted < 10 ? (
          <UnlockLeaderboardsSection />
        ) : loggedIn && lessonsCompleted >= 10 ? (
          <LeaderboardRankSection />
        ) : null}
        <DailyQuestsSection />
        <XpProgressSection />
        {!loggedIn && (
          <CreateAProfileSection setLoginScreenState={setLoginScreenState} />
        )}
      </aside>
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </>
  );
};

const UnlockLeaderboardsSection = () => {
  const lessonsCompleted = useBoundStore((x) => x.lessonsCompleted);

  if (lessonsCompleted >= 10) {
    return null;
  }

  const lessonsNeededToUnlockLeaderboards = 10 - lessonsCompleted;

  return (
    <article className="flex flex-col gap-5 rounded-2xl border-2 border-gray-200 p-6 text-gray-700">
      <h2 className="text-xl font-bold">¡Desbloquear Clasificación!</h2>
      <div className="flex items-center gap-6">
        <LockedLeaderboardsSvg />
        <p className="text-sm leading-6 text-gray-500">
          Completa {lessonsNeededToUnlockLeaderboards} lección{lessonsNeededToUnlockLeaderboards === 1 ? "" : "es"} más para comenzar a competir
        </p>
      </div>
    </article>
  );
};

const LeaderboardRankSection = () => {
  const xpThisWeek = useBoundStore((x) => x.xpThisWeek());
  const rank = useLeaderboardRank();
  const leaderboardLeague = "Liga Bronce";
  return (
    <article className="flex flex-col gap-5 rounded-2xl border-2 border-gray-200 p-6 text-gray-700">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{leaderboardLeague}</h2>
        <Link href="/leaderboard" className="font-bold uppercase text-blue-400">
          Ver todo
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center justify-center">
          <BronzeLeagueSvg />
          <span className="absolute text-xl font-black text-white">
            {rank}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm leading-6 text-gray-500">
            Tienes {xpThisWeek} XP esta semana
          </p>
        </div>
      </div>
    </article>
  );
};

const DailyQuestsSection = () => {
  const xpToday = useBoundStore((x) => x.xpToday());
  const goalXp = useBoundStore((x) => x.goalXp);

  return (
    <article className="flex flex-col gap-5 rounded-2xl border-2 border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-700">Misiones Diarias</h2>
      <div className="flex gap-5">
        <TreasureClosedSvg />
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-bold text-gray-800">
            Gana {goalXp} XP
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-normal text-gray-500">
              {xpToday}/{goalXp} XP
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

const LockedLeaderboardsSvg = () => {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path
        d="M23.544 3.41476L33.1698 3.41476C36.9415 3.41476 39.9991 6.47231 39.9991 10.244V14.554L10.9707 43.5824C4.66224 40.6308 0.240328 34.3187 0.00878906 26.95L23.544 3.41476Z"
        fill="#A6A6A6"
      />
      <path
        d="M39.9991 33.554V37.8637C39.9991 41.6354 36.9415 44.693 33.1698 44.693L14.6287 44.693C10.857 44.693 7.79945 41.6354 7.79945 37.8637V18.9326L39.9991 33.554Z"
        fill="#A6A6A6"
      />
    </svg>
  );
};

const TreasureClosedSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg width="56" height="42" viewBox="0 0 56 42" fill="none" {...props}>
      <rect x="0" y="16" width="56" height="26" rx="4" fill="#E5E7EB" />
      <rect x="24" y="16" width="8" height="10" fill="#9CA3AF" />
      <circle cx="28" cy="26" r="3" fill="#6B7280" />
      <rect x="20" y="0" width="16" height="16" rx="8" stroke="#E5E7EB" strokeWidth="4" fill="none" />
    </svg>
  );
};

const XpProgressSection = () => {
  const xpToday = useBoundStore((x) => x.xpToday());
  const goalXp = useBoundStore((x) => x.goalXp);

  return (
    <article className="flex flex-col gap-5 rounded-2xl border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-700">Meta Diaria</h2>
        <Link href="/settings/coach" className="uppercase text-blue-400">
          Editar meta
        </Link>
      </div>
      <div className="flex gap-5">
        <TreasureClosedSvg />
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <div className="relative h-5 w-52 rounded-l-full bg-gray-200">
              <div
                className="absolute left-0 top-0 h-full rounded-l-full bg-orange-400"
                style={{
                  width: `${Math.min(100, (xpToday / goalXp) * 100)}%`,
                }}
              ></div>
            </div>
            <LightningProgressSvg/>
          </div>
          <span className="text-sm font-normal text-gray-500">
            {xpToday}/{goalXp} XP
          </span>
        </div>
      </div>
    </article>
  );
};

const CreateAProfileSection = ({
  setLoginScreenState,
}: {
  setLoginScreenState: React.Dispatch<React.SetStateAction<LoginScreenState>>;
}) => {
  return (
    <article className="flex flex-col gap-5 rounded-2xl border-2 border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-700">Crear un perfil para guardar tu progreso</h2>
      <button
        className="rounded-2xl border-b-4 border-blue-500 bg-blue-400 py-3 uppercase text-white transition hover:border-blue-400 hover:bg-blue-300"
        onClick={() => setLoginScreenState("SIGNUP")}
      >
        Crear un perfil
      </button>
      <button
        className="rounded-2xl border-b-4 border-blue-500 bg-blue-400 py-3 uppercase text-white transition hover:border-blue-400 hover:bg-blue-300"
        onClick={() => setLoginScreenState("LOGIN")}
      >
        Ya tengo una cuenta
      </button>
    </article>
  );
};
