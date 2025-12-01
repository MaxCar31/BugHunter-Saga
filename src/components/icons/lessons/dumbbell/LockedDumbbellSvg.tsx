export const LockedDumbbellSvg = () => {
  return (
    <svg width="42" height="34" viewBox="0 0 42 34" fill="none">
      {/* Bug Icon - Locked (Gray) */}
      {/* Bug Body */}
      <ellipse cx="21" cy="17" rx="8" ry="10" fill="#D8D8D8" stroke="#AFAFAF" strokeWidth="1.5" />

      {/* Bug Head */}
      <circle cx="21" cy="9" r="4.5" fill="#D8D8D8" stroke="#AFAFAF" strokeWidth="1.5" />

      {/* Antennae */}
      <path d="M18 7L15 3" stroke="#AFAFAF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 7L27 3" stroke="#AFAFAF" strokeWidth="1.5" strokeLinecap="round" />

      {/* Eyes */}
      <circle cx="19" cy="9" r="1" fill="#AFAFAF" />
      <circle cx="23" cy="9" r="1" fill="#AFAFAF" />

      {/* Legs - Left Side */}
      <path d="M14 14L9 12" stroke="#AFAFAF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 17L8 17" stroke="#AFAFAF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 20L9 22" stroke="#AFAFAF" strokeWidth="1.5" strokeLinecap="round" />

      {/* Legs - Right Side */}
      <path d="M28 14L33 12" stroke="#AFAFAF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 17L34 17" stroke="#AFAFAF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 20L33 22" stroke="#AFAFAF" strokeWidth="1.5" strokeLinecap="round" />

      {/* Body Segment Lines */}
      <path d="M15 15H27" stroke="#AFAFAF" strokeWidth="0.8" opacity="0.5" />
      <path d="M15 19H27" stroke="#AFAFAF" strokeWidth="0.8" opacity="0.5" />
      <path d="M15 23H27" stroke="#AFAFAF" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
};