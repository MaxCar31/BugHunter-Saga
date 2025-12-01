export const GoldenBookSvg = () => {
  return (
    <svg width="42" height="38" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldenGlow" x1="0%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="#FFD600" />
          <stop offset="50%" stopColor="#FFC800" />
          <stop offset="100%" stopColor="#CD7900" />
        </linearGradient>
      </defs>

      <circle cx="22" cy="22" r="14" fill="#CD7900" opacity="0.3" />
      <circle cx="21" cy="21" r="13" fill="#FFF9E6" stroke="url(#goldenGlow)" strokeWidth="3" />
      <circle cx="21" cy="21" r="10" fill="#FFFFFF" stroke="#FFD600" strokeWidth="1.5" />
      <circle cx="21" cy="21" r="5" fill="#FFD600" />
      <path d="M18.5 21L20 22.5L23.5 19" stroke="#CD7900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 30L38 38" stroke="url(#goldenGlow)" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M30 30L38 38" stroke="#CD7900" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="17" cy="17" rx="3.5" ry="2" fill="#FFFFFF" opacity="0.6" />
      <circle cx="9" cy="13" r="1.5" fill="#FFD600" opacity="0.9" />
      <circle cx="33" cy="9" r="1.2" fill="#FFC800" opacity="0.8" />
      <circle cx="11" cy="31" r="1" fill="#FFD600" opacity="0.7" />
    </svg>
  );
};