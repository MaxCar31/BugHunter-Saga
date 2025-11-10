import { type NextPage } from "next";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { UpArrowSvg, PracticeExerciseSvg } from "~/components/Svgs";
import { TopBar } from "~/components/TopBar";
import { BottomBar } from "~/components/BottomBar";
import { RightBar } from "~/components/RightBar";
import { LeftBar } from "~/components/LeftBar";
import { LoginScreen, useLoginScreen } from "~/components/LoginScreen";
import { useBoundStore } from "~/hooks/useBoundStore";
import type { Tile, TileType, Unit } from "~/utils/units";
import { fetchModuleUnits } from "~/utils/units";
import { useRouter } from "next/router";
import { claimTreasure } from "~/services/userService";
import { TreasureCelebration } from "~/components/learn/TreasureCelebration";
import { TileIcon } from "~/components/learn/TileIcon";
import { HoverLabel } from "~/components/learn/HoverLabel";
import { UnitHeader } from "~/components/learn/UnitHeader";
import { LessonCompletionIcon } from "~/components/learn/LessonCompletionIcon";
import { getTileLeftClassName, getTileTooltipLeftOffset } from "~/utils/tilePositions";

type TileStatus = "LOCKED" | "ACTIVE" | "COMPLETE";

// Nueva función: Calcula el estado de un tile basado en el progreso real
const calculateTileStatus = (
  tile: Tile,
  unit: Unit,
  allUnits: Unit[],
  completedLessons: Set<number>
): TileStatus => {
  // 1. Si la lección ya está completada
  if (completedLessons.has(tile.lessonId)) {
    return "COMPLETE";
  }

  // 2. Verificar si todas las unidades anteriores están completas
  const currentUnitIndex = allUnits.findIndex(u => u.unitNumber === unit.unitNumber);

  for (let i = 0; i < currentUnitIndex; i++) {
    const previousUnit = allUnits[i];
    if (!previousUnit) continue; // TypeScript safety check
    const allTilesCompleted = previousUnit.tiles.every(t => completedLessons.has(t.lessonId));

    if (!allTilesCompleted) {
      // Si hay una unidad anterior incompleta, este tile está bloqueado
      return "LOCKED";
    }
  }

  // 3. Dentro de la unidad actual, verificar si el tile anterior está completo
  const tileIndex = unit.tiles.findIndex(t => t.lessonId === tile.lessonId);

  // Primera lección de la unidad
  if (tileIndex === 0) {
    return "ACTIVE";
  }

  // Verificar si todas las lecciones anteriores en esta unidad están completas
  for (let i = 0; i < tileIndex; i++) {
    const previousTile = unit.tiles[i];
    if (!previousTile) continue; // TypeScript safety check
    if (!completedLessons.has(previousTile.lessonId)) {
      return "LOCKED";
    }
  }

  return "ACTIVE";
};

const getTileColors = ({
  tileType,
  status,
  defaultColors,
}: {
  tileType: TileType;
  status: TileStatus;
  defaultColors: `border-${string} bg-${string}`;
}): `border-${string} bg-${string}` => {
  switch (status) {
    case "LOCKED":
      if (tileType === "fast-forward") return defaultColors;
      return "border-[#b7b7b7] bg-[#e5e5e5]";
    case "COMPLETE":
      return "border-yellow-500 bg-yellow-400";
    case "ACTIVE":
      return defaultColors;
  }
};

