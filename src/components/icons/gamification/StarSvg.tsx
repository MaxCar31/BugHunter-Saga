export const StarSvg = () => {
  return (
    <svg width="42" height="34" viewBox="0 0 42 34" fill="none">
      <defs>
        <linearGradient id="bugBodyGrad" x1="21" y1="8" x2="21" y2="26">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="50%" stopColor="#FF5252" />
          <stop offset="100%" stopColor="#E64545" />
        </linearGradient>
        <linearGradient id="bugShellGrad" x1="21" y1="14" x2="21" y2="24">
          <stop offset="0%" stopColor="#FF8A80" />
          <stop offset="100%" stopColor="#FF5252" />
        </linearGradient>
      </defs>

      {/* Circular Sky Blue Background */}
      <circle cx="21" cy="17" r="16" fill="#87CEEB" opacity="0.3" />
      <circle cx="21" cy="17" r="14" fill="#87CEEB" opacity="0.2" />

      {/* Bug Icon - Stylized Ladybug for Gaming */}

      {/* Bug Body Shell (Two-part like ladybug) */}
      <ellipse cx="21" cy="19" rx="6" ry="7.5" fill="url(#bugShellGrad)" />

      {/* Shell Division Line */}
      <line x1="21" y1="12" x2="21" y2="26" stroke="#D32F2F" strokeWidth="1.5" strokeLinecap="round" />

      {/* Bug Spots (Black dots like ladybug) */}
      <circle cx="18" cy="16" r="1.3" fill="#1A1A1A" />
      <circle cx="24" cy="16" r="1.3" fill="#1A1A1A" />
      <circle cx="17.5" cy="20" r="1.5" fill="#1A1A1A" />
      <circle cx="24.5" cy="20" r="1.5" fill="#1A1A1A" />
      <circle cx="19" cy="23" r="1.2" fill="#1A1A1A" />
      <circle cx="23" cy="23" r="1.2" fill="#1A1A1A" />

      {/* Bug Head */}
      <circle cx="21" cy="12" r="3.5" fill="#1A1A1A" />

      {/* Bug Eyes (cute gaming style) */}
      <circle cx="19.2" cy="11.5" r="1.3" fill="#FFF" />
      <circle cx="22.8" cy="11.5" r="1.3" fill="#FFF" />
      <circle cx="19.5" cy="11.3" r="0.7" fill="#1A1A1A" />
      <circle cx="23.1" cy="11.3" r="0.7" fill="#1A1A1A" />
      <circle cx="19.2" cy="11" r="0.3" fill="#FFF" opacity="0.8" />
      <circle cx="22.8" cy="11" r="0.3" fill="#FFF" opacity="0.8" />

      {/* Bug Antennae with cute balls */}
      <path d="M18.5 10 Q17 8.5 16 7.5" stroke="#1A1A1A" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M23.5 10 Q25 8.5 26 7.5" stroke="#1A1A1A" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <circle cx="16" cy="7.5" r="1.2" fill="#FF6B6B" />
      <circle cx="26" cy="7.5" r="1.2" fill="#FF6B6B" />
      <circle cx="16" cy="7.5" r="0.5" fill="#FFF" opacity="0.6" />
      <circle cx="26" cy="7.5" r="0.5" fill="#FFF" opacity="0.6" />

      {/* Bug Legs - Cartoony style (3 on each side) */}
      <path d="M15.5 16 Q12 16 11 14.5" stroke="#1A1A1A" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M15 19.5 Q11.5 20 10 19.5" stroke="#1A1A1A" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M15.5 23 Q12 24 11 25.5" stroke="#1A1A1A" strokeWidth="1.4" strokeLinecap="round" fill="none" />

      <path d="M26.5 16 Q30 16 31 14.5" stroke="#1A1A1A" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M27 19.5 Q30.5 20 32 19.5" stroke="#1A1A1A" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M26.5 23 Q30 24 31 25.5" stroke="#1A1A1A" strokeWidth="1.4" strokeLinecap="round" fill="none" />

      {/* Shine/highlight on shell */}
      <ellipse cx="18" cy="15" rx="1.5" ry="2" fill="#FFF" opacity="0.4" />
    </svg>
  );
};