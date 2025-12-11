

export const GoldenTreasureSvg = () => {
  return (
    <svg width="80" height="90" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* ===== GRADIENTES DORADOS PREMIUM ===== */}

        {/* Oro metálico principal */}
        <linearGradient id="premiumGold" x1="40" y1="15" x2="40" y2="75">
          <stop offset="0%" stopColor="#FFF9C4" />
          <stop offset="20%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="80%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>

        {/* Oro oscuro para madera */}
        <linearGradient id="darkGoldWood" x1="40" y1="45" x2="40" y2="75">
          <stop offset="0%" stopColor="#DAA520" />
          <stop offset="50%" stopColor="#B8860B" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>

        {/* Resplandor dorado intenso */}
        <radialGradient id="goldenGlow" cx="40" cy="45" r="38">
          <stop offset="0%" stopColor="#FFFF00" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#FFD700" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFA500" stopOpacity="0" />
        </radialGradient>

        {/* Brillo especular */}
        <radialGradient id="goldenSpecular" cx="35" cy="30" r="15">
          <stop offset="0%" stopColor="#FFF" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FFFF00" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
        </radialGradient>

        {/* ===== FILTROS AVANZADOS ===== */}

        {/* Sombra suave para profundidad */}
        <filter id="goldenSoftShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.6" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Glow exterior brillante */}
        <filter id="goldenOuterGlow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          <feColorMatrix type="matrix" values="1.5 0 0 0 0  0 1.5 0 0 0  0 0 0.5 0 0  0 0 0 2 0" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ===== LAYER 1: RESPLANDOR LEGENDARIO ===== */}

      {/* Aura dorada expansiva (3 capas para intensidad) */}
      <circle cx="40" cy="45" r="38" fill="url(#goldenGlow)" opacity="0.8" />
      <circle cx="40" cy="45" r="32" fill="#FFD700" opacity="0.25" />
      <circle cx="40" cy="45" r="26" fill="#FFFF00" opacity="0.15" />

      {/* Rayos de luz (líneas radiales sutiles) */}
      <line x1="40" y1="15" x2="40" y2="5" stroke="#FFFF00" strokeWidth="2" opacity="0.4" />
      <line x1="20" y1="25" x2="10" y2="15" stroke="#FFD700" strokeWidth="1.5" opacity="0.3" />
      <line x1="60" y1="25" x2="70" y2="15" stroke="#FFD700" strokeWidth="1.5" opacity="0.3" />

      {/* Partículas doradas densas (15 sparkles) */}
      <circle cx="18" cy="28" r="2" fill="#FFFF00" opacity="0.9" filter="url(#goldenOuterGlow)" />
      <circle cx="62" cy="28" r="2" fill="#FFFF00" opacity="0.9" filter="url(#goldenOuterGlow)" />
      <circle cx="40" cy="15" r="2.5" fill="#FFF9C4" opacity="1" filter="url(#goldenOuterGlow)" />
      <circle cx="25" cy="20" r="1.5" fill="#FFD700" opacity="0.85" filter="url(#goldenOuterGlow)" />
      <circle cx="55" cy="20" r="1.5" fill="#FFD700" opacity="0.85" filter="url(#goldenOuterGlow)" />
      <circle cx="15" cy="45" r="1.8" fill="#FFA500" opacity="0.75" filter="url(#goldenOuterGlow)" />
      <circle cx="65" cy="45" r="1.8" fill="#FFA500" opacity="0.75" filter="url(#goldenOuterGlow)" />
      <circle cx="12" cy="60" r="1.5" fill="#FFD700" opacity="0.7" />
      <circle cx="68" cy="60" r="1.5" fill="#FFD700" opacity="0.7" />
      <circle cx="30" cy="12" r="1.3" fill="#FFFF00" opacity="0.8" />
      <circle cx="50" cy="12" r="1.3" fill="#FFFF00" opacity="0.8" />
      <circle cx="22" cy="65" r="1.2" fill="#FFA500" opacity="0.6" />
      <circle cx="58" cy="65" r="1.2" fill="#FFA500" opacity="0.6" />
      <circle cx="40" cy="75" r="1.5" fill="#FFD700" opacity="0.65" />
      <circle cx="10" cy="38" r="1.4" fill="#FFFF00" opacity="0.7" />

      {/* ===== LAYER 2: SOMBRA BASE ===== */}

      <ellipse cx="40" cy="78" rx="32" ry="5" fill="#000" opacity="0.5" />
      <ellipse cx="40" cy="78" rx="28" ry="4" fill="#000" opacity="0.3" />

      {/* ===== LAYER 3: CUERPO DEL COFRE (BASE ABIERTA) ===== */}

      {/* Base principal dorada */}
      <path
        d="M12 48 L12 72 Q12 76 17 76 L63 76 Q68 76 68 72 L68 48 Z"
        fill="url(#darkGoldWood)"
        filter="url(#goldenSoftShadow)"
      />

      {/* Vetas de madera dorada (textura) */}
      <path d="M16 52 Q20 54 16 58 Q20 60 16 64" stroke="#8B6914" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M64 52 Q60 54 64 58 Q60 60 64 64" stroke="#8B6914" strokeWidth="1.5" fill="none" opacity="0.4" />

      {/* Borde inferior reforzado */}
      <rect x="12" y="46" width="56" height="3" fill="#8B6914" opacity="0.6" />

      {/* ===== LAYER 4: TAPA ABIERTA ===== */}

      {/* Tapa completamente abierta hacia atrás */}
      <path
        d="M10 22 Q10 18 15 16 L65 16 Q70 18 70 22 L68 35 L12 35 Z"
        fill="url(#premiumGold)"
        filter="url(#goldenSoftShadow)"
      />

      {/* Sección superior más clara (reflejo de luz) */}
      <path
        d="M10 22 Q10 18 15 16 L65 16 Q70 18 70 22 L68 26 L12 26 Z"
        fill="#FFF9C4"
        opacity="0.5"
      />

      {/* Brillo especular en la tapa */}
      <ellipse cx="35" cy="22" rx="14" ry="6" fill="url(#goldenSpecular)" />

      {/* ===== LAYER 5: TESORO DESBORDANDO ===== */}

      {/* Monedas doradas (representan lingots) */}
      <g filter="url(#goldenSoftShadow)">
        {/* Moneda 1 - Izquierda atrás */}
        <circle cx="25" cy="40" r="4.5" fill="#B8860B" />
        <circle cx="25" cy="40" r="4" fill="url(#premiumGold)" />
        <circle cx="24" cy="39" r="1.2" fill="#FFF9C4" opacity="0.9" />

        {/* Moneda 2 - Izquierda adelante */}
        <circle cx="30" cy="37" r="5" fill="#B8860B" />
        <circle cx="30" cy="37" r="4.5" fill="url(#premiumGold)" />
        <circle cx="29" cy="36" r="1.5" fill="#FFF9C4" opacity="0.95" />

        {/* Moneda 3 - Centro atrás */}
        <circle cx="40" cy="38" r="5.5" fill="#B8860B" />
        <circle cx="40" cy="38" r="5" fill="url(#premiumGold)" />
        <circle cx="39" cy="37" r="1.8" fill="#FFF9C4" opacity="1" />

        {/* Moneda 4 - Derecha atrás */}
        <circle cx="55" cy="40" r="4.5" fill="#B8860B" />
        <circle cx="55" cy="40" r="4" fill="url(#premiumGold)" />
        <circle cx="54" cy="39" r="1.2" fill="#FFF9C4" opacity="0.9" />

        {/* Moneda 5 - Derecha adelante */}
        <circle cx="50" cy="37" r="5" fill="#B8860B" />
        <circle cx="50" cy="37" r="4.5" fill="url(#premiumGold)" />
        <circle cx="49" cy="36" r="1.5" fill="#FFF9C4" opacity="0.95" />

        {/* Monedas secundarias (más pequeñas) */}
        <circle cx="35" cy="42" r="3.5" fill="#FFA500" />
        <circle cx="35" cy="42" r="3" fill="#FFD700" />

        <circle cx="45" cy="42" r="3.5" fill="#FFA500" />
        <circle cx="45" cy="42" r="3" fill="#FFD700" />
      </g>

      {/* Gemas/Joyas (variedad de colores) */}
      <g filter="url(#goldenOuterGlow)">
        {/* Diamante cyan */}
        <polygon points="22,45 24,41 26,45 24,47" fill="#00CED1" />
        <polygon points="22,45 24,42 26,45 24,46" fill="#7FFFD4" opacity="0.6" />

        {/* Rubí magenta */}
        <polygon points="40,41 42,37 44,41 42,44" fill="#FF1493" />
        <polygon points="40,41 42,38 44,41 42,43" fill="#FF69B4" opacity="0.6" />

        {/* Esmeralda verde */}
        <polygon points="58,45 60,41 62,45 60,47" fill="#00FF00" />
        <polygon points="58,45 60,42 62,45 60,46" fill="#7FFF00" opacity="0.6" />

        {/* Zafiro azul */}
        <polygon points="28,47 30,44 32,47 30,49" fill="#0000FF" />

        {/* Amatista púrpura */}
        <polygon points="52,47 54,44 56,47 54,49" fill="#9370DB" />
      </g>

      {/* ===== LAYER 6: CHECKMARK VERDE GIGANTE (RECLAMO CONFIRMADO) ===== */}

      {/* Escudo de fondo */}
      <circle cx="40" cy="54" r="11" fill="#46A302" filter="url(#goldenSoftShadow)" />
      <circle cx="40" cy="54" r="10" fill="#58CC02" />

      {/* Checkmark blanco prominente */}
      <path
        d="M33 54 L37 58 L47 48"
        stroke="#FFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Brillo en el checkmark */}
      <circle cx="35" cy="56" r="2" fill="#FFF" opacity="0.4" />

      {/* ===== LAYER 7: HERRAJES DORADOS ===== */}

      {/* Bandas horizontales */}
      <rect x="12" y="42" width="56" height="2.5" fill="#8B6914" filter="url(#goldenSoftShadow)" />
      <rect x="12" y="44.5" width="56" height="0.5" fill="#FFD700" opacity="0.8" />

      <rect x="12" y="64" width="56" height="2.5" fill="#8B6914" filter="url(#goldenSoftShadow)" />
      <rect x="12" y="66.5" width="56" height="0.5" fill="#FFD700" opacity="0.8" />

      {/* Bisagras abiertas (decorativas) */}
      <rect x="8" y="28" width="4" height="6" rx="1" fill="#B8860B" />
      <circle cx="10" cy="31" r="1.2" fill="#FFD700" />

      <rect x="68" y="28" width="4" height="6" rx="1" fill="#B8860B" />
      <circle cx="70" cy="31" r="1.2" fill="#FFD700" />

      {/* ===== LAYER 8: ESTRELLAS BRILLANTES (SPARKLES DECORATIVOS) ===== */}

      {/* Estrella grande arriba */}
      <path
        d="M40 10 L42 14 L46 14 L43 17 L44 21 L40 19 L36 21 L37 17 L34 14 L38 14 Z"
        fill="#FFFF00"
        filter="url(#goldenOuterGlow)"
      />

      {/* Estrella pequeña izquierda */}
      <path
        d="M12 30 L13 32 L15 32 L13.5 33.5 L14 35.5 L12 34 L10 35.5 L10.5 33.5 L9 32 L11 32 Z"
        fill="#FFD700"
        opacity="0.9"
      />

      {/* Estrella pequeña derecha */}
      <path
        d="M68 30 L69 32 L71 32 L69.5 33.5 L70 35.5 L68 34 L66 35.5 L66.5 33.5 L65 32 L67 32 Z"
        fill="#FFD700"
        opacity="0.9"
      />

      {/* ===== LAYER 9: BADGE "CLAIMED" ===== */}


    </svg>
  );
};