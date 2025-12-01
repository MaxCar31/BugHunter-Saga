import { useEffect } from "react";
import { CheckmarkSvg } from "~/components/icons/gamification";

interface TreasureCelebrationProps {
  lingotsEarned: number;
  onClose: () => void;
}

/**
 * Componente de celebración al reclamar un tesoro
 * Muestra una animación mejorada con los Puntos QA ganados
 */
export const TreasureCelebration: React.FC<TreasureCelebrationProps> = ({
  lingotsEarned,
  onClose,
}) => {
  // Auto-cerrar después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 animate-fade-in"
      onClick={onClose}
    >
      <div className="relative bg-gradient-to-br from-white to-yellow-50 rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 animate-scale-bounce overflow-hidden">
        {/* Rayos de fondo */}
        <div className="absolute inset-0 bg-rays opacity-20"></div>

        {/* Confetti decorativo */}
        <div className="absolute top-4 left-4 text-4xl animate-float-1">✨</div>
        <div className="absolute top-8 right-8 text-3xl animate-float-2">⭐</div>
        <div className="absolute bottom-12 left-12 text-2xl animate-float-3">💎</div>
        <div className="absolute bottom-8 right-4 text-3xl animate-float-1">🎉</div>

        <div className="relative z-10">
          {/* Icono de éxito */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Múltiples círculos de ping */}
              <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-20 animate-ping"></div>
              <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-30 animate-ping-slow"></div>
              <div className="absolute inset-0 bg-yellow-300 rounded-full opacity-10 animate-pulse"></div>

              <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full p-8 shadow-2xl transform animate-rotate-slight">
                <div className="scale-150">
                  <CheckmarkSvg />
                </div>
              </div>
            </div>
          </div>

          {/* Título */}
          <h2 className="text-4xl font-bold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-500 animate-pulse-slow">
            ¡Tesoro Reclamado!
          </h2>

          {/* Puntos ganados con efecto brillante */}
          <div className="relative bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-2xl p-8 mb-6 shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-shine opacity-30"></div>

            <div className="relative text-center">
              <div className="text-7xl font-bold text-white mb-2 animate-bounce-emphasis drop-shadow-lg">
                +{lingotsEarned}
              </div>
              <div className="text-2xl font-semibold text-yellow-100 tracking-wide">
                Puntos QA
              </div>
            </div>
          </div>

          {/* Mensaje */}
          <p className="text-center text-gray-700 text-lg font-medium mb-6">
            ¡Sigue aprendiendo para desbloquear más recompensas! 🚀
          </p>

          {/* Botón de cerrar */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-2xl transition-all transform hover:scale-105 active:scale-95 border-b-4 border-green-700 shadow-lg"
          >
            ¡Continuar Aprendiendo!
          </button>
        </div>
      </div>
    </div>
  );
};
