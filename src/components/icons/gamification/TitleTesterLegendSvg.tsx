import type { ComponentProps } from "react";

export const TitleTesterLegendSvg = (props: ComponentProps<"svg">) => (
    <svg width="80" height="80" viewBox="0 0 80 80" {...props}>
        <circle cx="40" cy="40" r="35" fill="#9C27B0" stroke="#6A1B9A" strokeWidth="3" />
        <text x="50%" y="55%" textAnchor="middle" fontSize="36">⭐</text>
    </svg>
);
