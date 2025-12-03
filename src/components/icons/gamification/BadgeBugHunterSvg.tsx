import type { ComponentProps } from "react";

export const BadgeBugHunterSvg = (props: ComponentProps<"svg">) => (
    <svg width="80" height="80" viewBox="0 0 80 80" {...props}>
        <defs>
            <linearGradient id="bugHunterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="bugHunterBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A78BFA" />
                <stop offset="50%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
        </defs>
        {/* Sombra exterior */}
        <circle cx="40" cy="42" r="35" fill="#000000" opacity="0.15" />
        {/* Círculo principal con gradiente */}
        <circle cx="40" cy="40" r="35" fill="url(#bugHunterGradient)" stroke="url(#bugHunterBorder)" strokeWidth="3" />
        {/* Brillo interior */}
        <ellipse cx="30" cy="28" rx="15" ry="12" fill="white" opacity="0.2" />

        {/* Bug sobre código con lupa */}
        <g transform="translate(40, 38)">
            {/* Líneas de código de fondo */}
            <g opacity="0.4">
                <rect x="-12" y="-8" width="14" height="2" rx="1" fill="#E9D5FF" />
                <rect x="-12" y="-4" width="10" height="2" rx="1" fill="#E9D5FF" />
                <rect x="-12" y="0" width="16" height="2" rx="1" fill="#E9D5FF" />
            </g>

            {/* Bug (estilo pixel art moderno) */}
            <g transform="translate(-4, -2)">
                {/* Cuerpo del bug */}
                <ellipse cx="0" cy="0" rx="5" ry="4" fill="#DC2626" />
                {/* Cabeza */}
                <circle cx="0" cy="-3" r="2.5" fill="#EF4444" />
                {/* Antenas */}
                <line x1="-1" y1="-5" x2="-2" y2="-7" stroke="#DC2626" strokeWidth="1" strokeLinecap="round" />
                <line x1="1" y1="-5" x2="2" y2="-7" stroke="#DC2626" strokeWidth="1" strokeLinecap="round" />
                {/* Ojos */}
                <circle cx="-1" cy="-3" r="0.7" fill="white" />
                <circle cx="1" cy="-3" r="0.7" fill="white" />
                {/* Patas */}
                <line x1="-4" y1="-1" x2="-6" y2="-2" stroke="#DC2626" strokeWidth="1" />
                <line x1="-4" y1="1" x2="-6" y2="2" stroke="#DC2626" strokeWidth="1" />
                <line x1="4" y1="-1" x2="6" y2="-2" stroke="#DC2626" strokeWidth="1" />
                <line x1="4" y1="1" x2="6" y2="2" stroke="#DC2626" strokeWidth="1" />
            </g>

            {/* Lupa de cazador */}
            <g transform="translate(6, 4)">
                {/* Lente */}
                <circle cx="0" cy="0" r="6" fill="#E9D5FF" opacity="0.3" stroke="#5B21B6" strokeWidth="2" />
                {/* Mango */}
                <line x1="4" y1="4" x2="8" y2="8" stroke="#5B21B6" strokeWidth="2.5" strokeLinecap="round" />
                {/* Brillo en lente */}
                <circle cx="-2" cy="-2" r="2" fill="white" opacity="0.6" />
            </g>
        </g>

        {/* Decoración: Target corners */}
        <g opacity="0.3">
            <path d="M15,20 L15,15 L20,15" stroke="#5B21B6" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M65,20 L65,15 L60,15" stroke="#5B21B6" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M15,60 L15,65 L20,65" stroke="#5B21B6" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M65,60 L65,65 L60,65" stroke="#5B21B6" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
    </svg>
);
