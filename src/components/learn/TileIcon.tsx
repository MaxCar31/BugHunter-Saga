import {
  CheckmarkSvg,
  LockSvg,
  StarSvg,
  ActiveBookSvg,
  LockedBookSvg,
  GoldenBookSvg,
  ActiveDumbbellSvg,
  LockedDumbbellSvg,
  GoldenDumbbellSvg,
  FastForwardSvg,
  ActiveTreasureSvg,
  LockedTreasureSvg,
  GoldenTreasureSvg,
  ActiveTrophySvg,
  LockedTrophySvg,
  GoldenTrophySvg,
} from "~/components/Svgs";
import type { TileType } from "~/utils/units";

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
