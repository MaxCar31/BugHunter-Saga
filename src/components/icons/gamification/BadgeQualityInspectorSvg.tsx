import type { ComponentProps } from "react";

export const BadgeQualityInspectorSvg = (props: ComponentProps<"svg">) => (
    <svg width="80" height="80" viewBox="0 0 80 80" {...props}>
        <defs>
            <linearGradient id="qualityInspectorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="qualityInspectorBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0EA5E9" />
                <stop offset="50%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0EA5E9" />
            </linearGradient>
        </defs>
        {/* Sombra exterior */}
        <circle cx="40" cy="42" r="35" fill="#000000" opacity="0.15" />
        {/* Círculo principal con gradiente */}
        <circle cx="40" cy="40" r="35" fill="url(#qualityInspectorGradient)" stroke="url(#qualityInspectorBorder)" strokeWidth="3" />
        {/* Brillo interior */}
        <ellipse cx="30" cy="28" rx="15" ry="12" fill="white" opacity="0.2" />

        {/* Clipboard/Checklist con lupa */}
        <g transform="translate(40, 40)">
            {/* Clipboard */}
            <rect x="-10" y="-14" width="20" height="26" rx="2" fill="#E0F2FE" stroke="#0369A1" strokeWidth="1.5" />
            {/* Clip superior */}
            <rect x="-4" y="-16" width="8" height="3" rx="1.5" fill="#0284C7" />

            {/* Checklist items */}
            <g transform="translate(-6, -8)">
                {/* Item 1 - Checked */}
                <circle cx="0" cy="0" r="2" fill="#0EA5E9" stroke="#0369A1" strokeWidth="1" />
                <path d="M-0.8,0 L-0.2,0.6 L0.8,-0.6" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <rect x="4" y="-1" width="8" height="2" rx="0.5" fill="#0369A1" opacity="0.3" />

                {/* Item 2 - Checked */}
                <circle cx="0" cy="5" r="2" fill="#0EA5E9" stroke="#0369A1" strokeWidth="1" />
                <path d="M-0.8,5 L-0.2,5.6 L0.8,4.4" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <rect x="4" y="4" width="8" height="2" rx="0.5" fill="#0369A1" opacity="0.3" />

                {/* Item 3 - In progress */}
                <circle cx="0" cy="10" r="2" fill="#E0F2FE" stroke="#0369A1" strokeWidth="1" />
                <rect x="4" y="9" width="8" height="2" rx="0.5" fill="#0369A1" opacity="0.3" />
            </g>

            {/* Lupa de inspección */}
            <g transform="translate(6, 8)">
                <circle cx="0" cy="0" r="5" fill="#E0F2FE" opacity="0.4" stroke="#0369A1" strokeWidth="2" />
                <line x1="3.5" y1="3.5" x2="7" y2="7" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" />
                {/* Brillo */}
                <circle cx="-1.5" cy="-1.5" r="1.5" fill="white" opacity="0.7" />
            </g>
        </g>

        {/* Decoración: Iconos de calidad en esquinas */}
        <g opacity="0.25">
            <circle cx="18" cy="18" r="3" fill="none" stroke="#0369A1" strokeWidth="1.5" />
            <path d="M16.5,18 L17.5,19 L19.5,17" stroke="#0369A1" strokeWidth="1" fill="none" strokeLinecap="round" />
            <circle cx="62" cy="62" r="3" fill="none" stroke="#0369A1" strokeWidth="1.5" />
            <path d="M60.5,62 L61.5,63 L63.5,61" stroke="#0369A1" strokeWidth="1" fill="none" strokeLinecap="round" />
        </g>
    </svg>
);
