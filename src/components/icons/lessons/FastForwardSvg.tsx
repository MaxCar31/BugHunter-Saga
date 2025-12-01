export const FastForwardSvg = () => {
  return (
    <svg width="42" height="34" viewBox="0 0 42 34" fill="none">
      {/* Fast Forward / Skip Test Icon - QA Theme */}
      {/* Background Circle */}
      <circle cx="21" cy="17" r="15" fill="#58CC02" opacity="0.2" />

      {/* Main Fast Forward Arrows (Test Progression) */}
      <g>
        {/* First Arrow */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 12L18 17L10 22V12Z"
          fill="#58CC02"
        />
        {/* Second Arrow */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19 12L27 17L19 22V12Z"
          fill="#58CC02"
        />
        {/* Third Arrow (Advanced) */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M28 12L32 17L28 22V12Z"
          fill="#89E219"
        />
      </g>

      {/* Checkpoint Badge */}
      <circle cx="32" cy="10" r="4" fill="#FFD600" />
      <text x="32" y="11.5" fontSize="4" fontWeight="bold" fill="#FFF" textAnchor="middle">✓</text>
    </svg>
  );
};