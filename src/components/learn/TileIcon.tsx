import { CheckmarkSvg, LockSvg, StarSvg } from "~/components/icons/gamification";
import { ActiveBookSvg, GoldenBookSvg } from "~/components/icons/lessons/book";
import { ActiveDumbbellSvg, GoldenDumbbellSvg } from "~/components/icons/lessons/dumbbell";
import { ActiveTreasureSvg, LockedTreasureSvg, GoldenTreasureSvg } from "~/components/icons/lessons/treasure";
import { ActiveTrophySvg, GoldenTrophySvg } from "~/components/icons/lessons/trophy";
import type { TileType } from "~/types/unit";

type TileStatus = "LOCKED" | "ACTIVE" | "COMPLETE";

interface TileIconProps {
  tileType: TileType;
  status: TileStatus;
}

/**
 * Componente que renderiza el icono apropiado según el tipo de tile y su estado
 * Centraliza toda la lógica de mapeo de iconos
 */
export const TileIcon = ({ tileType, status }: TileIconProps): JSX.Element => {
  // Si está bloqueado, mostrar LockSvg (excepto treasure que tiene su propio icono)
  if (status === "LOCKED" && tileType !== "treasure") {
    return <LockSvg />;
  }

  switch (tileType) {
    case "book":
      return status === "COMPLETE" ? <GoldenBookSvg /> : <ActiveBookSvg />;

    case "dumbbell":
      return status === "COMPLETE" ? <GoldenDumbbellSvg /> : <ActiveDumbbellSvg />;

    case "fast-forward":
      return status === "COMPLETE" ? <CheckmarkSvg /> : <StarSvg />;

    case "treasure":
      return status === "COMPLETE" ? (
        <GoldenTreasureSvg />
      ) : status === "ACTIVE" ? (
        <ActiveTreasureSvg />
      ) : (
        <LockedTreasureSvg />
      );

    case "trophy":
      return status === "COMPLETE" ? <GoldenTrophySvg /> : <ActiveTrophySvg />;
  }
};
