export const LockedTreasureSvg = () => {
  return (
    <svg width="80" height="90" viewBox="0 0 80 90" fill="none">
      {/* Locked Treasure Chest */}
      {/* Circular Sky Blue Background */}
      <circle cx="40" cy="55" r="32" fill="#87CEEB" opacity="0.25" />
      <circle cx="40" cy="55" r="28" fill="#87CEEB" opacity="0.15" />

      {/* Shadow */}
      <ellipse cx="40" cy="75" rx="28" ry="6" fill="#000" opacity="0.15" />

      {/* Chest Base */}
      <path d="M15 45 L15 70 Q15 75 20 75 L60 75 Q65 75 65 70 L65 45 Z" fill="#A0A0A0" />
      <rect x="15" y="43" width="50" height="4" fill="#8A8A8A" />

      {/* Chest Lid */}
      <path d="M12 35 Q12 30 17 28 L63 28 Q68 30 68 35 L68 45 L12 45 Z" fill="#B8B8B8" />
      <path d="M12 35 Q12 30 17 28 L63 28 Q68 30 68 35 L68 38 L12 38 Z" fill="#C8C8C8" />

      {/* Lock - Locked State */}
      <circle cx="40" cy="50" r="8" fill="#5A5A5A" />
      <circle cx="40" cy="50" r="6" fill="#707070" />
      <rect x="37" y="50" width="6" height="12" rx="1" fill="#5A5A5A" />
      <circle cx="40" cy="52" r="2" fill="#3A3A3A" />

      {/* Metal Bands */}
      <rect x="12" y="40" width="56" height="2" fill="#7A7A7A" />
      <rect x="12" y="60" width="56" height="2" fill="#7A7A7A" />

      {/* Lock Keyhole */}
      <circle cx="40" cy="52" r="1.5" fill="#2A2A2A" />
    </svg>
  );
};