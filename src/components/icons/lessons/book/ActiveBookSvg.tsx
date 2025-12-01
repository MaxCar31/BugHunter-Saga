export const ActiveBookSvg = () => {
  return (
    <svg width="42" height="38" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="magnifierGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#89E219" />
          <stop offset="50%" stopColor="#58CC02" />
          <stop offset="100%" stopColor="#46A302" />
        </linearGradient>
      </defs>

      {/* Sombra 3D */}
      <circle cx="22" cy="22" r="14" fill="#46A302" opacity="0.3" />

      {/* Lupa - Círculo principal */}
      <circle cx="21" cy="21" r="13" fill="#FFF9E6" stroke="url(#magnifierGlow)" strokeWidth="3" />

      {/* Lente interior */}
      <circle cx="21" cy="21" r="10" fill="#FFFFFF" stroke="#58CC02" strokeWidth="1.5" />

      {/* Bug dentro de la lupa */}
      <circle cx="21" cy="21" r="4" fill="#E74C3C" />
      <line x1="19" y1="18" x2="18" y2="16" stroke="#C0392B" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="23" y1="18" x2="24" y2="16" stroke="#C0392B" strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="19.5" cy="20" rx="0.8" ry="0.5" fill="#8B0000" />
      <ellipse cx="22.5" cy="20" rx="0.8" ry="0.5" fill="#8B0000" />

      {/* Mango de la lupa */}
      <path d="M30 30L38 38" stroke="url(#magnifierGlow)" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M30 30L38 38" stroke="#46A302" strokeWidth="2.5" strokeLinecap="round" />

      {/* Brillo en el cristal */}
      <ellipse cx="17" cy="17" rx="3.5" ry="2" fill="#FFFFFF" opacity="0.6" />

      {/* Destellos de inspección */}
      <circle cx="9" cy="13" r="1.5" fill="#89E219" opacity="0.8" />
      <circle cx="33" cy="9" r="1.2" fill="#58CC02" opacity="0.7" />
    </svg>
  );
};