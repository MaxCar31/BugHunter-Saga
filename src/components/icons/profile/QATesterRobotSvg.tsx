export const QATesterRobotSvg = () => {
    return (
        <svg
            viewBox="0 0 50 50"
            fill="none"
            className="h-16 w-16 md:h-36 md:w-36"
        >
            {/* Antena */}
            <line x1="25" y1="6" x2="25" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
            <circle cx="25" cy="4.5" r="2" fill="white" opacity="0.9" />

            {/* Cabeza */}
            <circle cx="25" cy="18" r="9" fill="url(#hGrad)" stroke="white" strokeWidth="2" />
            <ellipse cx="21" cy="14" rx="4" ry="3" fill="white" opacity="0.35" />

            {/* Ojos */}
            <ellipse cx="21" cy="18" rx="2" ry="2.5" fill="white" opacity="0.95" />
            <ellipse cx="29" cy="18" rx="2" ry="2.5" fill="white" opacity="0.95" />
            <circle cx="21" cy="18.5" r="0.8" fill="rgba(0,0,0,0.3)" />
            <circle cx="29" cy="18.5" r="0.8" fill="rgba(0,0,0,0.3)" />

            {/* Sonrisa */}
            <path d="M21 22 Q25 24 29 22" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7" />

            {/* Símbolo QA - Checkmark en el pecho */}
            <path d="M21 35 L23.5 37.5 L29 32" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />

            {/* Cuello */}
            <rect x="22" y="26" width="6" height="3.5" rx="0.5" fill="url(#nGrad)" stroke="white" strokeWidth="1.2" />

            {/* Hombros */}
            <circle cx="16" cy="31" r="2.5" fill="url(#sGrad)" stroke="white" strokeWidth="1" />
            <circle cx="34" cy="31" r="2.5" fill="url(#sGrad)" stroke="white" strokeWidth="1" />

            {/* Cuerpo */}
            <path d="M18 31 L18 41 Q18 42 19 42 L31 42 Q32 42 32 41 L32 31 L28 29.5 L22 29.5 Z" fill="url(#bGrad)" stroke="white" strokeWidth="2" />

            {/* Brazos */}
            <rect x="13" y="32" width="3" height="8" rx="1.5" fill="url(#aGrad)" stroke="white" strokeWidth="1" />
            <rect x="34" y="32" width="3" height="8" rx="1.5" fill="url(#aGrad)" stroke="white" strokeWidth="1" />

            {/* Badge "TESTER" en brazo izquierdo */}
            <circle cx="14.5" cy="35" r="1.2" fill="white" opacity="0.3" />
            <text x="14.5" y="36" fontSize="2.5" fill="white" textAnchor="middle" fontWeight="bold" opacity="0.8">T</text>

            {/* Indicador online con pulso */}
            <circle cx="36" cy="26" r="2.5" fill="white" opacity="0.3" />
            <circle cx="36" cy="26" r="1.5" fill="white">
                <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Gradientes optimizados */}
            <defs>
                <linearGradient id="hGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0.65" />
                </linearGradient>
                <linearGradient id="nGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="bGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0.55" />
                </linearGradient>
                <linearGradient id="sGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="aGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0.5" />
                </linearGradient>
            </defs>
        </svg>
    );
};
