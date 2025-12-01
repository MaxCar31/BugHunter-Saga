import type { ComponentProps } from "react";

export const GemSvg = (props: ComponentProps<"svg">) => {
    return (
        <svg
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[50px] w-[50px]"
            {...props}
        >
            {/* Círculo exterior con borde tech */}
            <circle
                cx="23"
                cy="23"
                r="18"
                fill="url(#coinGradient)"
                stroke="url(#coinBorder)"
                strokeWidth="2.5"
            />

            {/* Anillo interior grueso */}
            <circle
                cx="23"
                cy="23"
                r="15"
                fill="none"
                stroke="#FFD700"
                strokeWidth="1.5"
                opacity="0.5"
            />

            {/* Anillo medio */}
            <circle
                cx="23"
                cy="23"
                r="12"
                fill="none"
                stroke="#B8860B"
                strokeWidth="1.2"
                opacity="0.4"
            />

            {/* Bug icon (bicho de testing) en el centro */}
            {/* Cuerpo del bug */}
            <ellipse
                cx="23"
                cy="23"
                rx="5"
                ry="6.5"
                fill="#0F172A"
            />

            {/* Cabeza del bug */}
            <circle
                cx="23"
                cy="17"
                r="3"
                fill="#0F172A"
            />

            {/* Antenas */}
            <path d="M21 15 L19 12" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M25 15 L27 12" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />

            {/* Patas izquierdas */}
            <path d="M18 20 L15 19" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M18 23 L14 23" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M18 26 L15 27" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />

            {/* Patas derechas */}
            <path d="M28 20 L31 19" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M28 23 L32 23" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M28 26 L31 27" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />

            {/* Líneas tech en los bordes */}
            <path d="M23 4 L23 7" stroke="#FFE55C" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
            <path d="M23 39 L23 42" stroke="#FFE55C" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
            <path d="M4 23 L7 23" stroke="#FFE55C" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
            <path d="M39 23 L42 23" stroke="#FFE55C" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

            {/* Marcas diagonales tech */}
            <path d="M9 9 L12 12" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <path d="M34 34 L37 37" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <path d="M9 37 L12 34" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <path d="M34 12 L37 9" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

            {/* Brillo superior 3D */}
            <ellipse
                cx="23"
                cy="14"
                rx="10"
                ry="4"
                fill="#FFFFFF"
                opacity="0.4"
            />

            {/* Destellos en los bordes */}
            <circle cx="12" cy="12" r="1.5" fill="#FFE55C" opacity="0.8" />
            <circle cx="34" cy="12" r="1.5" fill="#FFE55C" opacity="0.8" />
            <circle cx="12" cy="34" r="1.5" fill="#FFE55C" opacity="0.8" />
            <circle cx="34" cy="34" r="1.5" fill="#FFE55C" opacity="0.8" />

            {/* Gradientes */}
            <defs>
                <linearGradient id="coinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="50%" stopColor="#DAA520" />
                    <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>

                <linearGradient id="coinBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFE55C" />
                    <stop offset="50%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#FFE55C" />
                </linearGradient>
            </defs>
        </svg>
    );
};