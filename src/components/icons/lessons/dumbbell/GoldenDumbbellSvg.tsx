export const GoldenDumbbellSvg = () => {
  return (
    <svg width="42" height="38" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Degradado dorado para el cuerpo del bug */}
        <linearGradient id="goldenBugBodyGrad" x1="21" y1="8" x2="21" y2="28">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFC800" />
          <stop offset="100%" stopColor="#CD7900" />
        </linearGradient>

        {/* Degradado para brillo dorado en el caparazón */}
        <radialGradient id="goldenShellShine" cx="17" cy="13" r="7">
          <stop offset="0%" stopColor="#FFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFE66D" stopOpacity="0" />
        </radialGradient>

        {/* Sombra dorada suave */}
        <filter id="goldenSoftShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#CD7900" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Sombra base 3D dorada */}
      <ellipse cx="22" cy="33" rx="11" ry="2.5" fill="#CD7900" opacity="0.2" />

      {/* Cuerpo principal del bug (caparazón segmentado dorado) */}
      <ellipse cx="21" cy="20" rx="8" ry="10" fill="url(#goldenBugBodyGrad)" filter="url(#goldenSoftShadow)" />

      {/* Línea divisoria del caparazón */}
      <line x1="21" y1="11" x2="21" y2="29" stroke="#B8860B" strokeWidth="2.5" strokeLinecap="round" />

      {/* Manchas del caparazón (dorado oscuro) */}
      <circle cx="16" cy="15" r="1.8" fill="#8B6914" opacity="0.6" />
      <circle cx="26" cy="15" r="1.8" fill="#8B6914" opacity="0.6" />
      <circle cx="15" cy="21" r="2" fill="#8B6914" opacity="0.6" />
      <circle cx="27" cy="21" r="2" fill="#8B6914" opacity="0.6" />
      <circle cx="17" cy="26" r="1.5" fill="#8B6914" opacity="0.6" />
      <circle cx="25" cy="26" r="1.5" fill="#8B6914" opacity="0.6" />

      {/* Brillo en el caparazón */}
      <ellipse cx="17" cy="13" rx="2.5" ry="3.5" fill="url(#goldenShellShine)" />

      {/* Checkmark verde prominente (encima del cuerpo) */}
      <circle cx="21" cy="20" r="6" fill="#58CC02" />
      <circle cx="21" cy="20" r="5.5" fill="#46A302" />
      <path
        d="M17 20 L19.5 22.5 L25 17"
        stroke="#FFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Cabeza del bug dorada */}
      <circle cx="21" cy="10" r="4.5" fill="#DAA520" />

      {/* Ojos grandes estilo cartoon */}
      <circle cx="18.5" cy="9.5" r="1.8" fill="#FFF" />
      <circle cx="23.5" cy="9.5" r="1.8" fill="#FFF" />
      <circle cx="18.7" cy="9.3" r="1.1" fill="#8B4513" />
      <circle cx="23.7" cy="9.3" r="1.1" fill="#8B4513" />
      {/* Brillos en los ojos */}
      <circle cx="18.5" cy="8.9" r="0.4" fill="#FFF" opacity="0.9" />
      <circle cx="23.5" cy="8.9" r="0.4" fill="#FFF" opacity="0.9" />

      {/* Antenas con bolitas doradas */}
      <path d="M17.5 8 Q15.5 6.5 14.5 5" stroke="#B8860B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M24.5 8 Q26.5 6.5 27.5 5" stroke="#B8860B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <circle cx="14.5" cy="5" r="1.8" fill="#FFD700" />
      <circle cx="27.5" cy="5" r="1.8" fill="#FFD700" />
      {/* Brillo en antenas */}
      <circle cx="14.5" cy="4.6" r="0.7" fill="#FFF" opacity="0.8" />
      <circle cx="27.5" cy="4.6" r="0.7" fill="#FFF" opacity="0.8" />

      {/* Patas (6 patas, curvas orgánicas) */}
      {/* Lado izquierdo */}
      <path d="M13.5 14 Q10 13.5 8 12" stroke="#B8860B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M12.5 20 Q9 20.5 7 20" stroke="#B8860B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M13.5 26 Q10 27.5 8 29" stroke="#B8860B" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Lado derecho */}
      <path d="M28.5 14 Q32 13.5 34 12" stroke="#B8860B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M29.5 20 Q33 20.5 35 20" stroke="#B8860B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M28.5 26 Q32 27.5 34 29" stroke="#B8860B" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Partículas doradas (sparkles) */}
      <circle cx="9" cy="10" r="1.1" fill="#FFD700" opacity="0.9" />
      <circle cx="33" cy="11" r="0.9" fill="#FFC800" opacity="0.8" />
      <circle cx="11" cy="30" r="0.8" fill="#FFD700" opacity="0.7" />

      {/* Estrellas de éxito adicionales */}
      <circle cx="6" cy="16" r="0.7" fill="#FFE66D" opacity="0.6" />
      <circle cx="36" cy="18" r="0.6" fill="#FFE66D" opacity="0.6" />
    </svg>
  );
};