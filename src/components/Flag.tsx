import type { StaticImageData } from "next/image";
import _flagsSvg from "../../public/flags.svg";
import type { Module } from "~/utils/modules.ts";

const flagsSvg = _flagsSvg as StaticImageData;

export const Flag = ({
  module,
  width = 84,
}: {
  module: Module;
  width?: number;
}) => {
  const height = width * (19.3171 / 24);
  return (
    <svg viewBox={module.viewBox} style={{ height, width }}>
      <image
        height={flagsSvg.height}
        href={flagsSvg.src}
        width={flagsSvg.width}
      ></image>
    </svg>
  );
};
