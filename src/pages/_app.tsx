import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import { useEffect, useState } from "react";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>BugHunter Saga – Plataforma Gamificada de Pruebas de Software</title>
        <meta
          name="description"
          content="BugHunter Saga es una plataforma gamificada para aprender técnicas de pruebas de software como Partición de Equivalencia, Tablas de Decisión y Pruebas de Sentencia."
        />
        <meta name="keywords" content="gamificación, pruebas de software, ingeniería de software, tablas de decisión, calidad de software, TIC EPN" />
        <meta name="author" content="Max Mateo Carrión Chida" />
        <link rel="icon" href="/logo.svg" />
        <meta name="theme-color" content="#1D3557" />
        <link rel="manifest" href="/app.webmanifest" />
      </Head>
      {mounted ? <Component {...pageProps} /> : null}
    </>
  );
};

export default MyApp;
