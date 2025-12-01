/**
 * @deprecated Este componente NO SE USA en la aplicación.
 * TopBar.tsx es el componente activo.
 * Este archivo puede ser eliminado en futuras versiones.
 */
import dayjs from "dayjs";
import Link from "next/link";
import type { ComponentProps } from "react";
import React, { useState } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import { Calendar } from "./Calendar";
import { ModuleIcon } from "./ModuleIcon";
import { MoreOptionsSvg, PodcastIconSvg, GlobeIconSvg } from "~/components/icons/navigation";
import { FireSvg, EmptyFireSvg, GemSvg, LingotsTreasureChestSvg } from "~/components/icons/gamification";

// Icon wrapper components (inline definitions for deprecated component)
const FireIcon = ({ isEmpty, ...props }: { isEmpty: boolean } & ComponentProps<"svg">) => {
  return isEmpty ? <EmptyFireSvg {...props} /> : <FireSvg {...props} />;
};

const GemIcon = (props: ComponentProps<"svg"> & { size?: number }) => {
  return <GemSvg {...props} />;
};

const TreasureChestIcon = (props: ComponentProps<"svg">) => {
  return <LingotsTreasureChestSvg {...props} />;
};

const GlobeIcon = (props: ComponentProps<"svg">) => {
  return <GlobeIconSvg {...props} />;
};

const AddModuleSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg width="36" height="29" viewBox="0 0 36 29" {...props}>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g stroke="#AFAFAF">
          <path
            d="M7.743 3c-1.67 0-2.315.125-2.98.48A3.071 3.071 0 0 0 3.48 4.763c-.355.665-.48 1.31-.48 2.98v13.514c0 1.67.125 2.315.48 2.98.297.555.728.986 1.283 1.283.665.355 1.31.48 2.98.48h20.514c1.67 0 2.315-.125 2.98-.48a3.071 3.071 0 0 0 1.283-1.283c.355-.665.48-1.31.48-2.98V7.743c0-1.67-.125-2.315-.48-2.98a3.071 3.071 0 0 0-1.283-1.283c-.665-.355-1.31-.48-2.98-.48H7.743Z"
            strokeWidth="2"
          />
          <g strokeLinecap="round" strokeWidth="3">
            <path d="M18 10v9M13.5 14.5h9" />
          </g>
        </g>
      </g>
    </svg>
  );
};

type MenuState = "HIDDEN" | "MODULES" | "STREAK" | "GEMS" | "MORE";

export const TopBar = ({
  backgroundColor = "bg-[#58cc02]",
  borderColor = "border-[#46a302]",
}: {
  backgroundColor?: `bg-${string}`;
  borderColor?: `border-${string}`;
}) => {
  const [menu, setMenu] = useState<MenuState>("HIDDEN");
  const [now, setNow] = useState(dayjs());
  const streak = useBoundStore((x) => x.streak);
  const lingots = useBoundStore((x) => x.lingots);
  const currentModule = useBoundStore((x) => x.module);
  return (
    <header className="fixed z-20 h-[58px] w-full">
      <div
        className={`relative flex h-full w-full items-center justify-between border-b-2 px-[10px] transition duration-500 sm:hidden ${borderColor} ${backgroundColor}`}
      >
        <button
          onClick={() =>
            setMenu((x) => (x === "MODULES" ? "HIDDEN" : "MODULES"))
          }
        >
          <ModuleIcon module={currentModule} width={45} />
          <span className="sr-only">Ver módulos</span>
        </button>

        <button
          className="flex items-center gap-2 font-bold"
          onClick={() => setMenu((x) => (x === "STREAK" ? "HIDDEN" : "STREAK"))}
          aria-label="Toggle streak menu"
        >
          <FireIcon isEmpty={streak === 0} className="w-5 h-6" />
          <span className={streak > 0 ? "text-white" : "text-black opacity-20"}>
            {streak}
          </span>
        </button>
        <button
          className="flex items-center gap-2 font-bold"
          onClick={() => setMenu((x) => (x === "GEMS" ? "HIDDEN" : "GEMS"))}
          aria-label="Toggle puntos QA menu"
        >
          <GemIcon className={lingots > 0 ? "text-red-500" : "text-gray-300 opacity-20"} size={24} />
          <span
            className={lingots > 0 ? "text-white" : "text-black opacity-20"}
          >
            {lingots}
          </span>
        </button>
        <MoreOptionsSvg
          onClick={() => setMenu((x) => (x === "MORE" ? "HIDDEN" : "MORE"))}
          role="button"
          tabIndex={0}
          aria-label="Toggle more menu"
        />

        <div
          className={[
            "absolute left-0 right-0 top-full bg-white transition duration-300",
            menu === "HIDDEN" ? "opacity-0" : "opacity-100",
          ].join(" ")}
          aria-hidden={menu === "HIDDEN"}
        >
          {((): null | JSX.Element => {
            switch (menu) {
              case "MODULES":
                return (
                  <div className="flex gap-5 p-5">
                    <div className="flex flex-col items-center justify-between gap-2">
                      <div className="rounded-2xl border-4 border-blue-400">
                        <ModuleIcon module={currentModule} width={80} />
                      </div>
                      <span className="font-bold">{currentModule?.name}</span>
                    </div>
                    <Link
                      className="flex flex-col items-center justify-between gap-2"
                      href="/register"
                    >
                      <div className="rounded-2xl border-4 border-white">
                        <AddModuleSvg className="h-16 w-20" />
                      </div>
                      <span className="font-bold text-gray-400">Módulos</span>
                    </Link>
                  </div>
                );

              case "STREAK":
                return (
                  <div className="flex grow flex-col items-center gap-3 p-5">
                    <h2 className="text-xl font-bold">Racha</h2>
                    <p className="text-sm text-gray-400">
                      ¡Practica cada día para que tu racha no se reinicie!
                    </p>
                    <div className="self-stretch">
                      <Calendar now={now} setNow={setNow} />
                    </div>
                  </div>
                );

              case "GEMS":
                return (
                  <div className="flex grow items-center gap-3 p-5">
                    <TreasureChestIcon className="h-24 w-24" />
                    <div className="flex flex-col gap-3">
                      <h2 className="text-xl font-bold text-black">Puntos QA</h2>
                      <p className="text-sm font-normal text-gray-400">
                        Tienes {lingots}{" "}
                        {lingots === 1 ? "punto" : "puntos"}.
                      </p>
                      <Link
                        className="font-bold uppercase text-blue-400 transition hover:brightness-110"
                        href="/shop"
                      >
                        Ir a tienda
                      </Link>
                    </div>
                  </div>
                );

              case "MORE":
                return (
                  <div className="flex grow flex-col">
                    <Link
                      className="flex items-center gap-2 p-2 font-bold text-gray-700"
                      href="https://podcast.bughuntersaga.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <PodcastIconSvg className="h-10 w-10" />
                      Podcast QA
                    </Link>
                    <Link
                      className="flex items-center gap-2 border-t-2 border-gray-300 p-2 font-bold text-gray-700"
                      href="https://schools.bughuntersaga.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GlobeIcon className="h-10 w-10" />
                      Testing Schools
                    </Link>
                  </div>
                );

              case "HIDDEN":
                return null;
            }
          })()}
          <div
            className={[
              "absolute left-0 top-full h-screen w-screen bg-black opacity-30",
              menu === "HIDDEN" ? "pointer-events-none" : "",
            ].join(" ")}
            onClick={() => setMenu("HIDDEN")}
            aria-label="Hide menu"
            role="button"
          ></div>
        </div>
      </div>
    </header>
  );
};
