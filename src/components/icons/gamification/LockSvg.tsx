export const LockSvg = () => {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lockGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E0E0E0" />
          <stop offset="100%" stopColor="#AFAFAF" />
        </linearGradient>
      </defs>

      {/* Sombra 3D */}
      <ellipse cx="22" cy="35" rx="10" ry="2" fill="#000000" opacity="0.15" />

      {/* Arco del candado (parte superior) */}
      <path
        d="M15 18 V13 C15 9.5 17.5 7 21 7 C24.5 7 27 9.5 27 13 V18"
        stroke="url(#lockGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Cuerpo del candado con degradado */}
      <rect
        x="13"
        y="18"
        width="16"
        height="13"
        rx="2"
        fill="url(#lockGradient)"
      />

      {/* Borde del cuerpo más oscuro */}
      <rect
        x="13"
        y="18"
        width="16"
        height="13"
        rx="2"
        stroke="#8F8F8F"
        strokeWidth="1"
        fill="none"
      />

      {/* Ojo de cerradura */}
      <circle cx="21" cy="24" r="2" fill="#6F6F6F" />
      <rect x="20" y="24" width="2" height="4" rx="1" fill="#6F6F6F" />

      {/* Brillo superior */}
      <ellipse cx="18" cy="20" rx="2" ry="1" fill="#FFFFFF" opacity="0.4" />
    </svg>
  );
};