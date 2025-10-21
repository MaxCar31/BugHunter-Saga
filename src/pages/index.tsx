import { type NextPage } from "next";
import React from "react";
import { ModuleHeader } from "~/components/ModuleHeader";
import { useLoginScreen, LoginScreen } from "~/components/LoginScreen";
import _bgSnow from "../../public/bg-snow.svg";
import type { StaticImageData } from "next/image";
import Image from "next/image";

const bgSnow = _bgSnow as StaticImageData;

const Home: NextPage = () => {
  const { loginScreenState, setLoginScreenState } = useLoginScreen();
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-[#235390] text-white"
      style={{ backgroundImage: `url(${bgSnow.src})` }}
    >
      <ModuleHeader />
      <div className="flex w-full flex-col items-center justify-center gap-3 px-4 py-16 md:flex-row md:gap-12">
            <Image
                src="/Logo.svg"
                alt="BugHunter Saga"
                width={350}
                height={60}
              />
        <div>
          <p className=" max-w-[600px] text-center text-3xl font-bold md:mb-12">
            ¡La forma gratuita, divertida y efectiva de aprender técnicas de testing!
          </p>
          <div className="mx-auto mt-4 flex w-fit flex-col items-center gap-3">

            <button
              className="w-full rounded-2xl border-b-4 border-[#f29e3b] bg-[#f29e3b] px-10 py-3 text-center font-bold uppercase transition md:min-w-[320px]"
              onClick={() => setLoginScreenState("LOGIN")}
            >
              Comenzar
            </button>
          </div>
        </div>
      </div>
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </main>
  );
};

export default Home;
