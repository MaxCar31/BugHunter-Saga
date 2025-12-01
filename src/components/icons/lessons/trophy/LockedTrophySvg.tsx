export const LockedTrophySvg = () => {
  return (
    <svg width="42" height="34" viewBox="0 0 42 34" fill="none">
      {/* QA Badge - Locked (Gray Shield) */}
      {/* Shield Background */}
      <path d="M21 2L10 6V14C10 20 14 26 21 30C28 26 32 20 32 14V6L21 2Z" fill="#D8D8D8" stroke="#AFAFAF" strokeWidth="1.5" />

      {/* QA Text */}
      <text x="21" y="16" fontSize="10" fontWeight="bold" fill="#AFAFAF" textAnchor="middle" dominantBaseline="middle">QA</text>

      {/* Decorative Elements */}
      <circle cx="21" cy="22" r="1.5" fill="#AFAFAF" opacity="0.5" />
      <circle cx="17" cy="20" r="1" fill="#AFAFAF" opacity="0.5" />
      <circle cx="25" cy="20" r="1" fill="#AFAFAF" opacity="0.5" />
    </svg>
  );
};