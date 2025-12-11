import { CheckmarkSvg } from "~/components/icons/gamification";

interface TreasureCelebrationProps {
  lingotsEarned: number;
  onClose: () => void;
}

/**
 * Componente de celebración al reclamar un tesoro
 * Muestra una animación mejorada con los Puntos QA ganados
 * El usuario debe hacer clic manualmente para cerrar (sin auto-close)
 */
export const TreasureCelebration: React.FC<TreasureCelebrationProps> = ({
  lingotsEarned,
  onClose,
}) => {

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in px-4"
      onClick={onClose}
    >
      <div className="relative bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-3xl p-10 shadow-2xl max-w-lg w-full animate-scale-bounce overflow-hidden border-4 border-yellow-300/50">
        {/* Efecto de brillo de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-orange-400/20 blur-2xl"></div>

        {/* Rayos de fondo mejorados */}
        <div className="absolute inset-0 bg-rays opacity-10"></div>

        {/* Confetti decorativo mejorado */}
        <div className="absolute top-6 left-6 text-5xl animate-float-1 drop-shadow-lg">✨</div>
        <div className="absolute top-10 right-10 text-4xl animate-float-2 drop-shadow-lg">⭐</div>
        <div className="absolute bottom-16 left-16 text-3xl animate-float-3 drop-shadow-lg">💎</div>
        <div className="absolute bottom-10 right-6 text-4xl animate-float-1 drop-shadow-lg">🎉</div>
        <div className="absolute top-1/2 left-8 text-2xl animate-float-2 drop-shadow-lg">💫</div>
        <div className="absolute top-1/3 right-12 text-3xl animate-float-3 drop-shadow-lg">🌟</div>

        <div className="relative z-10" onClick={(e) => e.stopPropagation()}>
          {/* Icono de éxito mejorado */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Múltiples círculos de ping con mejor timing */}
              <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-20 animate-ping"></div>
              <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-30 animate-ping" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute inset-0 bg-yellow-300 rounded-full opacity-15 animate-pulse"></div>

              <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 rounded-full p-10 shadow-2xl transform animate-rotate-slight ring-4 ring-yellow-300/50">
                <div className="scale-[1.8]">
                  <CheckmarkSvg />
                </div>
              </div>
            </div>
          </div>

          {/* Título mejorado */}
          <h2 className="text-5xl font-black text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 drop-shadow-lg animate-pulse-slow">
            ¡Tesoro Reclamado!
          </h2>

          {/* Puntos ganados con efecto brillante mejorado */}
          <div className="relative bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-3xl p-10 mb-8 shadow-2xl overflow-hidden ring-4 ring-yellow-300/50">
            <div className="absolute inset-0 bg-shine opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>

            <div className="relative text-center">
              <div className="text-8xl font-black text-white mb-3 animate-bounce-emphasis drop-shadow-2xl">
                +{lingotsEarned}
              </div>
              <div className="text-3xl font-bold text-yellow-50 tracking-wide drop-shadow-lg">
                Puntos QA
              </div>
            </div>
          </div>

          {/* Mensaje mejorado */}
          <p className="text-center text-gray-800 text-xl font-bold mb-8 drop-shadow-sm">
            ¡Sigue aprendiendo para desbloquear más recompensas! 🚀
          </p>

          {/* Botón de cerrar mejorado */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 text-white font-black text-xl py-5 px-8 rounded-2xl transition-all transform hover:scale-105 active:scale-95 border-b-4 border-green-800 shadow-2xl ring-2 ring-green-300/50"
          >
            ¡Continuar Aprendiendo!
          </button>

          {/* Hint para el usuario */}
          <p className="mt-4 text-center text-sm text-gray-600 font-medium">
            Haz clic para ver tu progreso actualizado
          </p>
        </div>
      </div>
    </div>
  );
};
