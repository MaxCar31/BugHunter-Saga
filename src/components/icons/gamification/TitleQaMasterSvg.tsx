import type { ComponentProps } from "react";

export const TitleQaMasterSvg = (props: ComponentProps<"svg">) => (
    <svg width="80" height="80" viewBox="0 0 80 80" {...props}>
        <circle cx="40" cy="40" r="35" fill="#FFA500" stroke="#FF8C00" strokeWidth="3" />
        <text x="50%" y="55%" textAnchor="middle" fontSize="36">🏆</text>
    </svg>
);
