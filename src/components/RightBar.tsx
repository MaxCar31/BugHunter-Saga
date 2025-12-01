import Link from "next/link";
import React, { useState, useEffect } from "react";
import { LightningProgressSvg, GemSvg, LingotsTreasureChestSvg } from "~/components/icons/gamification";
import { BronzeLeagueSvg } from "~/components/icons/league";
import { useBoundStore } from "~/hooks/useBoundStore";
import { ModuleIcon } from "./ModuleIcon";
import type { LoginScreenState } from "./LoginScreen";
import { LoginScreen } from "./LoginScreen";
import { getUserStats } from "~/services/userService";
import UnitProgressCard from "./UnitProgressCard";

export const RightBar = () => {
  const loggedIn = useBoundStore((x) => x.loggedIn);
  const lingots = useBoundStore((x) => x.lingots);
  const currentModule = useBoundStore((x) => x.module);
  const getLessonsCompletedForModule = useBoundStore((x) => x.getLessonsCompletedForModule);

  const setLingots = useBoundStore((x) => x.setLingots);
  const setStreak = useBoundStore((x) => x.setStreak);
  const setTotalXp = useBoundStore((x) => x.setTotalXp);
  const setXpToday = useBoundStore((x) => x.setXpToday);
  const setActiveDays = useBoundStore((x) => x.setActiveDays);
  const setLeagueRank = useBoundStore((x) => x.setLeagueRank);

  // Calculamos el total de lecciones completadas en todos los módulos
  const totalLessonsCompleted = ["mod-a", "mod-b", "mod-c"]
    .reduce((total, moduleCode) => total + getLessonsCompletedForModule(moduleCode), 0);

  const [modulesShown, setModulesShown] = useState(false);
  const [loginScreenState, setLoginScreenState] = useState<LoginScreenState>("HIDDEN");

  // ✅ Cargar estadísticas del usuario al montar el componente
  useEffect(() => {
    if (!loggedIn) return;

    const loadStats = async () => {
      try {
        const stats = await getUserStats();

        setLingots(stats.totalLingots);
        setStreak(stats.currentStreak);
        setTotalXp(stats.totalXp);
        setXpToday(stats.xpToday);
        setActiveDays(stats.activeDays);
        setLeagueRank(stats.leagueRank);
      } catch (error) {
        console.error("Error loading user stats:", error);
      }
    };

    void loadStats();
  }, [loggedIn, setLingots, setStreak, setTotalXp, setXpToday, setActiveDays, setLeagueRank]);

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
            <ModuleIcon module={currentModule} width={45} />
            <div>{currentModule?.name}</div>
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
                <ModuleIcon module={currentModule} width={45} />
                <span className="text-blue-500">{currentModule?.name}</span>
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
          {/* <span
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
          </span> */}
          {/* <span
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
          </span> */}
        </article>

        {/* Sección de Puntos QA */}
        {loggedIn && (
          <section className="flex items-center gap-4 rounded-2xl border-2 border-[#f2a445] bg-[#fff7e6] px-5 py-4">
            <GemSvg />
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Puntos QA</span>
              <span className="text-3xl font-bold text-[#f2a445]">{lingots}</span>
            </div>
          </section>
        )}

        {loggedIn && totalLessonsCompleted < 10 ? (
          <UnlockLeaderboardsSection />
        ) : loggedIn && totalLessonsCompleted >= 10 ? (
          <LeaderboardRankSection />
        ) : null}
        <UnitProgressSection />
        <DailyQuestsSection />
        <XpProgressSection />
        {!loggedIn && (
          <></>
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
  const getLessonsCompletedForModule = useBoundStore((x) => x.getLessonsCompletedForModule);

  // Calculamos el total de lecciones completadas en todos los módulos
  const totalLessonsCompleted = ["mod-a", "mod-b", "mod-c"]
    .reduce((total, moduleCode) => total + getLessonsCompletedForModule(moduleCode), 0);

  if (totalLessonsCompleted >= 10) {
    return null;
  }

  return (
    <></>
  );
};

const LeaderboardRankSection = () => {
  const xpThisWeek = useBoundStore((x) => x.xpThisWeek());
  const leagueRank = useBoundStore((x) => x.leagueRank);
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
          <BronzeLeagueSvg className="w-12 h-12" />
          <span className="absolute text-xl font-black text-white">
            {leagueRank ?? "-"}
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
        <LingotsTreasureChestSvg className="w-14 h-14" />
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

// ✅ SVG components migrados a ~/components/icons/
// Los componentes inline fueron refactorizados para mantenibilidad

const UnitProgressSection = () => {
  const loggedIn = useBoundStore((x) => x.loggedIn);
  const [currentUnitId, setCurrentUnitId] = useState<number>(1);

  // Detectar la unidad actual basado en el scroll o la URL
  useEffect(() => {
    const detectCurrentUnit = () => {
      // Buscar todas las secciones de unidad en la página
      const unitSections = document.querySelectorAll('[data-unit-number]');
      const scrollY = window.scrollY + 200; // Offset para detectar mejor

      for (const section of Array.from(unitSections)) {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionBottom = sectionTop + (section as HTMLElement).offsetHeight;

        if (scrollY >= sectionTop && scrollY <= sectionBottom) {
          const unitNumber = parseInt((section as HTMLElement).dataset.unitNumber || '1');
          setCurrentUnitId(unitNumber);
          break;
        }
      }
    };

    // Detectar unidad al cargar
    detectCurrentUnit();

    // Detectar unidad al hacer scroll
    const handleScroll = () => {
      detectCurrentUnit();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!loggedIn) {
    return null;
  }

  return (
    <UnitProgressCard
      unitId={currentUnitId}
      className="w-full"
    />
  );
};

const XpProgressSection = () => {
  const xpToday = useBoundStore((x) => x.xpToday());
  const goalXp = useBoundStore((x) => x.goalXp);

  return (
    <article className="flex flex-col gap-5 rounded-2xl border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-700">Meta Diaria</h2>
      </div>
      <div className="flex gap-5">
        <LingotsTreasureChestSvg className="w-14 h-14" />
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
            <LightningProgressSvg />
          </div>
          <span className="text-sm font-normal text-gray-500">
            {xpToday}/{goalXp} XP
          </span>
        </div>
      </div>
    </article>
  );
};


