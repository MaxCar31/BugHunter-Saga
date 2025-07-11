import Link from "next/link";
import type { ComponentProps } from "react";
import React, { useState } from "react";
import type { Tab } from "./BottomBar";
import { useBottomBarItems } from "./BottomBar";
import type { LoginScreenState } from "./LoginScreen";
import { LoginScreen } from "./LoginScreen";
import { GlobeIconSvg, PodcastIconSvg } from "./Svgs";
import { useBoundStore } from "~/hooks/useBoundStore";
import Image from "next/image";

const LeftBarMoreMenuSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" {...props}>
      <circle
        cx="23"
        cy="23"
        r="19"
        fill="#CE82FF"
        stroke="#CE82FF"
        strokeWidth="2"
      />
      <circle cx="15" cy="23" r="2" fill="white" />
      <circle cx="23" cy="23" r="2" fill="white" />
      <circle cx="31" cy="23" r="2" fill="white" />
    </svg>
  );
};

export const LeftBar = ({ selectedTab }: { selectedTab: Tab | null }) => {
  const loggedIn = useBoundStore((x) => x.loggedIn);
  const logOut = useBoundStore((x) => x.logOut);

  const [moreMenuShown, setMoreMenuShown] = useState(false);
  const [loginScreenState, setLoginScreenState] =
    useState<LoginScreenState>("HIDDEN");

  const bottomBarItems = useBottomBarItems();

  return (
    <>
      <nav className="fixed bottom-0 left-0 top-0 hidden flex-col gap-5 border-r-2 border-[#e5e5e5] bg-white p-3 md:flex lg:w-64 lg:p-5">
    <Link
      href="/learn"
      className="ml-2 hidden lg:block"
    >
      <Image
        src="/Logotipo.svg"
        alt="BugHunter Saga"
        width={160}
        height={60}
        className="text-[#58cc02]"
      />
    </Link>
        <ul className="flex flex-col items-stretch gap-3">
          {bottomBarItems.map((item) => {
            return (
              <li key={item.href} className="flex flex-1">
                {item.name === selectedTab ? (
                  <Link
                    href={item.href}
                    className="flex grow items-center gap-3 rounded-xl border-2 border-[#84d8ff] bg-[#ddf4ff] px-2 py-1 text-sm font-bold uppercase text-blue-400"
                  >
                    {item.icon}{" "}
                    <span className="sr-only lg:not-sr-only">{item.name}</span>
                  </Link>
                ) : (
                  <Link
                    href={item.href}
                    className="flex grow items-center gap-3 rounded-xl px-2 py-1 text-sm font-bold uppercase text-gray-400 hover:bg-gray-100"
                  >
                    {item.icon}{" "}
                    <span className="sr-only lg:not-sr-only">{item.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
          {/* <div
            className="relative flex grow cursor-default items-center gap-3 rounded-xl px-2 py-1 font-bold uppercase text-gray-400 hover:bg-gray-100"
            onClick={() => setMoreMenuShown((x) => !x)}
            onMouseEnter={() => setMoreMenuShown(true)}
            onMouseLeave={() => setMoreMenuShown(false)}
            role="button"
            tabIndex={0}
          >
            <LeftBarMoreMenuSvg />{" "}
            <span className="hidden text-sm lg:inline">Más</span>
            <div
              className={[
                "absolute left-full top-[-10px] min-w-[300px] rounded-2xl border-2 border-gray-300 bg-white text-left text-gray-400",
                moreMenuShown ? "" : "hidden",
              ].join(" ")}
            >
              <div className="flex flex-col py-2">
                <Link
                  className="flex items-center gap-4 px-5 py-2 text-left uppercase hover:bg-gray-100"
                  href="https://schools.duolingo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GlobeIconSvg className="h-10 w-10" />
                  Escuelas QA
                </Link>
                <Link
                  className="flex items-center gap-4 px-5 py-2 text-left uppercase hover:bg-gray-100"
                  href="https://podcast.bughuntersaga.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PodcastIconSvg className="h-10 w-10" />
                  Podcast QA
                </Link>
              </div>
              <div className="flex flex-col border-t-2 border-gray-300 py-2">
                {!loggedIn && (
                  <button
                    className="px-5 py-2 text-left uppercase hover:bg-gray-100"
                    onClick={() => setLoginScreenState("SIGNUP")}
                  >
                    Crear perfil
                  </button>
                )}
                <Link
                  className="px-5 py-2 text-left uppercase hover:bg-gray-100"
                  href={loggedIn ? "/settings/account" : "/settings/sound"}
                >
                  Configuración
                </Link>
                <Link
                  className="px-5 py-2 text-left uppercase hover:bg-gray-100"
                  href="https://support.bughuntersaga.com/hc/en-us"
                >
                  Help
                </Link>
                {!loggedIn && (
                  <button
                    className="px-5 py-2 text-left uppercase hover:bg-gray-100"
                    onClick={() => setLoginScreenState("LOGIN")}
                  >
                    Sign in
                  </button>
                )}
                {loggedIn && (
                  <button
                    className="px-5 py-2 text-left uppercase hover:bg-gray-100"
                    onClick={logOut}
                  >
                    Sign out
                  </button>
                )}
              </div>
            </div>
          </div> */}
        </ul>
      </nav>
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </>
  );
};
