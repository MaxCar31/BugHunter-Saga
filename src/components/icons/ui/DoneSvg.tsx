import type { ComponentProps } from "react";

export const DoneSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg height="48" viewBox="0 96 960 960" width="48" {...props}>
      <path
        fill="currentColor"
        d="M378 834 130 586l68-68 180 180 383-383 68 68-451 451Z"
      />
    </svg>
  );
};