import type { NextPage } from "next";
import Link from "next/link";
import modules from "~/utils/modules";
import { ModuleHeader } from "~/components/ModuleHeader";
import { useBoundStore } from "~/hooks/useBoundStore";
import { ModuleIcon } from "~/components/ModuleIcon";
import _bgSnow from "../../public/bg-snow.svg";
import type { StaticImageData } from "next/image";

const bgSnow = _bgSnow as StaticImageData;

const Register: NextPage = () => {
  const setModule = useBoundStore((x) => x.setModule);
  return (
    <main
      className="flex min-h-screen flex-col items-center bg-[#235390] text-white"
      style={{ backgroundImage: `url(${bgSnow.src})` }}
    >
      <ModuleHeader />
      <div className="container flex grow flex-col items-center justify-center gap-20 px-4 py-16">
        <h1 className="mt-20 text-center text-3xl font-extrabold tracking-tight text-white">
          Selecciona tu módulo de Testing...
        </h1>
        <section className="mx-auto flex w-full max-w-2xl grow flex-col gap-4">
          {modules.map((module) => (
            <Link
              key={module.name}
              href="/learn"
              className={
                "flex cursor-pointer items-center gap-6 rounded-2xl border-2 border-b-4 border-gray-400 px-6 py-6 text-xl font-bold hover:bg-gray-300 hover:bg-opacity-20"
              }
              onClick={() => setModule(module)}
            >
              <ModuleIcon module={module} />
              <div className="flex-1">
                <div>{module.name}</div>
                <div className="text-sm font-normal text-gray-300 mt-2">{module.description}</div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Register;
