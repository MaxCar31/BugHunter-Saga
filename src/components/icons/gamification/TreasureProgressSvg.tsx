export const TreasureProgressSvg = () => {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sombra del cofre */}
      <ellipse cx="23" cy="42" rx="16" ry="3" fill="#000000" opacity="0.2" />

      {/* Base del cofre */}
      <path
        d="M10 22 L10 38 C10 39.5 11 40 12 40 L34 40 C35 40 36 39.5 36 38 L36 22 Z"
        fill="#8B4513"
        stroke="#5D2906"
        strokeWidth="1.5"
      />

      {/* Líneas decorativas de la base */}
      <line x1="12" y1="28" x2="34" y2="28" stroke="#5D2906" strokeWidth="1" />
      <line x1="12" y1="34" x2="34" y2="34" stroke="#5D2906" strokeWidth="1" />

      {/* Tapa del cofre */}
      <path
        d="M8 10 L8 22 L38 22 L38 10 C38 8 36 6 34 6 L12 6 C10 6 8 8 8 10 Z"
        fill="#CD853F"
        stroke="#8B4513"
        strokeWidth="1.5"
      />

      {/* Línea decorativa de la tapa */}
      <rect x="10" y="12" width="26" height="6" rx="1" fill="#8B4513" opacity="0.3" />

      {/* Cerradura */}
      <rect
        x="19"
        y="20"
        width="8"
        height="12"
        rx="2"
        fill="#FFD700"
        stroke="#DAA520"
        strokeWidth="1.5"
      />

      {/* Ojo de la cerradura */}
      <circle cx="23" cy="25" r="2" fill="#8B4513" />
      <path d="M23 27 L23 30" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />

      {/* Bisagras izquierdas */}
      <rect x="10" y="20" width="3" height="8" rx="1" fill="#DAA520" />
      <circle cx="11.5" cy="24" r="1" fill="#8B4513" />

      {/* Bisagras derechas */}
      <rect x="33" y="20" width="3" height="8" rx="1" fill="#DAA520" />
      <circle cx="34.5" cy="24" r="1" fill="#8B4513" />

      {/* Detalles dorados en las esquinas */}
      <circle cx="11" cy="38" r="1.5" fill="#FFD700" opacity="0.8" />
      <circle cx="35" cy="38" r="1.5" fill="#FFD700" opacity="0.8" />

      {/* Brillo superior de la tapa */}
      <ellipse
        cx="23"
        cy="12"
        rx="10"
        ry="2.5"
        fill="#FFFFFF"
        opacity="0.3"
      />

      {/* Lingots brillando dentro (opcional - efecto visual) */}
      <circle cx="18" cy="16" r="1.5" fill="#FFD700" opacity="0.6" />
      <circle cx="23" cy="15" r="2" fill="#FFE55C" opacity="0.7" />
      <circle cx="28" cy="16" r="1.5" fill="#FFD700" opacity="0.6" />
    </svg>
  );
};