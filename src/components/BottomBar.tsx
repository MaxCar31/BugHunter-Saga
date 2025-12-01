import Link from "next/link";
import { useBoundStore } from "~/hooks/useBoundStore";

type BottomBarItem = {
  name: Tab;
  href: string;
  icon: JSX.Element;
};

export type Tab = "Aprender" | "Tienda" | "Perfil" | "Clasificaciones";

export const useBottomBarItems = () => {
  const loggedIn = useBoundStore((x) => x.loggedIn);

  const bottomBarItems: BottomBarItem[] = [
    {
      name: "Aprender",
      href: "/learn",
      icon: (
        <svg
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          className="h-[50px] w-[50px]"
        >
          {/* Libro/Terminal exterior con efecto holográfico */}
          <rect
            x="6"
            y="4"
            width="34"
            height="38"
            rx="3"
            fill="url(#bookGradient)"
            stroke="url(#borderGradientBook)"
            strokeWidth="2.5"
          />

          {/* Brillo exterior (efecto glow) */}
          <rect
            x="7"
            y="5"
            width="32"
            height="36"
            rx="2"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="0.5"
            opacity="0.6"
          />

          {/* Pantalla/Contenido interior */}
          <rect
            x="10"
            y="8"
            width="26"
            height="30"
            rx="2"
            fill="#1E1B4B"
          />

          {/* Reflejo de luz holográfico */}
          <ellipse
            cx="16"
            cy="14"
            rx="10"
            ry="8"
            fill="url(#hologramGradient)"
            opacity="0.2"
          />

          {/* Líneas de código estilo Matrix */}
          <g opacity="0.9">
            <line x1="13" y1="13" x2="28" y2="13" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
            </line>
            <line x1="13" y1="17" x2="25" y2="17" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="0.4s" />
            </line>
            <line x1="13" y1="21" x2="32" y2="21" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="0.8s" />
            </line>
            <line x1="13" y1="25" x2="27" y2="25" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="1.2s" />
            </line>
            <line x1="13" y1="29" x2="30" y2="29" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="1.6s" />
            </line>
          </g>

          {/* Símbolo de bug educativo (versión simplificada) */}
          <g transform="translate(30, 32)">
            {/* Cuerpo del bug educativo */}
            <ellipse cx="0" cy="0" rx="3.5" ry="3" fill="#F59E0B" opacity="0.9" />

            {/* Cabeza */}
            <circle cx="0" cy="-2.5" r="2" fill="#F97316" />

            {/* Antenas cortas */}
            <line x1="-0.8" y1="-4" x2="-1.5" y2="-5.5" stroke="#EA580C" strokeWidth="1" strokeLinecap="round" />
            <line x1="0.8" y1="-4" x2="1.5" y2="-5.5" stroke="#EA580C" strokeWidth="1" strokeLinecap="round" />

            {/* Puntos de luz en antenas */}
            <circle cx="-1.5" cy="-5.5" r="0.7" fill="#FBBF24">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="1.5" cy="-5.5" r="0.7" fill="#FBBF24">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" begin="0.75s" />
            </circle>

            {/* Ojos brillantes */}
            <circle cx="-0.7" cy="-2.5" r="0.5" fill="white" />
            <circle cx="0.7" cy="-2.5" r="0.5" fill="white" />
          </g>

          {/* Partículas flotantes (efecto de datos) */}
          <g opacity="0.6">
            <circle cx="15" cy="34" r="1" fill="#8B5CF6">
              <animate attributeName="cy" values="34;30;34" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="20" cy="36" r="0.8" fill="#A78BFA">
              <animate attributeName="cy" values="36;32;36" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <circle cx="25" cy="35" r="1.2" fill="#8B5CF6">
              <animate attributeName="cy" values="35;31;35" dur="2.8s" repeatCount="indefinite" begin="1s" />
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.8s" repeatCount="indefinite" begin="1s" />
            </circle>
          </g>

          {/* Indicador de progreso (barra inferior) */}
          <rect x="10" y="40" width="26" height="3" rx="1.5" fill="#312E81" />
          <rect x="10" y="40" width="16" height="3" rx="1.5" fill="url(#progressGradient)">
            <animate attributeName="width" values="10;20;10" dur="3s" repeatCount="indefinite" />
          </rect>

          {/* Badge "LEARN" tech en esquina */}
          <g transform="translate(34, 5)">
            {/* Sombra del badge */}
            <rect x="0.5" y="0.5" width="9" height="9" rx="1.5" fill="#000000" opacity="0.15" />

            {/* Badge principal */}
            <rect x="0" y="0" width="9" height="9" rx="1.5" fill="url(#learnBadgeGradient)" />

            {/* Borde brillante */}
            <rect x="0" y="0" width="9" height="9" rx="1.5" fill="none" stroke="#7C3AED" strokeWidth="0.5" />

            {/* Icono de libro en miniatura */}
            <rect x="2" y="2.5" width="5" height="4" rx="0.5" fill="white" opacity="0.9" />
            <line x1="2.5" y1="3.5" x2="6.5" y2="3.5" stroke="#7C3AED" strokeWidth="0.5" />
            <line x1="2.5" y1="5" x2="6" y2="5" stroke="#7C3AED" strokeWidth="0.5" />

            {/* Indicador pulsante */}
            <circle cx="8" cy="1" r="1.8" fill="#10B981">
              <animate attributeName="r" values="1.8;2.3;1.8" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="8" cy="1" r="1.1" fill="#34D399" />
          </g>

          {/* Lomo del libro (efecto 3D) */}
          <path
            d="M6 7C6 5.89543 6.89543 5 8 5V41C6.89543 41 6 40.1046 6 39V7Z"
            fill="#312E81"
          />

          {/* Líneas del lomo */}
          <line x1="6" y1="12" x2="8" y2="12" stroke="#4C1D95" strokeWidth="0.5" />
          <line x1="6" y1="18" x2="8" y2="18" stroke="#4C1D95" strokeWidth="0.5" />
          <line x1="6" y1="24" x2="8" y2="24" stroke="#4C1D95" strokeWidth="0.5" />

          {/* Gradientes */}
          <defs>
            {/* Gradiente principal del libro */}
            <linearGradient id="bookGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5B21B6" />
              <stop offset="100%" stopColor="#3B0764" />
            </linearGradient>

            {/* Gradiente del borde */}
            <linearGradient id="borderGradientBook" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>

            {/* Gradiente holográfico */}
            <radialGradient id="hologramGradient">
              <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
            </radialGradient>

            {/* Gradiente del badge LEARN */}
            <linearGradient id="learnBadgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#5B21B6" />
            </linearGradient>

            {/* Gradiente de la barra de progreso */}
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      name: "Tienda",
      href: "/shop",
      icon: (
        <svg
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          className="h-[50px] w-[50px]"
        >
          {/* Pantalla/Monitor exterior con efecto neón */}
          <rect
            x="6"
            y="8"
            width="34"
            height="28"
            rx="3"
            fill="url(#screenGradient)"
            stroke="#06B6D4"
            strokeWidth="2"
          />

          {/* Pantalla interior (efecto de profundidad) */}
          <rect
            x="9"
            y="11"
            width="28"
            height="22"
            rx="2"
            fill="#0F172A"
          />

          {/* Bug en el centro (estilo escaneo) */}
          <g transform="translate(23, 22)">
            {/* Cuerpo del bug (hexágono futurista) */}
            <path
              d="M0 -6L5 -3L5 3L0 6L-5 3L-5 -3Z"
              fill="#EF4444"
              stroke="#DC2626"
              strokeWidth="1"
            />

            {/* Antenas tech */}
            <line x1="-2" y1="-6" x2="-3" y2="-9" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="-6" x2="3" y2="-9" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="-3" cy="-9" r="1" fill="#06B6D4" />
            <circle cx="3" cy="-9" r="1" fill="#06B6D4" />

            {/* Ojos tech brillantes */}
            <circle cx="-1.5" cy="-2" r="1.2" fill="#06B6D4" />
            <circle cx="1.5" cy="-2" r="1.2" fill="#06B6D4" />
          </g>

          {/* Líneas de escaneo horizontales */}
          <line x1="11" y1="16" x2="35" y2="16" stroke="#06B6D4" strokeWidth="0.5" opacity="0.3" />
          <line x1="11" y1="20" x2="35" y2="20" stroke="#06B6D4" strokeWidth="0.5" opacity="0.5" />
          <line x1="11" y1="24" x2="35" y2="24" stroke="#06B6D4" strokeWidth="0.5" opacity="0.3" />
          <line x1="11" y1="28" x2="35" y2="28" stroke="#06B6D4" strokeWidth="0.5" opacity="0.5" />

          {/* Retícula de targeting alrededor del bug */}
          <circle cx="23" cy="22" r="10" stroke="#10B981" strokeWidth="1" strokeDasharray="2 2" fill="none" opacity="0.4" />
          <circle cx="23" cy="22" r="7" stroke="#10B981" strokeWidth="0.8" fill="none" opacity="0.6" />

          {/* Esquinas de targeting */}
          <path d="M16 15L16 17L14 17" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30 15L30 17L32 17" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 29L16 27L14 27" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30 29L30 27L32 27" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Badge "QA" futurista en esquina superior derecha */}
          <g transform="translate(35, 6)">
            <rect x="0" y="0" width="8" height="8" rx="1" fill="#0EA5E9" opacity="0.9" />
            <text x="4" y="6" fontSize="3.5" fontWeight="bold" fill="white" textAnchor="middle">QA</text>
            <circle cx="7" cy="1" r="1.5" fill="#10B981" opacity="0.8">
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Base del monitor (stand) */}
          <rect x="19" y="36" width="8" height="3" rx="1" fill="#475569" />
          <rect x="15" y="39" width="16" height="2" rx="1" fill="#64748B" />

          {/* Gradiente para la pantalla */}
          <defs>
            <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      name: "Perfil",
      href: loggedIn ? "/profile" : "/learn?sign-up",
      icon: (
        <svg
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          className="h-[50px] w-[50px]"
        >
          {/* Marco exterior tipo "badge tech" */}
          <rect
            x="4"
            y="4"
            width="38"
            height="38"
            rx="4"
            fill="url(#profileBadgeGradient)"
            stroke="url(#profileBorderGradient)"
            strokeWidth="2.5"
          />

          {/* Brillo exterior (efecto glow) */}
          <rect
            x="5"
            y="5"
            width="36"
            height="36"
            rx="3"
            fill="none"
            stroke="#34D399"
            strokeWidth="0.5"
            opacity="0.6"
          />

          {/* Fondo interior del badge */}
          <rect
            x="7"
            y="7"
            width="32"
            height="32"
            rx="2"
            fill="#0F172A"
          />

          {/* Avatar - Cabeza más grande y definida */}
          <circle
            cx="23"
            cy="16"
            r="8"
            fill="url(#avatarHeadGradient)"
            stroke="#10B981"
            strokeWidth="1.8"
          />

          {/* Brillo en cabeza (efecto 3D) */}
          <ellipse
            cx="19.5"
            cy="13.5"
            rx="3.5"
            ry="2.5"
            fill="white"
            opacity="0.25"
          />

          {/* Ojos simples */}
          <circle cx="20" cy="16" r="1.2" fill="#0F172A" />
          <circle cx="26" cy="16" r="1.2" fill="#0F172A" />

          {/* Cuerpo/Torso - Forma trapezoidal simple */}
          <path
            d="M13 28 L16 25 L23 25 L30 25 L33 28 L33 35 L13 35 Z"
            fill="url(#avatarBodyGradient)"
            stroke="#10B981"
            strokeWidth="1.8"
          />

          {/* Cuello - Conexión cabeza-cuerpo */}
          <rect
            x="20"
            y="23"
            width="6"
            height="3"
            fill="url(#avatarHeadGradient)"
            stroke="#10B981"
            strokeWidth="1"
          />

          {/* Indicador de estado "online" */}
          <circle cx="31" cy="24" r="3.5" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />
          <circle cx="31" cy="24" r="2.5" fill="#10B981" />
          <circle cx="31" cy="24" r="1.2" fill="#34D399" />

          {/* Esquinas decorativas (marco tech) */}
          <path d="M9 9 L9 12 L12 12" stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
          <path d="M37 9 L37 12 L34 12" stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
          <path d="M9 37 L9 34 L12 34" stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
          <path d="M37 37 L37 34 L34 34" stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />

          {/* Gradientes */}
          <defs>
            {/* Gradiente del marco del badge */}
            <linearGradient id="profileBadgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#064E3B" />
              <stop offset="100%" stopColor="#022C22" />
            </linearGradient>

            {/* Gradiente del borde */}
            <linearGradient id="profileBorderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>

            {/* Gradiente de la cabeza */}
            <linearGradient id="avatarHeadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            {/* Gradiente del cuerpo */}
            <linearGradient id="avatarBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
  ];

  // if (loggedIn) {
  //   bottomBarItems.splice(1, 0, {
  //     name: "Clasificaciones",
  //     href: "/leaderboard",
  //     icon: (
  //       <svg
  //         width="46"
  //         height="46"
  //         viewBox="0 0 46 46"
  //         fill="none"
  //         className="h-[50px] w-[50px]"
  //       >
  //         {/* Marco exterior con efecto de campeonato */}
  //         <rect
  //           x="4"
  //           y="4"
  //           width="38"
  //           height="38"
  //           rx="4"
  //           fill="url(#leaderboardBadgeGradient)"
  //           stroke="url(#leaderboardBorderGradient)"
  //           strokeWidth="2.5"
  //         />

  //         {/* Brillo exterior */}
  //         <rect
  //           x="5"
  //           y="5"
  //           width="36"
  //           height="36"
  //           rx="3"
  //           fill="none"
  //           stroke="#FCD34D"
  //           strokeWidth="0.5"
  //           opacity="0.6"
  //         />

  //         {/* Fondo interior */}
  //         <rect
  //           x="7"
  //           y="7"
  //           width="32"
  //           height="32"
  //           rx="2"
  //           fill="#1E1B4B"
  //         />

  //         {/* Podio - Base rectangular futurista */}
  //         <g transform="translate(23, 28)">
  //           {/* Posición 2 (izquierda) */}
  //           <rect x="-14" y="2" width="7" height="10" rx="1" fill="url(#silverGradient)" stroke="#94A3B8" strokeWidth="1" />
  //           <text x="-10.5" y="8" fontSize="4" fontWeight="bold" fill="#1E293B" textAnchor="middle">2</text>

  //           {/* Posición 1 (centro - más alto) */}
  //           <rect x="-3.5" y="-4" width="7" height="16" rx="1" fill="url(#goldGradient)" stroke="#F59E0B" strokeWidth="1.2" />
  //           <text x="0" y="5" fontSize="4" fontWeight="bold" fill="#1E293B" textAnchor="middle">1</text>

  //           {/* Posición 3 (derecha) */}
  //           <rect x="7" y="5" width="7" height="7" rx="1" fill="url(#bronzeGradient)" stroke="#B45309" strokeWidth="1" />
  //           <text x="10.5" y="10" fontSize="4" fontWeight="bold" fill="#1E293B" textAnchor="middle">3</text>
  //         </g>

  //         {/* Corona/Trofeo sobre el primer lugar */}
  //         <g transform="translate(23, 13)">
  //           {/* Base del trofeo */}
  //           <path d="M-4 0 L-2 -3 L2 -3 L4 0 Z" fill="#FCD34D" />

  //           {/* Copa */}
  //           <ellipse cx="0" cy="-5" rx="5" ry="3" fill="url(#trophyGradient)" stroke="#F59E0B" strokeWidth="1" />

  //           {/* Brillo en copa */}
  //           <ellipse cx="-2" cy="-6" rx="2" ry="1" fill="#FEF3C7" opacity="0.6" />

  //           {/* Estrellas decorativas */}
  //           <circle cx="-6" cy="-6" r="1" fill="#FCD34D">
  //             <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
  //           </circle>
  //           <circle cx="6" cy="-6" r="1" fill="#FCD34D">
  //             <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="1s" />
  //           </circle>
  //         </g>

  //         {/* Líneas de ranking en el fondo */}
  //         <g opacity="0.3">
  //           <line x1="10" y1="15" x2="17" y2="15" stroke="#FCD34D" strokeWidth="0.8" />
  //           <line x1="29" y1="15" x2="36" y2="15" stroke="#FCD34D" strokeWidth="0.8" />
  //           <line x1="10" y1="19" x2="17" y2="19" stroke="#FCD34D" strokeWidth="0.8" />
  //           <line x1="29" y1="19" x2="36" y2="19" stroke="#FCD34D" strokeWidth="0.8" />
  //         </g>

  //         {/* Badge "TOP" en esquina */}
  //         <g transform="translate(34, 6)">
  //           <rect x="0" y="0" width="8" height="8" rx="1" fill="#F59E0B" opacity="0.9" />
  //           <text x="4" y="6" fontSize="3" fontWeight="bold" fill="white" textAnchor="middle">TOP</text>
  //           <circle cx="7" cy="1" r="1.5" fill="#10B981">
  //             <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
  //           </circle>
  //         </g>

  //         {/* Esquinas decorativas */}
  //         <path d="M9 9 L9 12 L12 12" stroke="#FCD34D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
  //         <path d="M37 9 L37 12 L34 12" stroke="#FCD34D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
  //         <path d="M9 37 L9 34 L12 34" stroke="#FCD34D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
  //         <path d="M37 37 L37 34 L34 34" stroke="#FCD34D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />

  //         {/* Gradientes */}
  //         <defs>
  //           {/* Marco del badge */}
  //           <linearGradient id="leaderboardBadgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
  //             <stop offset="0%" stopColor="#78350F" />
  //             <stop offset="100%" stopColor="#451A03" />
  //           </linearGradient>

  //           {/* Borde */}
  //           <linearGradient id="leaderboardBorderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
  //             <stop offset="0%" stopColor="#F59E0B" />
  //             <stop offset="50%" stopColor="#FCD34D" />
  //             <stop offset="100%" stopColor="#F59E0B" />
  //           </linearGradient>

  //           {/* Oro (1er lugar) */}
  //           <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
  //             <stop offset="0%" stopColor="#FCD34D" />
  //             <stop offset="100%" stopColor="#F59E0B" />
  //           </linearGradient>

  //           {/* Plata (2do lugar) */}
  //           <linearGradient id="silverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
  //             <stop offset="0%" stopColor="#E2E8F0" />
  //             <stop offset="100%" stopColor="#94A3B8" />
  //           </linearGradient>

  //           {/* Bronce (3er lugar) */}
  //           <linearGradient id="bronzeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
  //             <stop offset="0%" stopColor="#FDE68A" />
  //             <stop offset="100%" stopColor="#D97706" />
  //           </linearGradient>

  //           {/* Trofeo */}
  //           <linearGradient id="trophyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
  //             <stop offset="0%" stopColor="#FEF3C7" />
  //             <stop offset="100%" stopColor="#FCD34D" />
  //           </linearGradient>
  //         </defs>
  //       </svg>
  //     ),
  //   });
  // }

  return bottomBarItems;
};

export const BottomBar = ({ selectedTab }: { selectedTab: Tab | null }) => {
  const bottomBarItems = useBottomBarItems();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t-2 border-[#e5e5e5] bg-white md:hidden">
      <ul className="flex h-[88px]">
        {bottomBarItems.map((item) => {
          return (
            <li
              key={item.href}
              className="flex flex-1 items-center justify-center"
            >
              <Link
                href={item.href}
                className={
                  item.name === selectedTab
                    ? "rounded-xl border-2 border-[#84d8ff] bg-[#ddf4ff] px-2 py-1"
                    : "px-2 py-1"
                }
              >
                {item.icon}
                <span className="sr-only">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
