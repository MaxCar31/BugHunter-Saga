import Link from "next/link";
import { ChevronLeftSvg, ChevronRightSvg } from "./Svgs";
import React, { useRef } from "react";
import modules from "~/utils/modules";
import { useBoundStore } from "~/hooks/useBoundStore";
import { ModuleIcon } from "./ModuleIcon";

declare global {
  interface Element {
    offsetLeft: number;
  }
}

const scrollCarousel = ({
  container,
  startIndexRef,
  endIndex,
}: {
  container: Element;
  startIndexRef: React.MutableRefObject<number>;
  endIndex: number;
}) => {
  const startIndex = startIndexRef.current;
  const startChild = container.children[startIndex];
  const endChild = container.children[endIndex];
  if (!startChild || !endChild) return;
  const startX = startChild.offsetLeft - container.offsetLeft;
  const endX = endChild.offsetLeft - container.offsetLeft;
  const startTime = Date.now();
  const intervalTime = 500;
  const endTime = Date.now() + intervalTime;
  const tick = () => {
    const nowTime = Date.now();
    const percent = Math.min(1, (nowTime - startTime) / intervalTime);
    const newScrollLeft = startX + (endX - startX) * percent;
    container.scrollLeft = newScrollLeft;
    if (nowTime < endTime) {
      requestAnimationFrame(tick);
    }
  };
  startIndexRef.current = endIndex;
  requestAnimationFrame(tick);
};

const scrollCarouselLeft = ({
  modulesContainer,
  startIndexRef,
  lastModuleIndex,
}: {
  modulesContainer: React.MutableRefObject<HTMLDivElement | null>;
  startIndexRef: React.MutableRefObject<number>;
  lastModuleIndex: number;
}) => {
  const container = modulesContainer.current;
  if (!container) return;
  const startIndex = startIndexRef.current;
  const endIndex =
    startIndex <= 0 ? lastModuleIndex : Math.max(0, startIndex - 2);
  scrollCarousel({ container, startIndexRef, endIndex });
};

const scrollCarouselRight = ({
  modulesContainer,
  startIndexRef,
  lastModuleIndex,
}: {
  modulesContainer: React.MutableRefObject<HTMLDivElement | null>;
  startIndexRef: React.MutableRefObject<number>;
  lastModuleIndex: number;
}) => {
  const container = modulesContainer.current;
  if (!container) return;
  const startIndex = startIndexRef.current;
  const endIndex =
    startIndex >= lastModuleIndex
      ? 0
      : (startIndex + 2) % container.children.length;
  scrollCarousel({ container, startIndexRef, endIndex });
};

export const ModuleCarousel = () => {
  const setModule = useBoundStore((x) => x.setModule);

  const startIndexRef = useRef(0);
  const modulesContainer = useRef<null | HTMLDivElement>(null);
  const lastModuleIndex = 2; // Solo tenemos 3 módulos (índices 0, 1, 2)
  
  return (
    <article className="absolute bottom-0 left-0 right-0 hidden h-20 items-center justify-center bg-[#0a4a82] text-white md:flex">
      <div className="flex w-full max-w-5xl justify-between">
        <button
          className="opacity-50"
          onClick={() =>
            scrollCarouselLeft({
              modulesContainer,
              startIndexRef,
              lastModuleIndex,
            })
          }
        >
          <ChevronLeftSvg />
          <span className="sr-only">Scroll left</span>
        </button>
        <div
          className="flex items-center gap-6 overflow-x-hidden"
          ref={modulesContainer}
        >
          {modules.map((module) => {
            return (
              <Link
                key={module.code}
                className="flex items-center gap-2"
                href={"/learn"}
                onClick={() => setModule(module)}
              >
                <ModuleIcon module={module} width={40} />
                <span className="text-sm font-bold uppercase">
                  {module.shortName}
                </span>
              </Link>
            );
          })}
        </div>
        <button
          className="opacity-50"
          onClick={() =>
            scrollCarouselRight({
              modulesContainer,
              startIndexRef,
              lastModuleIndex,
            })
          }
        >
          <ChevronRightSvg />
          <span className="sr-only">Scroll right</span>
        </button>
      </div>
    </article>
  );
};
