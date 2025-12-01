export const ActiveBookSvg = () => {
  return (
    <svg width="42" height="34" viewBox="0 0 42 34" fill="none">
      {/* Test Case Document - Active */}
      <rect x="8" y="2" width="26" height="30" rx="2" fill="white" />
      <rect x="8" y="2" width="26" height="30" rx="2" stroke="#58CC02" strokeWidth="2" />

      {/* Document Header */}
      <rect x="11" y="5" width="20" height="2" rx="1" fill="#58CC02" />
      <rect x="11" y="8" width="14" height="1.5" rx="0.75" fill="#89E219" />

      {/* Checklist Items - Active (some checked) */}
      {/* Item 1 - Checked */}
      <rect x="12" y="13" width="3" height="3" rx="0.5" fill="#58CC02" />
      <path d="M12.8 15L13.5 15.7L14.8 14" stroke="white" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="16" y="14" width="12" height="1" rx="0.5" fill="#58CC02" />

      {/* Item 2 - Checked */}
      <rect x="12" y="18" width="3" height="3" rx="0.5" fill="#58CC02" />
      <path d="M12.8 20L13.5 20.7L14.8 19" stroke="white" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="16" y="19" width="10" height="1" rx="0.5" fill="#58CC02" />

      {/* Item 3 - Unchecked */}
      <rect x="12" y="23" width="3" height="3" rx="0.5" stroke="#58CC02" strokeWidth="1" fill="none" />
      <rect x="16" y="24" width="11" height="1" rx="0.5" fill="#BFBFBF" />

      {/* Item 4 - Unchecked */}
      <rect x="12" y="28" width="3" height="3" rx="0.5" stroke="#58CC02" strokeWidth="1" fill="none" />
      <rect x="16" y="29" width="9" height="1" rx="0.5" fill="#BFBFBF" />
    </svg>
  );
};