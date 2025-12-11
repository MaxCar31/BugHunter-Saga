import type { ComponentProps } from "react";

export const LogoutIconSvg = (props: ComponentProps<"svg">) => {
    return (
        <svg
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
            className="h-[50px] w-[50px]"
            {...props}
        >
            {/* Marco exterior tipo "badge tech" */}
            <rect
                x="4"
                y="4"
                width="38"
                height="38"
                rx="4"
                fill="url(#logoutBadgeGradient)"
                stroke="url(#logoutBorderGradient)"
                strokeWidth="2.5"
            />

            {/* Brillo exterior (efecto glow) */}
            <rect
                x="5"
                y="5"
                width="36"
                height="36"
                rx="3"
                fill="none"
                stroke="#EF4444"
                strokeWidth="0.5"
                opacity="0.6"
            />

            {/* Fondo interior del badge */}
            <rect
                x="7"
                y="7"
                width="32"
                height="32"
                rx="2"
                fill="#0F172A"
            />

            {/* Puerta/Marco */}
            <rect
                x="13"
                y="13"
                width="11"
                height="20"
                rx="1.5"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
            />

            {/* Persona - Cabeza */}
            <circle
                cx="17"
                cy="19"
                r="2.5"
                fill="#EF4444"
            />

            {/* Persona - Cuerpo */}
            <path
                d="M14 24 C14 22.5 15 22 17 22 C19 22 20 22.5 20 24 L20 28 L14 28 Z"
                fill="#EF4444"
            />

            {/* Flecha de SALIDA */}
            <path
                d="M24 23 L32 23 M29 19 L33 23 L29 27"
                stroke="#F87171"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Línea vertical de la puerta */}
            <line
                x1="24"
                y1="13"
                x2="24"
                y2="33"
                stroke="#EF4444"
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* Esquinas decorativas (marco tech) */}
            <path d="M9 9 L9 12 L12 12" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            <path d="M37 9 L37 12 L34 12" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            <path d="M9 37 L9 34 L12 34" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            <path d="M37 37 L37 34 L34 34" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />

            {/* Gradientes */}
            <defs>
                <linearGradient id="logoutBadgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#7F1D1D" />
                    <stop offset="100%" stopColor="#450A0A" />
                </linearGradient>

                <linearGradient id="logoutBorderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EF4444" />
                    <stop offset="50%" stopColor="#F87171" />
                    <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>
            </defs>
        </svg>
    );
};
