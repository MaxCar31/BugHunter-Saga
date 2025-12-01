export const ActiveDumbbellSvg = () => {
  return (
    <svg width="42" height="34" viewBox="0 0 42 34" fill="none">
      {/* Bug Icon - Active (Red - Active Bug) */}
      {/* Bug Body */}
      <ellipse cx="21" cy="17" rx="8" ry="10" fill="#FF4B4B" stroke="#CC0000" strokeWidth="1.5" />

      {/* Bug Head */}
      <circle cx="21" cy="9" r="4.5" fill="#FF4B4B" stroke="#CC0000" strokeWidth="1.5" />

      {/* Antennae */}
      <path d="M18 7L15 3" stroke="#CC0000" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 7L27 3" stroke="#CC0000" strokeWidth="1.5" strokeLinecap="round" />

      {/* Eyes - Angry/Alert */}
      <circle cx="19" cy="9" r="1.2" fill="#8B0000" />
      <circle cx="23" cy="9" r="1.2" fill="#8B0000" />

      {/* Legs - Left Side */}
      <path d="M14 14L9 12" stroke="#CC0000" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 17L8 17" stroke="#CC0000" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 20L9 22" stroke="#CC0000" strokeWidth="1.8" strokeLinecap="round" />

      {/* Legs - Right Side */}
      <path d="M28 14L33 12" stroke="#CC0000" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M28 17L34 17" stroke="#CC0000" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M28 20L33 22" stroke="#CC0000" strokeWidth="1.8" strokeLinecap="round" />

      {/* Body Segment Lines */}
      <path d="M15 15H27" stroke="#CC0000" strokeWidth="1" opacity="0.6" />
      <path d="M15 19H27" stroke="#CC0000" strokeWidth="1" opacity="0.6" />
      <path d="M15 23H27" stroke="#CC0000" strokeWidth="1" opacity="0.6" />

      {/* Alert/Warning Dots on body */}
      <circle cx="18" cy="17" r="0.8" fill="#8B0000" />
      <circle cx="24" cy="17" r="0.8" fill="#8B0000" />
      <circle cx="21" cy="20" r="0.8" fill="#8B0000" />
    </svg>
  );
};