import type { ComponentProps } from "react";

export const MoreOptionsSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      className="h-[36px] w-[36px]"
      {...props}
    >
      <circle
        cx="23"
        cy="23"
        r="19"
        fill="none"
        stroke="white"
        strokeWidth={2}
      />
      <circle cx="15" cy="23" r="2" fill="white" />
      <circle cx="23" cy="23" r="2" fill="white" />
      <circle cx="31" cy="23" r="2" fill="white" />
    </svg>
  );
};