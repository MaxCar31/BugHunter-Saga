export const ActiveTrophySvg = () => {
  return (
    <svg width="42" height="34" viewBox="0 0 42 34" fill="none">
      {/* QA Badge - Active (Green Shield) */}
      {/* Shield Background */}
      <path d="M21 2L10 6V14C10 20 14 26 21 30C28 26 32 20 32 14V6L21 2Z" fill="white" stroke="#58CC02" strokeWidth="2" />

      {/* Inner Shield Accent */}
      <path d="M21 4L12 7.5V14C12 19 15.5 24 21 27.5C26.5 24 30 19 30 14V7.5L21 4Z" fill="#E8F5E9" />

      {/* QA Text */}
      <text x="21" y="14" fontSize="9" fontWeight="bold" fill="#58CC02" textAnchor="middle" dominantBaseline="middle">QA</text>

      {/* Checkmarks */}
      <path d="M15 20L17 22L20 19" stroke="#58CC02" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 20L24 22L27 19" stroke="#58CC02" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Star accents */}
      <circle cx="14" cy="10" r="1" fill="#89E219" />
      <circle cx="28" cy="10" r="1" fill="#89E219" />
    </svg>
  );
};