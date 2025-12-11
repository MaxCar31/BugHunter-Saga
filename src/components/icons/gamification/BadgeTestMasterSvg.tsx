import type { ComponentProps } from "react";

export const BadgeTestMasterSvg = (props: ComponentProps<"svg">) => (
    <svg width="80" height="80" viewBox="0 0 80 80" {...props}>
        <defs>
            <linearGradient id="testMasterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6EE7B7" />
                <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="testMasterBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="50%" stopColor="#6EE7B7" />
                <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
        </defs>
        {/* Sombra exterior */}
        <circle cx="40" cy="42" r="35" fill="#000000" opacity="0.15" />
        {/* Círculo principal con gradiente */}
        <circle cx="40" cy="40" r="35" fill="url(#testMasterGradient)" stroke="url(#testMasterBorder)" strokeWidth="3" />
        {/* Brillo interior */}
        <ellipse cx="30" cy="28" rx="15" ry="12" fill="white" opacity="0.2" />

        {/* Matraz de prueba con líquido */}
        <g transform="translate(40, 40)">
            {/* Matraz */}
            <path d="M-8,-12 L-8,-8 L-10,-4 L-10,8 C-10,10 -8,12 -5,12 L5,12 C8,12 10,10 10,8 L10,-4 L8,-8 L8,-12 Z"
                fill="#D1FAE5" stroke="#047857" strokeWidth="1.5" />
            {/* Líquido burbujeante */}
            <ellipse cx="0" cy="4" rx="8" ry="6" fill="#34D399" opacity="0.7" />
            <circle cx="-3" cy="2" r="1.5" fill="#6EE7B7" opacity="0.8" />
            <circle cx="3" cy="3" r="1" fill="#6EE7B7" opacity="0.6" />
            {/* Cuello del matraz */}
            <rect x="-3" y="-14" width="6" height="3" fill="#D1FAE5" stroke="#047857" strokeWidth="1" />
            {/* Símbolo de checkmark */}
            <path d="M-2,6 L0,8 L4,2" stroke="#047857" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Decoración: Código en esquinas */}
        <g opacity="0.3">
            <rect x="15" y="15" width="8" height="2" rx="1" fill="#047857" />
            <rect x="15" y="19" width="6" height="2" rx="1" fill="#047857" />
            <rect x="57" y="59" width="8" height="2" rx="1" fill="#047857" />
            <rect x="57" y="63" width="6" height="2" rx="1" fill="#047857" />
        </g>
    </svg>
);
