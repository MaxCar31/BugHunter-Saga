export const LightningProgressSvg = ({ size = 56 }: { size?: number }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <defs>
        {/* Gradiente principal del rayo (amarillo a naranja) */}
        <linearGradient id="lightningGradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        {/* Gradiente de brillo superior */}
        <linearGradient id="lightningHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FCD34D" />
        </linearGradient>
        {/* Gradiente de sombra inferior */}
        <linearGradient id="lightningShadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      {/* Sombra del rayo */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.082 10.2876C31.7904 7.41973 28.1083 6.43313 26.4218 8.77092L12.5412 28.0121C11.2575 29.7916 12.1524 32.3055 14.2719 32.8734L22.1682 34.9892L23.3346 46.4591C23.6262 49.327 27.3083 50.3135 28.9948 47.9758L42.8754 28.7346C44.1592 26.9551 43.2642 24.4412 41.1447 23.8733L33.2485 21.7575L32.082 10.2876Z"
        fill="#000000"
        opacity="0.15"
        transform="translate(1, 1)"
      />
      {/* Rayo principal con gradiente */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.082 10.2876C31.7904 7.41973 28.1083 6.43313 26.4218 8.77092L12.5412 28.0121C11.2575 29.7916 12.1524 32.3055 14.2719 32.8734L22.1682 34.9892L23.3346 46.4591C23.6262 49.327 27.3083 50.3135 28.9948 47.9758L42.8754 28.7346C44.1592 26.9551 43.2642 24.4412 41.1447 23.8733L33.2485 21.7575L32.082 10.2876Z"
        fill="url(#lightningGradient)"
      />
      {/* Brillo izquierdo */}
      <path
        d="M15.2647 30.5578C14.5466 30.3639 14.4773 29.3724 15.1614 29.0805L20.6493 26.739C21.1448 26.5276 21.7009 26.8677 21.7385 27.4051L22.011 31.3016C22.0485 31.839 21.5452 32.2531 21.0251 32.1127L15.2647 30.5578Z"
        fill="url(#lightningShadow)"
      />
      {/* Brillo derecho superior */}
      <path
        d="M40.4157 25.8056C41.1338 25.9995 41.2031 26.991 40.519 27.2829L35.0311 29.6244C34.5356 29.8358 33.9795 29.4957 33.9419 28.9583L33.6695 25.0618C33.6319 24.5244 34.1353 24.1103 34.6554 24.2507L40.4157 25.8056Z"
        fill="url(#lightningHighlight)"
      />
      {/* Efecto de brillo central */}
      <ellipse
        cx="28"
        cy="28"
        rx="10"
        ry="15"
        fill="#FEF3C7"
        opacity="0.3"
      />
    </svg>
  );
};