import Link from "next/link";
import { useState } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
// TODO: Reemplazar con datos dinámicos de fetchModules
// import modules from "~/utils/modules";
import { ModuleIcon } from "./ModuleIcon";

// Temporal: array vacío hasta implementar carga dinámica
const modules: any[] = [];

export const ModuleDropDown = () => {
  const currentModule = useBoundStore((x) => x.module);
  const [modulesShown, setModulesShown] = useState(false);

  if (!currentModule) {
    return null; // or a loading state
  }

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 rounded-2xl border-2 border-b-4 border-blue-200 bg-blue-400 px-3 py-2 text-sm font-bold uppercase transition hover:brightness-110"
        onClick={() => setModulesShown((x) => !x)}
        onBlur={() => setModulesShown(false)}
      >
  <ModuleIcon module={currentModule} width={24} />
  <span>{currentModule.shortName}</span>
      </button>
      {modulesShown && (
        <ul className="absolute right-0 top-full grid w-[500px] grid-cols-1 rounded-2xl border-2 border-gray-200 bg-white p-6 font-light text-gray-600">
          {modules.map((m) => {
            return (
              <li key={m.code}>
                <Link
                  href={`/learn`}
                  tabIndex={0}
                  className="flex items-center gap-3 whitespace-nowrap rounded-xl p-3 hover:bg-gray-300"
                >
                  <ModuleIcon module={m} width={24} />
                  <div className="flex flex-col">
                    <span className="font-bold">{m.name}</span>
                    <span className="text-sm text-gray-400">{m.description}</span>
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
