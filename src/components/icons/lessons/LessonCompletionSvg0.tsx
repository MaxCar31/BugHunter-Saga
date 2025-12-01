import type { ComponentProps } from "react";

export const LessonCompletionSvg0 = (props: ComponentProps<"svg">) => {
  return (
    <svg
      style={{ transitionDuration: "400ms" }}
      viewBox="0 0 100 100"
      className="absolute"
      {...props}
    >
      <defs>
        <clipPath id="clip-session/ProgressRing1">
          <path d="M3.061616997868383e-15,-50L2.5717582782094417e-15,-42Z"></path>
        </clipPath>
      </defs>
      <g transform="translate(50, 50)">
        <path
          d="M3.061616997868383e-15,-50A50,50,0,1,1,-3.061616997868383e-15,50A50,50,0,1,1,3.061616997868383e-15,-50M-7.715274834628325e-15,-42A42,42,0,1,0,7.715274834628325e-15,42A42,42,0,1,0,-7.715274834628325e-15,-42Z"
          fill="rgb(229,229,229)"
        ></path>
        <circle
          clipPath="url(#clip-session/ProgressRing1)"
          cx="-3.9949609477190866"
          cy="-45.82619651494328"
          fill="rgb(255,255,255)"
          r="4"
        ></circle>
        <path
          d="M3.061616997868383e-15,-50L2.5717582782094417e-15,-42Z"
          fill="rgb(255,200,0)"
        ></path>
      </g>
    </svg>
  );
};
