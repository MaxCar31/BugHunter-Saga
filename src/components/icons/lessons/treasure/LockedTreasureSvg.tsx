export const LockedTreasureSvg = () => {
  return (
    <svg width="80" height="90" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lockedWood" x1="40" y1="28" x2="40" y2="75">
          <stop offset="0%" stopColor="#6B7280" />
          <stop offset="50%" stopColor="#4B5563" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>

        <linearGradient id="lockedMetal" x1="40" y1="45" x2="40" y2="65">
          <stop offset="0%" stopColor="#9CA3AF" />
          <stop offset="50%" stopColor="#6B7280" />
          <stop offset="100%" stopColor="#4B5563" />
        </linearGradient>

        <radialGradient id="lockedGlow" cx="40" cy="50" r="35">
          <stop offset="0%" stopColor="#6B7280" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4B5563" stopOpacity="0" />
        </radialGradient>

        <filter id="lockedShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="3" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.4" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="40" cy="50" r="38" fill="url(#lockedGlow)" />
      <circle cx="40" cy="50" r="32" fill="#6B7280" opacity="0.1" />

      <ellipse cx="40" cy="78" rx="30" ry="4" fill="#000" opacity="0.3" />

      <path d="M14 48 L14 72 Q14 76 18 76 L62 76 Q66 76 66 72 L66 48 Z" fill="url(#lockedWood)" filter="url(#lockedShadow)" />
      <rect x="14" y="46" width="52" height="3" fill="#374151" opacity="0.6" />

      <path d="M12 36 Q12 30 18 28 L62 28 Q68 30 68 36 L68 48 L12 48 Z" fill="#6B7280" filter="url(#lockedShadow)" />
      <path d="M12 36 Q12 30 18 28 L62 28 Q68 30 68 36 L68 40 L12 40 Z" fill="#9CA3AF" opacity="0.4" />

      <rect x="12" y="42" width="56" height="2.5" fill="#4B5563" />
      <rect x="12" y="64" width="56" height="2.5" fill="#4B5563" />

      <rect x="10" y="38" width="4" height="8" rx="1" fill="#374151" />
      <circle cx="12" cy="42" r="1.2" fill="#4B5563" />
      <rect x="66" y="38" width="4" height="8" rx="1" fill="#374151" />
      <circle cx="68" cy="42" r="1.2" fill="#4B5563" />

      <circle cx="40" cy="52" r="10" fill="url(#lockedMetal)" filter="url(#lockedShadow)" />
      <circle cx="40" cy="52" r="8" fill="#6B7280" />

      <path d="M35 48 L35 42 Q35 36 40 36 Q45 36 45 42 L45 48" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M36 48 L36 43 Q36 38 40 38 Q44 38 44 43 L44 48" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" fill="none" />

      <circle cx="40" cy="54" r="2" fill="#1F2937" />
      <rect x="39" y="54" width="2" height="3" rx="0.5" fill="#1F2937" />

      <path d="M40 22 L41 24 L40 26 L39 24 Z" fill="#6B7280" opacity="0.6" />
      <path d="M20 40 L21 41 L20 42 L19 41 Z" fill="#6B7280" opacity="0.5" />
      <path d="M60 40 L61 41 L60 42 L59 41 Z" fill="#6B7280" opacity="0.5" />
    </svg>
  );
};