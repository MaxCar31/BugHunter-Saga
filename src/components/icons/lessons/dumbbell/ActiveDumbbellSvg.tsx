export const ActiveDumbbellSvg = () => {
  return (
    <svg width="42" height="38" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Degradado para el cuerpo del bug - Verde BugHunter */}
        <linearGradient id="bugBodyGrad" x1="21" y1="8" x2="21" y2="28">
          <stop offset="0%" stopColor="#e24819ff" />
          <stop offset="50%" stopColor="#cc1a02ff" />
          <stop offset="100%" stopColor="#a34202ff" />
        </linearGradient>

        {/* Degradado para brillo en el caparazón */}
        <radialGradient id="shellShine" cx="17" cy="13" r="7">
          <stop offset="0%" stopColor="#FFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
        </radialGradient>

        {/* Sombra suave */}
        <filter id="softShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Sombra base 3D */}
      <ellipse cx="22" cy="33" rx="11" ry="2.5" fill="#000" opacity="0.15" />

      {/* Cuerpo principal del bug (caparazón segmentado) */}
      <ellipse cx="21" cy="20" rx="8" ry="10" fill="url(#bugBodyGrad)" filter="url(#softShadow)" />

      {/* Línea divisoria del caparazón */}
      <line x1="21" y1="11" x2="21" y2="29" stroke="#3D8A00" strokeWidth="2.5" strokeLinecap="round" />

      {/* Manchas del caparazón (negras) */}
      <circle cx="16" cy="15" r="1.8" fill="#1A1A1A" opacity="0.7" />
      <circle cx="26" cy="15" r="1.8" fill="#1A1A1A" opacity="0.7" />
      <circle cx="15" cy="21" r="2" fill="#1A1A1A" opacity="0.7" />
      <circle cx="27" cy="21" r="2" fill="#1A1A1A" opacity="0.7" />
      <circle cx="17" cy="26" r="1.5" fill="#1A1A1A" opacity="0.7" />
      <circle cx="25" cy="26" r="1.5" fill="#1A1A1A" opacity="0.7" />

      {/* Brillo en el caparazón */}
      <ellipse cx="17" cy="13" rx="2.5" ry="3.5" fill="url(#shellShine)" />

      {/* Cabeza del bug */}
      <circle cx="21" cy="10" r="4.5" fill="#2E2E2E" />

      {/* Ojos grandes estilo cartoon */}
      <circle cx="18.5" cy="9.5" r="1.8" fill="#FFF" />
      <circle cx="23.5" cy="9.5" r="1.8" fill="#FFF" />
      <circle cx="18.7" cy="9.3" r="1.1" fill="#1A1A1A" />
      <circle cx="23.7" cy="9.3" r="1.1" fill="#1A1A1A" />
      {/* Brillos en los ojos */}
      <circle cx="18.5" cy="8.9" r="0.4" fill="#FFF" opacity="0.9" />
      <circle cx="23.5" cy="8.9" r="0.4" fill="#FFF" opacity="0.9" />

      {/* Antenas con bolitas verdes */}
      <path d="M17.5 8 Q15.5 6.5 14.5 5" stroke="#2E2E2E" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M24.5 8 Q26.5 6.5 27.5 5" stroke="#2E2E2E" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <circle cx="14.5" cy="5" r="1.8" fill="#89E219" />
      <circle cx="27.5" cy="5" r="1.8" fill="#89E219" />
      {/* Brillo en antenas */}
      <circle cx="14.5" cy="4.6" r="0.7" fill="#FFF" opacity="0.7" />
      <circle cx="27.5" cy="4.6" r="0.7" fill="#FFF" opacity="0.7" />

      {/* Patas (6 patas, curvas orgánicas) */}
      {/* Lado izquierdo */}
      <path d="M13.5 14 Q10 13.5 8 12" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M12.5 20 Q9 20.5 7 20" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M13.5 26 Q10 27.5 8 29" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Lado derecho */}
      <path d="M28.5 14 Q32 13.5 34 12" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M29.5 20 Q33 20.5 35 20" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M28.5 26 Q32 27.5 34 29" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Partículas de alerta (sparkles verdes) */}
      <circle cx="9" cy="10" r="1.1" fill="#89E219" opacity="0.8" />
      <circle cx="33" cy="11" r="0.9" fill="#58CC02" opacity="0.7" />
      <circle cx="11" cy="30" r="0.8" fill="#89E219" opacity="0.6" />
    </svg>
  );
};