export const GoldenTrophySvg = () => {
  return (
    <svg width="42" height="38" viewBox="0 0 105 89" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Degradado dorado para el robot */}
        <linearGradient id="robotGold" x1="52.5" y1="20" x2="52.5" y2="75">
          <stop offset="0%" stopColor="#FFF500" />
          <stop offset="50%" stopColor="#FFD600" />
          <stop offset="100%" stopColor="#FFC800" />
        </linearGradient>

        {/* Brillo metálico dorado */}
        <radialGradient id="robotGoldShine" cx="45" cy="35" r="15">
          <stop offset="0%" stopColor="#FFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFE700" stopOpacity="0" />
        </radialGradient>

        {/* Sombra suave */}
        <filter id="robotGoldShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Resplandor exterior (aura dorada) */}
      <circle cx="52.5" cy="47" r="42" fill="#FFE700" opacity="0.2" />
      <circle cx="52.5" cy="47" r="35" fill="#FFD600" opacity="0.3" />

      {/* Sombra base 3D */}
      <ellipse cx="53" cy="82" rx="22" ry="5" fill="#000" opacity="0.25" />

      {/* Cabeza del robot (rectangular con bordes redondeados) */}
      <rect x="35" y="20" width="35" height="30" rx="5" fill="url(#robotGold)" stroke="#CD7900" strokeWidth="3" filter="url(#robotGoldShadow)" />

      {/* Antena central con estrella */}
      <line x1="52.5" y1="20" x2="52.5" y2="12" stroke="#CD7900" strokeWidth="4" strokeLinecap="round" />
      <path d="M52.5 5L54.5 9L59 9.8L55.7 13L56.5 17.5L52.5 15.3L48.5 17.5L49.3 13L46 9.8L50.5 9L52.5 5Z" fill="#FFF500" stroke="#CD7900" strokeWidth="1.5" />

      {/* Ojos del robot (pantalla estilo LED dorado) */}
      <rect x="40" y="28" width="9" height="9" rx="2" fill="#1E293B" />
      <rect x="56" y="28" width="9" height="9" rx="2" fill="#1E293B" />
      <circle cx="44.5" cy="32.5" r="3" fill="#FFD600" />
      <circle cx="60.5" cy="32.5" r="3" fill="#FFD600" />
      {/* Brillo en los ojos */}
      <circle cx="45.5" cy="31.5" r="1.2" fill="#FFF" opacity="0.95" />
      <circle cx="61.5" cy="31.5" r="1.2" fill="#FFF" opacity="0.95" />

      {/* Boca sonriente (línea dorada brillante) */}
      <path d="M42 42 Q52.5 47 63 42" stroke="#FFD600" strokeWidth="3.5" strokeLinecap="round" fill="none" />

      {/* Brillo en la cabeza */}
      <ellipse cx="45" cy="28" rx="6" ry="8" fill="url(#robotGoldShine)" />

      {/* Cuerpo del robot (rectángulo más grande) */}
      <rect x="32" y="53" width="41" height="25" rx="5" fill="url(#robotGold)" stroke="#CD7900" strokeWidth="3" filter="url(#robotGoldShadow)" />

      {/* Panel central del cuerpo (escudo con checkmark) */}
      <path
        d="M52.5 57L40 62V70C40 77 45 82 52.5 86C60 82 65 77 65 70V62L52.5 57Z"
        fill="#FFF1C0"
        stroke="#CD7900"
        strokeWidth="2"
      />

      {/* Checkmark gigante verde (TESTS PASSED) */}
      <circle cx="52.5" cy="71" r="11" fill="#58CC02" />
      <circle cx="52.5" cy="71" r="10" fill="#46A302" />
      <path
        d="M46 71L50 75L59 66"
        stroke="#FFF"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Brazos del robot (líneas con articulaciones circulares) */}
      <line x1="32" y1="63" x2="20" y2="58" stroke="#CD7900" strokeWidth="5" strokeLinecap="round" />
      <line x1="73" y1="63" x2="85" y2="58" stroke="#CD7900" strokeWidth="5" strokeLinecap="round" />
      <circle cx="20" cy="58" r="5.5" fill="#FFD600" stroke="#CD7900" strokeWidth="2.5" />
      <circle cx="85" cy="58" r="5.5" fill="#FFD600" stroke="#CD7900" strokeWidth="2.5" />
      {/* Detalles en las manos */}
      <circle cx="20" cy="58" r="2" fill="#FFF500" />
      <circle cx="85" cy="58" r="2" fill="#FFF500" />

      {/* Piernas del robot (rectángulos verticales) */}
      <rect x="40" y="78" width="9" height="10" rx="2" fill="#FFD600" stroke="#CD7900" strokeWidth="2.5" />
      <rect x="56" y="78" width="9" height="10" rx="2" fill="#FFD600" stroke="#CD7900" strokeWidth="2.5" />

      {/* Pies (óvalos horizontales) */}
      <ellipse cx="44.5" cy="88" rx="7" ry="3.5" fill="#FFC800" stroke="#CD7900" strokeWidth="2" />
      <ellipse cx="60.5" cy="88" rx="7" ry="3.5" fill="#FFC800" stroke="#CD7900" strokeWidth="2" />

      {/* Partículas doradas flotantes (celebración) */}
      <circle cx="15" cy="35" r="3" fill="#FFF500" opacity="0.8" />
      <circle cx="90" cy="40" r="2.5" fill="#FFD600" opacity="0.7" />
      <circle cx="20" cy="70" r="2" fill="#FFE700" opacity="0.6" />
      <circle cx="85" cy="68" r="2.5" fill="#FFF500" opacity="0.7" />

      {/* Destellos de oro */}
      <path d="M52.5 8 L53.5 11 L52.5 14 L51.5 11 Z" fill="#FFF" opacity="0.95" />
      <path d="M95 50 L97 51.5 L95 53 L93 51.5 Z" fill="#FFF500" opacity="0.9" />
      <path d="M10 50 L12 51.5 L10 53 L8 51.5 Z" fill="#FFF500" opacity="0.9" />

      {/* Etiqueta "MASTER" en la base */}
      <rect x="37" y="85" width="31" height="8" rx="2" fill="#CD7900" />
      <text x="52.5" y="90.5" fontSize="6" fontWeight="bold" fill="#FFF500" textAnchor="middle" dominantBaseline="middle">★ MASTER QA ★</text>
    </svg>
  );
};