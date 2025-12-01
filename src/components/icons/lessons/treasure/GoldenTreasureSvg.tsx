export const GoldenTreasureSvg = () => {
  return (
    <svg width="80" height="90" viewBox="0 0 80 90" fill="none">
      {/* Golden Treasure Chest - Opened & Complete! */}
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
        <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFF00" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Circular Sky Blue Background */}
      <circle cx="40" cy="45" r="38" fill="#87CEEB" opacity="0.3" />
      <circle cx="40" cy="45" r="34" fill="#87CEEB" opacity="0.2" />

      {/* Glow Effect - Stronger */}
      <circle cx="40" cy="45" r="38" fill="url(#glowGradient)" />
      <circle cx="40" cy="45" r="32" fill="#FFD700" opacity="0.2" />

      {/* Shadow */}
      <ellipse cx="40" cy="75" rx="30" ry="7" fill="#000" opacity="0.25" />

      {/* Chest Base - Golden Wood */}
      <path d="M15 45 L15 70 Q15 75 20 75 L60 75 Q65 75 65 70 L65 45 Z" fill="url(#goldGradient)" />
      <rect x="15" y="43" width="50" height="4" fill="#B8860B" />

      {/* Chest Lid - Wide Open */}
      <path d="M10 22 Q10 18 14 16 L66 16 Q70 18 70 22 L68 35 L12 35 Z" fill="#DAA520" />
      <path d="M10 22 Q10 18 14 16 L66 16 Q70 18 70 22 L68 25 L12 25 Z" fill="#FFD700" />

      {/* Treasure Inside - Coins & Gems */}
      <circle cx="30" cy="38" r="4" fill="#FFD700" />
      <circle cx="38" cy="36" r="4" fill="#FFA500" />
      <circle cx="42" cy="36" r="4" fill="#FFD700" />
      <circle cx="50" cy="38" r="4" fill="#FF8C00" />
      <circle cx="34" cy="42" r="3.5" fill="#FFD700" />
      <circle cx="46" cy="42" r="3.5" fill="#FFA500" />

      {/* Gems/Jewels */}
      <polygon points="25,44 27,40 29,44 27,45" fill="#00CED1" />
      <polygon points="40,40 42,36 44,40 42,42" fill="#FF1493" />
      <polygon points="55,44 57,40 59,44 57,45" fill="#00FF00" />

      {/* Golden Lock - Open */}
      <circle cx="40" cy="52" r="8" fill="#FFD700" />
      <circle cx="40" cy="52" r="6" fill="#DAA520" />
      <path d="M36 52 Q36 48 40 48 Q44 48 44 52" stroke="#B8860B" strokeWidth="2" fill="none" />

      {/* Sparkles - Abundant */}
      <circle cx="20" cy="30" r="2" fill="#FFFF00" opacity="0.9" />
      <circle cx="60" cy="30" r="2" fill="#FFFF00" opacity="0.9" />
      <circle cx="40" cy="15" r="2.5" fill="#FFFF00" />
      <circle cx="15" cy="45" r="1.5" fill="#FFD700" opacity="0.8" />
      <circle cx="65" cy="45" r="1.5" fill="#FFD700" opacity="0.8" />
      <circle cx="25" cy="20" r="1.5" fill="#FFA500" opacity="0.8" />
      <circle cx="55" cy="20" r="1.5" fill="#FFA500" opacity="0.8" />

      {/* Star Sparkles */}
      <path d="M70 25 L71 27 L73 27 L71.5 28.5 L72 30.5 L70 29 L68 30.5 L68.5 28.5 L67 27 L69 27 Z" fill="#FFFF00" />
      <path d="M10 25 L11 27 L13 27 L11.5 28.5 L12 30.5 L10 29 L8 30.5 L8.5 28.5 L7 27 L9 27 Z" fill="#FFFF00" />

      {/* Metal Bands - Golden */}
      <rect x="12" y="40" width="56" height="2.5" fill="#B8860B" />
      <rect x="12" y="60" width="56" height="2.5" fill="#B8860B" />
      <rect x="12" y="42.5" width="56" height="0.5" fill="#FFD700" />
      <rect x="12" y="62.5" width="56" height="0.5" fill="#FFD700" />
    </svg>
  );
};