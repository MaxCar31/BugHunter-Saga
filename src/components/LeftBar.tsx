import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import type { Tab } from "./BottomBar";
import { useBottomBarItems } from "./BottomBar";
import type { LoginScreenState } from "./LoginScreen";
import { LoginScreen } from "./LoginScreen";
import { useBoundStore } from "~/hooks/useBoundStore";
import Image from "next/image";

export const LeftBar = ({ selectedTab }: { selectedTab: Tab | null }) => {
  const router = useRouter();
  const loggedIn = useBoundStore((x) => x.loggedIn);
  const logOut = useBoundStore((x) => x.logOut);

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
          {loggedIn && (
            <button
              className="flex items-center gap-3 rounded-xl px-2 py-1 font-bold uppercase text-red-600 hover:bg-red-50"
              onClick={() => {
                logOut();
                localStorage.removeItem("bh_token");
                void router.push("/?login");
              }}
            >
              <span className="hidden lg:inline">Cerrar sesión</span>
              <span className="lg:hidden">🚪</span>
            </button>
          )}
        </ul>
      </nav>
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </>
  );
};
