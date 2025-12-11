export const ActiveTrophySvg = () => {
  return (
    <svg width="42" height="38" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Degradado morado-púrpura para el robot */}
        <linearGradient id="robotPurple" x1="21" y1="10" x2="21" y2="32">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#9333EA" />
        </linearGradient>

        {/* Brillo metálico */}
        <radialGradient id="robotShine" cx="18" cy="16" r="6">
          <stop offset="0%" stopColor="#FFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#E9D5FF" stopOpacity="0" />
        </radialGradient>

        {/* Sombra suave */}
        <filter id="robotShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Sombra base 3D */}
      <ellipse cx="22" cy="36" rx="10" ry="2.5" fill="#000" opacity="0.2" />

      {/* Cabeza del robot (rectangular con bordes redondeados) */}
      <rect x="14" y="10" width="14" height="12" rx="2" fill="url(#robotPurple)" stroke="#7C3AED" strokeWidth="1.5" filter="url(#robotShadow)" />

      {/* Antena central */}
      <line x1="21" y1="10" x2="21" y2="7" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="21" cy="6" r="1.8" fill="#C084FC" stroke="#7C3AED" strokeWidth="1" />
      <circle cx="21" cy="5.5" r="0.7" fill="#FFF" opacity="0.9" />

      {/* Ojos del robot (pantalla estilo LED morado) */}
      <rect x="16.5" y="13" width="3.5" height="3.5" rx="0.8" fill="#1E293B" />
      <rect x="22" y="13" width="3.5" height="3.5" rx="0.8" fill="#1E293B" />
      <circle cx="18.2" cy="14.7" r="1" fill="#C084FC" />
      <circle cx="23.8" cy="14.7" r="1" fill="#C084FC" />
      {/* Brillo en los ojos */}
      <circle cx="18.5" cy="14.3" r="0.4" fill="#FFF" opacity="0.9" />
      <circle cx="24.1" cy="14.3" r="0.4" fill="#FFF" opacity="0.9" />

      {/* Boca sonriente (línea morada brillante) */}
      <path d="M17.5 18.5 Q21 20 24.5 18.5" stroke="#C084FC" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Brillo en la cabeza */}
      <ellipse cx="18" cy="13" rx="2" ry="2.5" fill="url(#robotShine)" />

      {/* Cuerpo del robot (rectángulo más grande) */}
      <rect x="13" y="23" width="16" height="10" rx="2" fill="url(#robotPurple)" stroke="#7C3AED" strokeWidth="1.5" filter="url(#robotShadow)" />

      {/* Panel central del cuerpo (detalle hexagonal) */}
      <path
        d="M21 25 L23.5 26.5 L23.5 29.5 L21 31 L18.5 29.5 L18.5 26.5 Z"
        fill="#9333EA"
        stroke="#7C3AED"
        strokeWidth="1"
      />

      {/* Indicadores LED en el panel */}
      <circle cx="21" cy="26" r="0.6" fill="#C084FC" />
      <circle cx="19.5" cy="28" r="0.6" fill="#A855F7" />
      <circle cx="22.5" cy="28" r="0.6" fill="#A855F7" />
      <circle cx="21" cy="30" r="0.6" fill="#C084FC" />

      {/* Brazos del robot (líneas con articulaciones circulares) */}
      <line x1="13" y1="26" x2="9" y2="24" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
      <line x1="29" y1="26" x2="33" y2="24" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
      <circle cx="9" cy="24" r="2.2" fill="#A855F7" stroke="#7C3AED" strokeWidth="1.2" />
      <circle cx="33" cy="24" r="2.2" fill="#A855F7" stroke="#7C3AED" strokeWidth="1.2" />
      {/* Detalles en las manos */}
      <circle cx="9" cy="24" r="0.8" fill="#C084FC" />
      <circle cx="33" cy="24" r="0.8" fill="#C084FC" />

      {/* Piernas del robot (rectángulos verticales) */}
      <rect x="16" y="33" width="3.5" height="4" rx="1" fill="#A855F7" stroke="#7C3AED" strokeWidth="1.2" />
      <rect x="22.5" y="33" width="3.5" height="4" rx="1" fill="#A855F7" stroke="#7C3AED" strokeWidth="1.2" />

      {/* Pies (óvalos horizontales) */}
      <ellipse cx="17.7" cy="37" rx="2.8" ry="1.5" fill="#9333EA" stroke="#7C3AED" strokeWidth="1" />
      <ellipse cx="24.3" cy="37" rx="2.8" ry="1.5" fill="#9333EA" stroke="#7C3AED" strokeWidth="1" />

      {/* Partículas de automatización (sparkles morados) */}
      <circle cx="8" cy="14" r="1.2" fill="#C084FC" opacity="0.8" />
      <circle cx="34" cy="16" r="1" fill="#A855F7" opacity="0.7" />
      <circle cx="10" cy="32" r="0.9" fill="#C084FC" opacity="0.6" />
      <circle cx="32" cy="30" r="0.8" fill="#A855F7" opacity="0.7" />

      {/* Destellos de éxito */}
      <path d="M21 4 L21.5 5.5 L21 7 L20.5 5.5 Z" fill="#FFF" opacity="0.9" />
      <path d="M35 20 L36 20.5 L35 21 L34 20.5 Z" fill="#C084FC" opacity="0.8" />
    </svg>
  );
};