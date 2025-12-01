export const GoldenBookSvg = () => {
  return (
    <svg width="42" height="34" viewBox="0 0 42 34" fill="none">
      {/* Test Case Document - Golden (All Tests Passed) */}
      <rect x="8" y="2" width="26" height="30" rx="2" fill="#FFF1C0" />
      <rect x="8" y="2" width="26" height="30" rx="2" stroke="#FFD600" strokeWidth="2" />

      {/* Document Header */}
      <rect x="11" y="5" width="20" height="2" rx="1" fill="#FFD600" />
      <rect x="11" y="8" width="14" height="1.5" rx="0.75" fill="#FFC800" />

      {/* Checklist Items - All Checked */}
      {/* Item 1 */}
      <rect x="12" y="13" width="3" height="3" rx="0.5" fill="#FFD600" />
      <path d="M12.8 15L13.5 15.7L14.8 14" stroke="#CD7900" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="16" y="14" width="12" height="1" rx="0.5" fill="#FFD600" />

      {/* Item 2 */}
      <rect x="12" y="18" width="3" height="3" rx="0.5" fill="#FFD600" />
      <path d="M12.8 20L13.5 20.7L14.8 19" stroke="#CD7900" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="16" y="19" width="10" height="1" rx="0.5" fill="#FFD600" />

      {/* Item 3 */}
      <rect x="12" y="23" width="3" height="3" rx="0.5" fill="#FFD600" />
      <path d="M12.8 25L13.5 25.7L14.8 24" stroke="#CD7900" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="16" y="24" width="11" height="1" rx="0.5" fill="#FFD600" />

      {/* Item 4 */}
      <rect x="12" y="28" width="3" height="3" rx="0.5" fill="#FFD600" />
      <path d="M12.8 30L13.5 30.7L14.8 29" stroke="#CD7900" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="16" y="29" width="9" height="1" rx="0.5" fill="#FFD600" />

      {/* Success Badge */}
      <circle cx="30" cy="6" r="3" fill="#FFD600" />
      <path d="M28.5 6L29.5 7L31.5 5" stroke="#CD7900" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};