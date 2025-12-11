import type { ComponentProps } from "react";

export const BadgeTestingGuruSvg = (props: ComponentProps<"svg">) => (
    <svg width="80" height="80" viewBox="0 0 80 80" {...props}>
        <defs>
            <linearGradient id="testingGuruGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="testingGuruBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#FCD34D" />
            </linearGradient>
        </defs>
        {/* Sombra exterior */}
        <circle cx="40" cy="42" r="35" fill="#000000" opacity="0.15" />
        {/* Círculo principal con gradiente */}
        <circle cx="40" cy="40" r="35" fill="url(#testingGuruGradient)" stroke="url(#testingGuruBorder)" strokeWidth="3" />
        {/* Brillo interior */}
        <ellipse cx="30" cy="28" rx="15" ry="12" fill="white" opacity="0.2" />

        {/* Terminal de comandos */}
        <g transform="translate(40, 40)">
            {/* Ventana del terminal */}
            <rect x="-14" y="-12" width="28" height="20" rx="2" fill="#451A03" stroke="#D97706" strokeWidth="1.5" />

            {/* Barra superior del terminal */}
            <rect x="-14" y="-12" width="28" height="3" rx="2" fill="#92400E" />
            <circle cx="-11" cy="-10.5" r="0.8" fill="#FEF3C7" />
            <circle cx="-9" cy="-10.5" r="0.8" fill="#FEF3C7" />
            <circle cx="-7" cy="-10.5" r="0.8" fill="#FEF3C7" />

            {/* Líneas de comando */}
            <g transform="translate(-11, -6)">
                <text x="0" y="0" fontSize="3" fill="#FCD34D" fontFamily="monospace">&gt; npm test</text>
                <rect x="0" y="3" width="18" height="1" rx="0.5" fill="#10B981" opacity="0.7" />
                <rect x="0" y="5" width="14" height="1" rx="0.5" fill="#10B981" opacity="0.7" />
                <rect x="0" y="7" width="16" height="1" rx="0.5" fill="#10B981" opacity="0.7" />
            </g>

            {/* Target/Diana perfecto */}
            <g transform="translate(8, -8)">
                <circle cx="0" cy="0" r="5" fill="none" stroke="#B91C1C" strokeWidth="1.5" opacity="0.6" />
                <circle cx="0" cy="0" r="3" fill="none" stroke="#DC2626" strokeWidth="1.5" opacity="0.8" />
                <circle cx="0" cy="0" r="1.5" fill="#EF4444" />
                {/* Flecha en el centro */}
                <line x1="0" y1="-6" x2="0" y2="-1.5" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M-1,-5 L0,-6 L1,-5" fill="#FCD34D" />
            </g>
        </g>

        {/* Decoración: Íconos de éxito en esquinas */}
        <g opacity="0.3">
            <path d="M16,18 L18,20 L22,16" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M58,62 L60,64 L64,60" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
    </svg>
);
