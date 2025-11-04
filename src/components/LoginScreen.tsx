import Link from "next/link";
import { CloseSvg } from "./Svgs";
import React, { useEffect, useRef, useState } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import { useRouter } from "next/router";

export type LoginScreenState = "HIDDEN" | "LOGIN" | "SIGNUP";

export const useLoginScreen = () => {
  const router = useRouter();
  const loggedIn = useBoundStore((x) => x.loggedIn);
  const queryState: LoginScreenState = (() => {
    if (loggedIn) return "HIDDEN";
    if ("login" in router.query) return "LOGIN";
    if ("sign-up" in router.query) return "SIGNUP";
    return "HIDDEN";
  })();
  const [loginScreenState, setLoginScreenState] = useState(queryState);
  useEffect(() => setLoginScreenState(queryState), [queryState]);
  return { loginScreenState, setLoginScreenState };
};

export const LoginScreen = ({
  loginScreenState,
  setLoginScreenState,
}: {
  loginScreenState: LoginScreenState;
  setLoginScreenState: React.Dispatch<React.SetStateAction<LoginScreenState>>;
}) => {
  const router = useRouter();
  const loggedIn = useBoundStore((x) => x.loggedIn);
  const logIn = useBoundStore((x) => x.logIn);
  const setUsername = useBoundStore((x) => x.setUsername);
  const setName = useBoundStore((x) => x.setName);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [ageTooltipShown, setAgeTooltipShown] = useState(false);

  const nameInputRef = useRef<null | HTMLInputElement>(null);
  const emailInputRef = useRef<null | HTMLInputElement>(null);
  const passwordInputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (loginScreenState !== "HIDDEN" && loggedIn) {
      setLoginScreenState("HIDDEN");
    }
  }, [loginScreenState, loggedIn, setLoginScreenState]);

  const logInAndSetUserProperties = async () => {
    // Limpiar error previo
    setErrorMessage("");
    setIsLoading(true);

    const emailOrUsername = emailInputRef.current?.value.trim() || "";
    const password = passwordInputRef.current?.value.trim() || "";
    const name =
      nameInputRef.current?.value.trim() || Math.random().toString().slice(2);

    // Validar campos requeridos
    if (!emailOrUsername || !password) {
      setErrorMessage("Por favor completa email/usuario y contraseña");
      setIsLoading(false);
      return;
    }

    try {
      const apiBase = (process.env.NEXT_PUBLIC_API_URL as string) || "http://localhost:8081";
      const endpoint = loginScreenState === "SIGNUP" ? "/api/auth/register" : "/api/auth/login";
      
      const res = await fetch(`${apiBase}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      if (res.ok) {
        const data = (await res.json()) as { token: string; user: { username: string; name: string; email: string } };
        const user = data.user || {};
        const username = user.username || emailOrUsername.replace(/ +/g, "-");
        const displayName = user.name || name;
        // guardar token en localStorage para llamadas futuras
        if (data.token) {
          try {
            localStorage.setItem("bh_token", data.token);
          } catch (e) {
            // ignore storage errors
          }
        }
        setUsername(username);
        setName(displayName);
        logIn();
        setIsLoading(false);
        void router.push("/learn");
        return;
      } else if (res.status === 401) {
        setErrorMessage("Email/usuario o contraseña incorrectos");
      } else if (res.status === 400) {
        setErrorMessage("Email o usuario ya existe");
      } else {
        setErrorMessage("Error en el servidor. Intenta de nuevo.");
      }
    } catch (e) {
      setErrorMessage("Error de conexión. Verifica tu conexión de internet.");
      console.error("Auth error:", e);
    }

    setIsLoading(false);
  };

  return (
    <article
      className={[
        "fixed inset-0 z-30 flex flex-col bg-white p-7 transition duration-300",
        loginScreenState === "HIDDEN"
          ? "pointer-events-none opacity-0"
          : "opacity-100",
      ].join(" ")}
      aria-hidden={!loginScreenState}
    >
      <header className="flex flex-row-reverse justify-between sm:flex-row">
        <button
          className="flex text-gray-400"
          onClick={() => setLoginScreenState("HIDDEN")}
        >
          <CloseSvg />
          <span className="sr-only">Close</span>
        </button>
        <button
          className="hidden rounded-2xl border-2 border-b-4 border-gray-200 px-4 py-3 text-sm font-bold uppercase text-[#f2a445] transition hover:bg-gray-50 hover:brightness-90 sm:block"
          onClick={() =>
            setLoginScreenState((x) => (x === "LOGIN" ? "SIGNUP" : "LOGIN"))
          }
        >
          {loginScreenState === "LOGIN" ? "Sign up" : "Login"}
        </button>
      </header>
      <div className="flex grow items-center justify-center">
        <div className="flex w-full flex-col gap-5 sm:w-96">
          <h2 className="text-center text-2xl font-bold text-gray-800">
            {loginScreenState === "LOGIN" ? "Log in" : "Create your profile"}
          </h2>
          {errorMessage && (
            <div className="rounded-xl border-2 border-red-300 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
              {errorMessage}
            </div>
          )}
          <div className="flex flex-col gap-2 text-black">
            {loginScreenState === "SIGNUP" && (
              <>
                <div className="relative flex grow">
                  <input
                    className="grow rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
                    placeholder="Age (optional)"
                  />
                  <div className="absolute bottom-0 right-0 top-0 flex items-center justify-center pr-4">
                    <div
                      className="relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-gray-200 text-gray-400"
                      onMouseEnter={() => setAgeTooltipShown(true)}
                      onMouseLeave={() => setAgeTooltipShown(false)}
                      onClick={() => setAgeTooltipShown((x) => !x)}
                      role="button"
                      tabIndex={0}
                      aria-label="Why do you need an age?"
                    >
                      ?
                      {ageTooltipShown && (
                        <div className="absolute -right-5 top-full z-10 w-72 rounded-2xl border-2 border-gray-200 bg-white p-4 text-center text-xs leading-5 text-gray-800">
                          Providing your age ensures you get the right BugHunter Saga
                          experience. For more details, please visit our{" "}
                          <Link
                            href="https://www.duolingo.com/privacy"
                            className="text-blue-700"
                          >
                            Privacy Policy
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <input
                  className="grow rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
                  placeholder="Name (optional)"
                  ref={nameInputRef}
                />
              </>
            )}
            <input
              className="grow rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
              placeholder={
                loginScreenState === "LOGIN"
                  ? "Email or username (optional)"
                  : "Email (optional)"
              }
              ref={emailInputRef}
            />
            <div className="relative flex grow">
              <input
                className="grow rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
                placeholder="Password (optional)"
                type="password"
                ref={passwordInputRef}
              />
              {loginScreenState === "LOGIN" && (
                <div className="absolute bottom-0 right-0 top-0 flex items-center justify-center pr-5">
                  <Link
                    className="font-bold uppercase text-gray-400 hover:brightness-75"
                    href="/forgot-password"
                  >
                    Forgot?
                  </Link>
                </div>
              )}
            </div>
          </div>
          <button
            className={`rounded-2xl border-b-4 border-[#d18a2a] bg-[#f2a445] py-3 font-bold uppercase text-white transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"
            }`}
            onClick={() => {
              logInAndSetUserProperties().catch(() => {
                // silently handle errors
              });
            }}
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : loginScreenState === "LOGIN" ? "Log in" : "Create account"}
          </button>
          <p className="text-center text-xs leading-5 text-gray-400">
            By signing in to BugHunter Saga, you agree to our{" "}
            <Link
              className="font-bold"
              href="https://www.duolingo.com/terms?wantsPlainInfo=1"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              className="font-bold"
              href="https://www.duolingo.com/privacy?wantsPlainInfo=1"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <p className="text-center text-xs leading-5 text-gray-400">
            This site is protected by reCAPTCHA Enterprise and the Google{" "}
            <Link
              className="font-bold"
              href="https://policies.google.com/privacy"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              className="font-bold"
              href="https://policies.google.com/terms"
            >
              Terms of Service
            </Link>{" "}
            apply.
          </p>
          <p className="block text-center sm:hidden">
            <span className="text-sm font-bold text-gray-700">
              {loginScreenState === "LOGIN"
                ? "Don't have an account?"
                : "Have an account?"}
            </span>{" "}
            <button
              className="text-sm font-bold uppercase text-[#f2a445]"
              onClick={() =>
                setLoginScreenState((x) => (x === "LOGIN" ? "SIGNUP" : "LOGIN"))
              }
            >
              {loginScreenState === "LOGIN" ? "sign up" : "log in"}
            </button>
          </p>
        </div>
      </div>
    </article>
  );
};
