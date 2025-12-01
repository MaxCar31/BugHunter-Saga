export const GoldenTrophySvg = () => {
  return (
    <svg width="105" height="89" viewBox="0 0 105 89" fill="none">
      {/* QA Badge - Golden (Premium Quality Badge) */}
      {/* Outer Glow Circle */}
      <circle cx="52.5" cy="44.5" r="35" fill="#FFE700" opacity="0.3" />
      <circle cx="52.5" cy="44.5" r="28" fill="#FFD600" opacity="0.5" />

      {/* Main Shield */}
      <path d="M52.5 15L30 23V40C30 55 40 68 52.5 78C65 68 75 55 75 40V23L52.5 15Z" fill="#FFF1C0" stroke="#FFD600" strokeWidth="3" />

      {/* Inner Shield Gradient */}
      <path d="M52.5 18L33 25V40C33 53 42 64 52.5 73C63 64 72 53 72 40V25L52.5 18Z" fill="url(#goldGradient)" />

      {/* Large QA Text */}
      <text x="52.5" y="40" fontSize="20" fontWeight="bold" fill="#FFD600" textAnchor="middle" dominantBaseline="middle">QA</text>

      {/* Premium Star on top */}
      <path d="M52.5 8L54.5 12L59 12.8L55.7 16L56.5 20.5L52.5 18.3L48.5 20.5L49.3 16L46 12.8L50.5 12L52.5 8Z" fill="#FFF500" />

      {/* Quality Checkmarks */}
      <g stroke="#FFD600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M38 50L42 54L48 47" />
        <path d="M57 50L61 54L67 47" />
      </g>

      {/* Decorative Elements */}
      <circle cx="35" cy="35" r="2" fill="#FFF500" />
      <circle cx="70" cy="35" r="2" fill="#FFF500" />
      <circle cx="42" cy="28" r="1.5" fill="#FFE700" opacity="0.7" />
      <circle cx="63" cy="28" r="1.5" fill="#FFE700" opacity="0.7" />

      {/* Shine Effect */}
      <circle cx="45" cy="22" r="3" fill="#FFF500" opacity="0.6" />
      <circle cx="60" cy="25" r="2" fill="#FFF500" opacity="0.5" />

      {/* Bottom Ribbon */}
      <rect x="40" y="70" width="25" height="8" rx="2" fill="#FFD600" />
      <text x="52.5" y="76" fontSize="6" fontWeight="bold" fill="#CD7900" textAnchor="middle" dominantBaseline="middle">MASTER</text>

      <defs>
        <linearGradient id="goldGradient" x1="52.5" y1="18" x2="52.5" y2="73">
          <stop offset="0%" stopColor="#FFF500" />
          <stop offset="50%" stopColor="#FFD600" />
          <stop offset="100%" stopColor="#FFC800" />
        </linearGradient>
      </defs>
    </svg>
  );
};