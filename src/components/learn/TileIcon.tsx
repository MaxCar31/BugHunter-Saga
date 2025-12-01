import { CheckmarkSvg, LockSvg, StarSvg } from "~/components/icons/gamification";
import { ActiveBookSvg, LockedBookSvg, GoldenBookSvg } from "~/components/icons/lessons/book";
import { ActiveDumbbellSvg, LockedDumbbellSvg, GoldenDumbbellSvg } from "~/components/icons/lessons/dumbbell";
import { FastForwardSvg } from "~/components/icons/lessons";
import { ActiveTreasureSvg, LockedTreasureSvg, GoldenTreasureSvg } from "~/components/icons/lessons/treasure";
import { ActiveTrophySvg, LockedTrophySvg, GoldenTrophySvg } from "~/components/icons/lessons/trophy";
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
  switch (tileType) {
    case "star":
      return status === "COMPLETE" ? (
        <CheckmarkSvg />
      ) : status === "ACTIVE" ? (
        <StarSvg />
      ) : (
        <LockSvg />
      );

    case "book":
      return status === "COMPLETE" ? (
        <GoldenBookSvg />
      ) : status === "ACTIVE" ? (
        <ActiveBookSvg />
      ) : (
        <LockedBookSvg />
      );

    case "dumbbell":
      return status === "COMPLETE" ? (
        <GoldenDumbbellSvg />
      ) : status === "ACTIVE" ? (
        <ActiveDumbbellSvg />
      ) : (
        <LockedDumbbellSvg />
      );

    case "fast-forward":
      return status === "COMPLETE" ? (
        <CheckmarkSvg />
      ) : status === "ACTIVE" ? (
        <StarSvg />
      ) : (
        <FastForwardSvg />
      );

    case "treasure":
      return status === "COMPLETE" ? (
        <GoldenTreasureSvg />
      ) : status === "ACTIVE" ? (
        <ActiveTreasureSvg />
      ) : (
        <LockedTreasureSvg />
      );

    case "trophy":
      return status === "COMPLETE" ? (
        <GoldenTrophySvg />
      ) : status === "ACTIVE" ? (
        <ActiveTrophySvg />
      ) : (
        <LockedTrophySvg />
      );
  }
};
