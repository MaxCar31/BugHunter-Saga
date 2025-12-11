import type { ComponentProps } from "react";

export const BadgeUnstoppableTesterSvg = (props: ComponentProps<"svg">) => (
    <svg width="80" height="80" viewBox="0 0 80 80" {...props}>
        <defs>
            <linearGradient id="unstoppableTesterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FB7185" />
                <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
            <linearGradient id="unstoppableTesterBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDA4AF" />
                <stop offset="50%" stopColor="#FB7185" />
                <stop offset="100%" stopColor="#FDA4AF" />
            </linearGradient>
        </defs>
        {/* Sombra exterior */}
        <circle cx="40" cy="42" r="35" fill="#000000" opacity="0.15" />
        {/* Círculo principal con gradiente */}
        <circle cx="40" cy="40" r="35" fill="url(#unstoppableTesterGradient)" stroke="url(#unstoppableTesterBorder)" strokeWidth="3" />
        {/* Brillo interior */}
        <ellipse cx="30" cy="28" rx="15" ry="12" fill="white" opacity="0.2" />

        {/* Escudo de protección con llamas */}
        <g transform="translate(40, 40)">
            {/* Escudo */}
            <path d="M0,-14 L10,-10 L10,2 C10,8 5,12 0,14 C-5,12 -10,8 -10,2 L-10,-10 Z"
                fill="#FEE2E2" stroke="#9F1239" strokeWidth="2" />

            {/* Detalles del escudo */}
            <path d="M0,-12 L8,-8 L8,2 C8,7 4,10 0,12 C-4,10 -8,7 -8,2 L-8,-8 Z"
                fill="none" stroke="#9F1239" strokeWidth="1" opacity="0.5" />

            {/* Símbolo de poder: Rayo */}
            <path d="M2,-8 L-2,-2 L1,-2 L-2,4 L4,0 L1,0 Z" fill="#DC2626" />

            {/* Llamas alrededor */}
            <g opacity="0.8">
                {/* Llama izquierda */}
                <path d="M-8,-6 C-9,-4 -8,-2 -7,-1 C-8,0 -8,2 -7,3 C-6,1 -5,-1 -6,-3 C-5,-4 -6,-6 -7,-7 Z"
                    fill="#F97316" />
                {/* Llama derecha */}
                <path d="M8,-6 C9,-4 8,-2 7,-1 C8,0 8,2 7,3 C6,1 5,-1 6,-3 C5,-4 6,-6 7,-7 Z"
                    fill="#F97316" />
                {/* Llama superior */}
                <path d="M0,-14 C-1,-12 0,-10 1,-9 C0,-8 0,-6 1,-5 C2,-7 3,-9 2,-11 C3,-12 2,-14 1,-15 Z"
                    fill="#FBBF24" />
            </g>

            {/* Dashboard de métricas (barras de stats) */}
            <g transform="translate(-6, 6)" opacity="0.6">
                <rect x="0" y="0" width="3" height="1.5" rx="0.3" fill="#10B981" />
                <rect x="4" y="0" width="3" height="1.5" rx="0.3" fill="#10B981" />
                <rect x="8" y="0" width="3" height="1.5" rx="0.3" fill="#10B981" />
            </g>
        </g>

        {/* Decoración: Partículas de energía */}
        <g opacity="0.4">
            <circle cx="18" cy="25" r="1.5" fill="#FCD34D" />
            <circle cx="62" cy="55" r="1.5" fill="#FCD34D" />
            <circle cx="25" cy="62" r="1" fill="#F97316" />
            <circle cx="55" cy="18" r="1" fill="#F97316" />
        </g>
    </svg>
);
