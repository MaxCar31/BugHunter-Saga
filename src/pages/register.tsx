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
        <section className="mx-auto grid w-full max-w-5xl grow grid-cols-1 flex-col gap-x-2 gap-y-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {modules.map((module) => (
            <Link
              key={module.name}
              href="/learn"
              className={
                "flex cursor-pointer flex-col items-center gap-4 rounded-2xl border-2 border-b-4 border-gray-400 px-5 py-8 text-xl font-bold hover:bg-gray-300 hover:bg-opacity-20"
              }
              onClick={() => setModule(module)}
            >
              <ModuleIcon module={module} />
              <div className="text-center">
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