const TileTooltip = ({
  selectedTile,
  index,
  unit,
  description,
  status,
  closeTooltip,
  tile,
}: {
  selectedTile: number | null;
  index: number;
  unit: Unit;
  description: string;
  status: TileStatus;
  closeTooltip: () => void;
  tile: Tile;
}) => {
  const tileTooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const containsTileTooltip = (event: MouseEvent) => {
      if (selectedTile !== index) return;
      const clickIsInsideTooltip = tileTooltipRef.current?.contains(
        event.target as Node,
      );
      if (clickIsInsideTooltip) return;
      closeTooltip();
    };

    window.addEventListener("click", containsTileTooltip, true);
    return () => window.removeEventListener("click", containsTileTooltip, true);
  }, [selectedTile, tileTooltipRef, closeTooltip, index]);

  const activeBackgroundColor = unit.backgroundColor;

  return (
    <div
      className={`relative h-0 w-full ${index === selectedTile ? "" : "invisible"}`}
      ref={tileTooltipRef}
    >
      <div
        className={`absolute z-30 flex w-[280px] flex-col gap-4 rounded-xl p-4 font-bold transition-all duration-300 sm:w-[300px] ${status === "ACTIVE"
          ? activeBackgroundColor
          : status === "LOCKED"
            ? "border-2 border-gray-200 bg-gray-100"
            : "bg-yellow-400"
          } ${index === selectedTile ? "top-4 scale-100 opacity-100" : "-top-14 scale-0 opacity-0"}`}
        style={{ left: "calc(50% - 140px)" }}
      >
        <div
          className={`absolute left-[140px] top-[-8px] h-4 w-4 rotate-45 ${status === "ACTIVE"
            ? activeBackgroundColor
            : status === "LOCKED"
              ? "border-l-2 border-t-2 border-gray-200 bg-gray-100"
              : "bg-yellow-400"
            }`}
          style={{
            left: getTileTooltipLeftOffset({
              index,
              unitNumber: unit.unitNumber,
              tilesLength: unit.tiles.length
            }),
          }}
        ></div>
        <div
          className={`text-base sm:text-lg ${status === "ACTIVE"
            ? "text-white"
            : status === "LOCKED"
              ? "text-gray-400"
              : "text-yellow-600"
            }`}
        >
          {description}
        </div>
        {status === "ACTIVE" ? (
          <Link
            href={`/lesson?lessonId=${tile.lessonId}`}
            className="flex w-full items-center justify-center rounded-xl border-b-4 border-gray-200 bg-white p-3 text-sm font-bold uppercase text-blue-600 transition-colors hover:bg-gray-50 sm:text-base"
          >
            Iniciar +10 XP
          </Link>
        ) : status === "LOCKED" ? (
          <button
            className="w-full rounded-xl bg-gray-200 p-3 text-sm uppercase text-gray-400 sm:text-base"
            disabled
          >
            Bloqueado
          </button>
        ) : (
          <Link
            href={`/lesson?lessonId=${tile.lessonId}&practice=true`}
            className="flex w-full items-center justify-center rounded-xl border-b-4 border-yellow-200 bg-white p-3 text-sm uppercase text-yellow-400 sm:text-base"
          >
            Practicar +5 XP
          </Link>
        )}
      </div>
    </div>
  );
};

