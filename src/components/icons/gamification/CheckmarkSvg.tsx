/**
 * 🔍 Explicación:
 * Icono de checkmark (marca de verificación) mejorado para el roadmap/mapa de aprendizaje.
 * Diseño minimalista y ligero que representa lecciones completadas.
 * Usado en: TileIcon.tsx para mostrar el estado de completitud de lecciones.
 * 
 * Características:
 * - Estilo flat design limpio
 * - Círculo verde suave (color de éxito)
 * - Checkmark blanco prominente
 * - Sin efectos pesados (optimizado para rendimiento)
 * - Tamaño: 42x42 para consistencia con otros iconos del roadmap
 */

export const CheckmarkSvg = () => {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Círculo exterior verde claro (borde suave) */}
      <circle
        cx="21"
        cy="21"
        r="20"
        fill="#E8F5E9"
      />

      {/* Círculo principal verde */}
      <circle
        cx="21"
        cy="21"
        r="17"
        fill="#58CC02"
      />

      {/* Checkmark blanco (forma de "V" rotada) */}
      <path
        d="M 14 21 L 18.5 25.5 L 28 16"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Brillo sutil superior izquierdo */}
      <circle
        cx="17"
        cy="17"
        r="2"
        fill="#FFFFFF"
        opacity="0.3"
      />
    </svg>
  );
};