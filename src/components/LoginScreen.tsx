import Link from "next/link";
import { CloseSvg } from "./Svgs";
import React, { useEffect, useRef, useState } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import { useRouter } from "next/router";
import { apiBase } from "~/utils/config";

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

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const emailOrUsernameInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (loginScreenState !== "HIDDEN" && loggedIn) {
      setLoginScreenState("HIDDEN");
    }
    setErrorMessage("");
  }, [loginScreenState, loggedIn, setLoginScreenState]);

  const handleSubmit = async () => {
    setErrorMessage("");
    setIsLoading(true);

    let endpoint = "";
    let body: any = {};

    try {
      if (loginScreenState === "LOGIN") {
        endpoint = "/api/auth/login";
        const emailOrUsername = emailOrUsernameInputRef.current?.value.trim() || "";
        const password = passwordInputRef.current?.value.trim() || "";
        if (!emailOrUsername || !password) {
          setErrorMessage("Por favor ingresa email/usuario y contraseña.");
          setIsLoading(false);
          return;
        }
        body = { emailOrUsername, password };
      } else {
        endpoint = "/api/auth/register";
        const name = nameInputRef.current?.value.trim() || "";
        const username = usernameInputRef.current?.value.trim() || "";
        const email = emailInputRef.current?.value.trim() || "";
        const password = passwordInputRef.current?.value.trim() || "";
        if (!username || !name || !email || !password) {
          setErrorMessage("Por favor completa todos los campos.");
          setIsLoading(false);
          return;
        }
        body = { username, name, email, password };
      }

      const res = await fetch(`${apiBase}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = (await res.json()) as {
          token: string;
          user: { username: string; name: string; email: string };
        };

        localStorage.setItem("bh_token", data.token);
        setUsername(data.user.username);
        setName(data.user.name);
        logIn();
        setIsLoading(false);
        void router.push("/learn");
        return;
      } else if (res.status === 401) {
        setErrorMessage("Email/usuario o contraseña incorrectos.");
      } else if (res.status === 400) {
        setErrorMessage("Email o usuario ya existe, o los datos son inválidos.");
      } else {
        setErrorMessage("Error en el servidor. Intenta de nuevo.");
      }
    } catch (e) {
      console.error("Auth error:", e);
      setErrorMessage("Error de conexión. ¿El backend está corriendo en el puerto 8080?");
    }

    setIsLoading(false);
  };

  return (
    <article
      className={[
        "fixed inset-0 z-30 flex flex-col bg-white p-7 transition duration-300",
        loginScreenState === "HIDDEN" ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
      aria-hidden={!loginScreenState}
    >
      <header className="flex flex-row-reverse justify-between sm:flex-row">
        <button className="flex text-gray-400" onClick={() => setLoginScreenState("HIDDEN")}>
          <CloseSvg />
          <span className="sr-only">Cerrar</span>
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
            {loginScreenState === "LOGIN" ? "Iniciar sesión" : "Crear cuenta"}
          </h2>

          {errorMessage && (
            <div className="rounded-xl border-2 border-red-300 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col gap-2 text-black">
            {loginScreenState === "SIGNUP" ? (
              <>
                <input
                  className="rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
                  placeholder="Nombre"
                  ref={nameInputRef}
                />
                <input
                  className="rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
                  placeholder="Username"
                  ref={usernameInputRef}
                />
                <input
                  className="rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
                  placeholder="Email"
                  type="email"
                  ref={emailInputRef}
                />
                <input
                  className="rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
                  placeholder="Contraseña"
                  type="password"
                  ref={passwordInputRef}
                />
              </>
            ) : (
              <>
                <input
                  className="rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
                  placeholder="Email o username"
                  ref={emailOrUsernameInputRef}
                />
                <div className="relative flex grow">
                  <input
                    className="grow rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
                    placeholder="Contraseña"
                    type="password"
                    ref={passwordInputRef}
                  />
                  <div className="absolute bottom-0 right-0 top-0 flex items-center justify-center pr-5">
                    <Link
                      className="font-bold uppercase text-gray-400 hover:brightness-75"
                      href="/forgot-password"
                    >
                      ¿Olvidaste?
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            className={`rounded-2xl border-b-4 border-[#d18a2a] bg-[#f2a445] py-3 font-bold uppercase text-white transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"
            }`}
            onClick={() => handleSubmit().catch(() => {})}
            disabled={isLoading}
          >
            {isLoading
              ? "Cargando..."
              : loginScreenState === "LOGIN"
              ? "Iniciar sesión"
              : "Crear cuenta"}
          </button>
          <p className="text-center text-xs leading-5 text-gray-400">
            Al iniciar sesión en BugHunter Saga, aceptas nuestros{" "}
            <Link
              className="font-bold"
              href="https://www.duolingo.com/terms?wantsPlainInfo=1"
            >
              Términos
            </Link>{" "}
            y{" "}
            <Link
              className="font-bold"
              href="https://www.duolingo.com/privacy?wantsPlainInfo=1"
            >
              Política de Privacidad
            </Link>
            .
          </p>
          <p className="text-center text-xs leading-5 text-gray-400">
            Este sitio está protegido por reCAPTCHA Enterprise y la{" "}
            <Link
              className="font-bold"
              href="https://policies.google.com/privacy"
            >
              Política de Privacidad de Google
            </Link>{" "}
            y{" "}
            <Link
              className="font-bold"
              href="https://policies.google.com/terms"
            >
              Términos de Servicio
            </Link>{" "}
            aplican.
          </p>
          <p className="block text-center sm:hidden">
            <span className="text-sm font-bold text-gray-700">
              {loginScreenState === "LOGIN"
                ? "¿No tienes cuenta?"
                : "¿Ya tienes cuenta?"}
            </span>{" "}
            <button
              className="text-sm font-bold uppercase text-[#f2a445]"
              onClick={() =>
                setLoginScreenState((x) => (x === "LOGIN" ? "SIGNUP" : "LOGIN"))
              }
            >
              {loginScreenState === "LOGIN" ? "Regístrate" : "Inicia sesión"}
            </button>
          </p>
        </div>
      </div>
    </article>
  );
};
