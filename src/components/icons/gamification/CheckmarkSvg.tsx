export const CheckmarkSvg = () => {
  return (
    <svg width="42" height="34" viewBox="0 0 42 34" fill="none">
      <defs>
        <linearGradient id="checkGrad" x1="21" y1="8" x2="21" y2="26">
          <stop offset="0%" stopColor="#58CC02" />
          <stop offset="100%" stopColor="#46A302" />
        </linearGradient>
      </defs>

      {/* Circular Sky Blue Background */}
      <circle cx="21" cy="17" r="16" fill="#87CEEB" opacity="0.3" />
      <circle cx="21" cy="17" r="14" fill="#87CEEB" opacity="0.2" />

      {/* Success Circle Background */}
      <circle cx="21" cy="17" r="12" fill="url(#checkGrad)" />
      <circle cx="21" cy="17" r="11" fill="#58CC02" opacity="0.3" />

      {/* Checkmark - Bold and Clear */}
      <path
        d="M16 17.5 L19.5 21.5 L27 13"
        stroke="#FFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Shine effect */}
      <circle cx="17" cy="13" r="1.5" fill="#FFF" opacity="0.6" />
      <circle cx="25" cy="15" r="1" fill="#FFF" opacity="0.5" />

      {/* Outer glow */}
      <circle cx="21" cy="17" r="13" stroke="#58CC02" strokeWidth="0.5" opacity="0.4" fill="none" />
    </svg>
  );
};