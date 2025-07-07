import Link from "next/link";
import { ModuleDropDown } from "./ModuleDropDown";
import Image from "next/image";

export const ModuleHeader = () => {
  return (
    <header className="fixed left-0 right-0 top-0 mx-auto flex min-h-[70px] max-w-5xl items-center justify-between bg-[#235390] px-10 font-bold text-white">
      <Link href="/">
             <Image
              src="/Logo2.svg"
              alt="BugHunter Saga"
              width={300}
              height={60}
              className="text-[#58cc02]"
            />
      </Link>
      <ModuleDropDown />
    </header>
  );
};