const UnitSection = ({
  unit,
  allUnits,
  onClaimTreasure,
  isClaimingTreasure,
}: {
  unit: Unit | null;
  allUnits: Unit[];
  onClaimTreasure: (lessonId: number) => void;
  isClaimingTreasure: boolean;
}): JSX.Element => {
  const [selectedTile, setSelectedTile] = useState<null | number>(null);

  useEffect(() => {
    const unselectTile = () => setSelectedTile(null);
    window.addEventListener("scroll", unselectTile);
    return () => window.removeEventListener("scroll", unselectTile);
  }, []);

  const closeTooltip = useCallback(() => setSelectedTile(null), []);

  const currentModule = useBoundStore((x) => x.module);
  const getCompletedLessons = useBoundStore((x) => x.getCompletedLessons);
  const markLessonAsCompleted = useBoundStore((x) => x.markLessonAsCompleted);

  const completedLessons = getCompletedLessons(currentModule?.code || '');

  // Mostrar skeleton mientras se carga
  if (!unit || !unit.tiles || unit.tiles.length === 0) {
    return (
      <div className="flex w-full flex-col items-center gap-6 py-4 px-4 sm:px-0">
        <div className="h-24 w-full max-w-xl animate-pulse rounded-xl bg-gray-200"></div>
        <div className="h-48 w-full max-w-xl animate-pulse rounded-xl bg-gray-200"></div>
      </div>
    );
  }

  return (
    <>
      <UnitHeader
        unitNumber={unit.unitNumber}
        description={unit.description}
        backgroundColor={unit.backgroundColor}
        borderColor={unit.borderColor}
        moduleCode={currentModule?.code || ''}
      />
      <div className="relative mb-8 mt-6 flex w-full flex-col items-center gap-4 px-4 sm:gap-6 sm:px-0">
        {unit.tiles.map((tile, i): JSX.Element => {
          // Calcular el estado real basado en el progreso del usuario
          const status = calculateTileStatus(tile, unit, allUnits, completedLessons);

          return (
            <Fragment key={i}>
              {(() => {
                switch (tile.type) {
                  case "star":
                  case "book":
                  case "dumbbell":
                  case "trophy":
                  case "fast-forward":
                    if (tile.type === "trophy" && status === "COMPLETE") {
                      return (
                        <div className="relative">
                          <TileIcon tileType={tile.type} status={status} />
                          <div className="absolute left-0 right-0 top-6 flex justify-center text-lg font-bold text-yellow-700">
                            {unit.unitNumber}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div
                        className={`relative h-[93px] w-[98px] ${getTileLeftClassName({
                          index: i,
                          unitNumber: unit.unitNumber,
                          tilesLength: unit.tiles.length,
                        })}`}
                      >
                        {tile.type === "fast-forward" && status === "LOCKED" ? (
                          <HoverLabel
                            text="Jump here?"
                            textColor="text-gray-700"
                          />
                        ) : selectedTile !== i && status === "ACTIVE" ? (
                          <HoverLabel text="Start" textColor="text-gray-700" />
                        ) : null}
                        <button
                          className={`absolute m-3 rounded-full border-b-8 p-4 transition-all ${getTileColors({
                            tileType: tile.type,
                            status,
                            defaultColors: `${unit.borderColor} ${unit.backgroundColor}` as `border-${string} bg-${string}`,
                          })}`}
                          onClick={() => {
                            if (
                              tile.type === "fast-forward" &&
                              status === "LOCKED"
                            ) {
                              // TODO: Implementar fast-forward con el nuevo sistema de progreso
                              // Por ahora deshabilitado
                              console.warn("Fast-forward temporalmente deshabilitado");
                              return;
                            }
                            setSelectedTile(i);
                          }}
                        >
                          <TileIcon tileType={tile.type} status={status} />
                          <span className="sr-only">Show lesson</span>
                        </button>
                      </div>
                    );
                  case "treasure":
                    return (
                      <div
                        className={`relative ${getTileLeftClassName({
                          index: i,
                          unitNumber: unit.unitNumber,
                          tilesLength: unit.tiles.length,
                        })}`}
                        onClick={() => {
                          if (status === "ACTIVE" && !isClaimingTreasure) {
                            onClaimTreasure(tile.lessonId);
                          }
                        }}
                        role="button"
                        tabIndex={status === "ACTIVE" ? 0 : undefined}
                        aria-hidden={status !== "ACTIVE"}
                        aria-label={status === "ACTIVE" ? "Collect reward" : ""}
                      >
                        {status === "ACTIVE" && (
                          <HoverLabel text="Abrir" textColor="text-yellow-400" />
                        )}
                        <TileIcon tileType={tile.type} status={status} />
                      </div>
                    );
                }
              })()}
              <TileTooltip
                selectedTile={selectedTile}
                index={i}
                unit={unit}
                description={(() => {
                  switch (tile.type) {
                    case "book":
                    case "dumbbell":
                    case "star":
                      return tile.description;
                    case "fast-forward":
                      return status === "LOCKED"
                        ? "¿Saltar aquí?"
                        : tile.description;
                    case "trophy":
                      return `Revisión de Unidad ${unit.unitNumber}`;
                    case "treasure":
                      return "";
                  }
                })()}
                status={status}
                closeTooltip={closeTooltip}
                tile={tile}
              />
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

const Learn: NextPage = () => {
  const { loginScreenState, setLoginScreenState } = useLoginScreen();
  const currentModule = useBoundStore((x) => x.module);
  const router = useRouter();

  // --- CARGA DINÁMICA DE LAS UNIDADES ---
  const [units, setUnits] = useState<Unit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [claimingTreasure, setClaimingTreasure] = useState(false);
  const [treasureCelebration, setTreasureCelebration] = useState<{
    show: boolean;
    lingotsEarned: number;
  }>({ show: false, lingotsEarned: 0 });

  // Zustand stores
  const setLingots = useBoundStore((x) => x.setLingots);
  const markLessonAsCompleted = useBoundStore((x) => x.markLessonAsCompleted);

  // Hook para cargar las unidades
  useEffect(() => {
    const loadUnits = async () => {
      // Si no hay módulo, no intentar cargar
      if (!currentModule?.code) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("bh_token");
        const loadedUnits = await fetchModuleUnits(currentModule.code, token || undefined);
        console.log("🔍 Units loaded:", loadedUnits);
        setUnits(loadedUnits);
      } catch (err) {
        console.error("❌ Error loading units:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    void loadUnits();
  }, [currentModule?.code]);

  // Hook para scroll
  useEffect(() => {
    const updateScrollY = () => setScrollY(globalThis.scrollY ?? scrollY);
    updateScrollY();
    document.addEventListener("scroll", updateScrollY);
    return () => document.removeEventListener("scroll", updateScrollY);
  }, [scrollY]);

  // Handler para reclamar tesoros
  const handleClaimTreasure = async (lessonId: number) => {
    // Prevenir múltiples claims simultáneos
    if (claimingTreasure) return;

    setClaimingTreasure(true);

    try {
      const reward = await claimTreasure(lessonId);

      // Actualizar lingots en el store
      setLingots(reward.totalLingots);

      // Marcar el tesoro como completado en el store local
      if (currentModule?.code) {
        markLessonAsCompleted(currentModule.code, lessonId);
      }

      // Recargar las unidades para actualizar el estado del tesoro a COMPLETE
      if (currentModule?.code) {
        const token = localStorage.getItem("bh_token");
        const loadedUnits = await fetchModuleUnits(currentModule.code, token || undefined);
        setUnits(loadedUnits);
      }

      // Mostrar celebración
      setTreasureCelebration({
        show: true,
        lingotsEarned: reward.lingotsEarned,
      });

      console.log(`🎉 Tesoro reclamado! +${reward.lingotsEarned} Puntos QA`);
    } catch (err) {
      console.error("❌ Error al reclamar tesoro:", err);
      const errorMessage = err instanceof Error ? err.message : "Error al reclamar el tesoro";
      alert(errorMessage);
    } finally {
      setClaimingTreasure(false);
    }
  };

  // Early returns después de todos los hooks
  if (!currentModule?.code) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-xl bg-white p-6 text-center shadow-lg sm:p-8">
          <h1 className="mb-4 text-xl font-bold text-gray-800 sm:text-2xl">No se ha seleccionado un módulo</h1>
          <p className="mb-6 text-sm text-gray-600 sm:text-base">
            Por favor, selecciona un módulo para continuar aprendiendo.
          </p>
          <Link
            href="/register"
            className="inline-block rounded-2xl border-b-4 border-blue-500 bg-blue-400 px-6 py-3 text-sm font-bold uppercase text-white transition hover:brightness-110 sm:text-base"
          >
            Seleccionar Módulo
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="rounded-xl bg-white p-6 text-center shadow-lg sm:p-8">
          <h1 className="mb-6 text-lg font-bold text-gray-800 sm:text-xl">Cargando módulo...</h1>
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-b-4 border-blue-500 sm:h-12 sm:w-12"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-xl bg-white p-6 text-center shadow-lg sm:p-8">
          <h1 className="mb-4 text-lg font-bold text-red-600 sm:text-xl">Error al cargar</h1>
          <p className="mb-6 text-sm text-gray-600 sm:text-base">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-2xl border-b-4 border-blue-500 bg-blue-400 px-6 py-3 text-sm font-bold uppercase text-white transition hover:brightness-110 sm:text-base"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const moduleBackgroundColor = (currentModule?.uiConfig?.backgroundColor || 'bg-blue-500') as `bg-${string}`;
  const moduleBorderColor = (currentModule?.uiConfig?.borderColor || 'border-blue-700') as `border-${string}`;

  return (
    <>
      <TopBar
        backgroundColor={moduleBackgroundColor}
        borderColor={moduleBorderColor}
      />
      <LeftBar selectedTab="Aprender" />

      <div className="flex justify-center gap-3 pt-14 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-8 min-h-screen bg-gray-50">
        <div className="flex w-full max-w-2xl grow flex-col pb-20 sm:pb-24">
          {isLoading && (
            <UnitSection
              unit={null}
              allUnits={[]}
              onClaimTreasure={handleClaimTreasure}
              isClaimingTreasure={claimingTreasure}
            />
          )}
          {error && (
            <div className="flex justify-center py-8 px-4">
              <p className="text-center text-red-500 bg-red-50 px-4 py-3 rounded-lg border border-red-200">
                {error}
              </p>
            </div>
          )}
          {!isLoading && !error && units.map((unit) => (
            <UnitSection
              unit={unit}
              allUnits={units}
              key={unit.unitNumber}
              onClaimTreasure={handleClaimTreasure}
              isClaimingTreasure={claimingTreasure}
            />
          ))}

          <div className="sticky bottom-20 left-0 right-0 flex items-end justify-between px-4 sm:px-0 sm:bottom-24">
            <Link
              href="/lesson?practice"
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-b-4 border-gray-200 bg-white shadow-lg transition hover:bg-gray-50 hover:brightness-90 sm:h-16 sm:w-16"
            >
              <span className="sr-only">Practice exercise</span>
              <PracticeExerciseSvg className="h-7 w-7 sm:h-8 sm:w-8" />
            </Link>
            {scrollY > 100 && (
              <button
                className="flex h-12 w-12 items-center justify-center self-end rounded-2xl border-2 border-b-4 border-gray-200 bg-white shadow-lg transition hover:bg-gray-50 hover:brightness-90 sm:h-14 sm:w-14"
                onClick={() => scrollTo(0, 0)}
              >
                <span className="sr-only">Jump to top</span>
                <UpArrowSvg />
              </button>
            )}
          </div>
        </div>
        <RightBar />
      </div>

      <BottomBar selectedTab="Aprender" />
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />

      {/* Celebración de tesoro reclamado */}
      {treasureCelebration.show && (
        <TreasureCelebration
          lingotsEarned={treasureCelebration.lingotsEarned}
          onClose={() => setTreasureCelebration({ show: false, lingotsEarned: 0 })}
        />
      )}
    </>
  );
};

export default Learn;