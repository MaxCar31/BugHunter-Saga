import Link from "next/link";
import { useState } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import modules from "~/utils/modules";
import { ModuleIcon } from "./ModuleIcon";

export const ModuleDropDown = () => {
  const module = useBoundStore((x) => x.module);
  const [modulesShown, setModulesShown] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 rounded-2xl border-2 border-b-4 border-blue-200 bg-blue-400 px-3 py-2 text-sm font-bold uppercase transition hover:brightness-110"
        onClick={() => setModulesShown((x) => !x)}
        onBlur={() => setModulesShown(false)}
      >
        <ModuleIcon module={module} width={24} />
        <span>{module.shortName}</span>
      </button>
      {modulesShown && (
        <ul className="absolute right-0 top-full grid w-[500px] grid-cols-1 rounded-2xl border-2 border-gray-200 bg-white p-6 font-light text-gray-600">
          {modules.map((module) => {
            return (
              <li key={module.code}>
                <Link
                  href={`/learn`}
                  tabIndex={0}
                  className="flex items-center gap-3 whitespace-nowrap rounded-xl p-3 hover:bg-gray-300"
                >
                  <ModuleIcon module={module} width={24} />
                  <div className="flex flex-col">
                    <span className="font-bold">{module.name}</span>
                    <span className="text-sm text-gray-400">{module.description}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
