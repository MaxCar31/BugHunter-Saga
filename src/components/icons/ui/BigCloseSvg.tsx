import type { ComponentProps } from "react";

export const BigCloseSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg height="48" viewBox="0 96 960 960" width="48" {...props}>
      <path
        fill="currentColor"
        d="m249 873-66-66 231-231-231-231 66-66 231 231 231-231 66 66-231 231 231 231-66 66-231-231-231 231Z"
      />
    </svg>
  );
};