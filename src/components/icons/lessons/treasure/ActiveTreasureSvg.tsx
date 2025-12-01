export const ActiveTreasureSvg = () => {
  return (
    <svg width="80" height="90" viewBox="0 0 80 90" fill="none">
      {/* Active Treasure Chest - Ready to Open! */}
      {/* Circular Sky Blue Background */}
      <circle cx="40" cy="50" r="35" fill="#87CEEB" opacity="0.3" />
      <circle cx="40" cy="50" r="30" fill="#87CEEB" opacity="0.2" />

      {/* Glow Effect */}
      <circle cx="40" cy="50" r="35" fill="#FFD700" opacity="0.1" />
      <circle cx="40" cy="50" r="30" fill="#FFD700" opacity="0.15" />

      {/* Shadow */}
      <ellipse cx="40" cy="75" rx="28" ry="6" fill="#000" opacity="0.2" />

      {/* Chest Base - Wooden */}
      <path d="M15 45 L15 70 Q15 75 20 75 L60 75 Q65 75 65 70 L65 45 Z" fill="#8B4513" />
      <rect x="15" y="43" width="50" height="4" fill="#654321" />

      {/* Wood Grain Details */}
      <path d="M20 50 Q25 52 20 55" stroke="#654321" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M60 50 Q55 52 60 55" stroke="#654321" strokeWidth="1" fill="none" opacity="0.5" />

      {/* Chest Lid - Slightly Open */}
      <path d="M12 35 Q12 30 17 28 L63 28 Q68 30 68 35 L68 45 L12 45 Z" fill="#A0522D" />
      <path d="M12 35 Q12 30 17 28 L63 28 Q68 30 68 35 L68 38 L12 38 Z" fill="#CD853F" />

      {/* Golden Lock - Unlocked */}
      <circle cx="40" cy="50" r="8" fill="#FFD700" />
      <circle cx="40" cy="50" r="6" fill="#FFA500" />
      <rect x="37" y="50" width="6" height="10" rx="1" fill="#FFD700" />

      {/* Keyhole with Key */}
      <circle cx="40" cy="52" r="2" fill="#B8860B" />
      <rect x="39.5" y="54" width="1" height="3" fill="#B8860B" />

      {/* Gold Coins Peeking Out */}
      <circle cx="30" cy="42" r="3" fill="#FFD700" />
      <circle cx="35" cy="40" r="3" fill="#FFA500" />
      <circle cx="45" cy="40" r="3" fill="#FFD700" />
      <circle cx="50" cy="42" r="3" fill="#FFA500" />

      {/* Sparkles */}
      <circle cx="25" cy="35" r="1.5" fill="#FFFF00" opacity="0.8" />
      <circle cx="55" cy="35" r="1.5" fill="#FFFF00" opacity="0.8" />
      <circle cx="40" cy="25" r="2" fill="#FFFF00" opacity="0.9" />

      {/* Metal Bands */}
      <rect x="12" y="40" width="56" height="2" fill="#DAA520" />
      <rect x="12" y="60" width="56" height="2" fill="#DAA520" />

      {/* Click indicator */}
      <text x="40" y="20" fontSize="8" fontWeight="bold" fill="#FFD700" textAnchor="middle">!</text>
    </svg>
  );
};