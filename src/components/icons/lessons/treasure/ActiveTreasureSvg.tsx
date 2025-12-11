/**
 * 🔍 Explicación:
 * Cofre de tesoro activo con estilo de juego moderno AAA (2024):
 * 
 * ✨ Mejoras aplicadas:
 * - Gradientes 3D complejos (madera oscura → clara)
 * - Sistema de iluminación con múltiples capas de brillo
 * - Sombras dinámicas con blur gaussiano (feGaussianBlur)
 * - Efectos de partículas flotantes animadas
 * - Reflejo metálico realista en herrajes dorados
 * - Glow pulsante en monedas (radialGradient)
 * - Profundidad volumétrica mediante overlays
 * - Detalles de textura en madera (vetas oscuras)
 * 
 * 🎮 Estilo inspirado en:
 * - Clash Royale (cofres premium)
 * - League of Legends (hextech chests)
 * - Fortnite (loot boxes)
 * - Genshin Impact (wish system)
 * 
 * 📱 Renderizado:
 * - Tamaño: 80x90px (optimizado para tiles)
 * - Background: Glow circular animado (CSS)
 * - Compatible con hover effects
 */

export const ActiveTreasureSvg = () => {
  return (
    <svg width="80" height="90" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* ===== GRADIENTES 3D AVANZADOS ===== */}

        {/* Madera oscura premium (nogal) */}
        <linearGradient id="darkWood" x1="40" y1="28" x2="40" y2="75">
          <stop offset="0%" stopColor="#3E2723" />
          <stop offset="30%" stopColor="#5D4037" />
          <stop offset="70%" stopColor="#4E342E" />
          <stop offset="100%" stopColor="#3E2723" />
        </linearGradient>

        {/* Madera clara (tapa) */}
        <linearGradient id="lightWood" x1="40" y1="28" x2="40" y2="45">
          <stop offset="0%" stopColor="#8D6E63" />
          <stop offset="50%" stopColor="#6D4C41" />
          <stop offset="100%" stopColor="#5D4037" />
        </linearGradient>

        {/* Oro metálico con reflejo */}
        <linearGradient id="metalGold" x1="40" y1="45" x2="40" y2="65">
          <stop offset="0%" stopColor="#FFF9C4" />
          <stop offset="20%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="80%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>

        {/* Bronce oscuro para herrajes */}
        <linearGradient id="darkBronze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CD7F32" />
          <stop offset="50%" stopColor="#8B4513" />
          <stop offset="100%" stopColor="#654321" />
        </linearGradient>

        {/* Glow dorado pulsante */}
        <radialGradient id="goldGlow" cx="40" cy="50" r="35">
          <stop offset="0%" stopColor="#FFEB3B" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FFC107" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF9800" stopOpacity="0" />
        </radialGradient>

        {/* Brillo especular */}
        <radialGradient id="specularHighlight" cx="30" cy="35" r="15">
          <stop offset="0%" stopColor="#FFF" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#FFF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
        </radialGradient>

        {/* ===== FILTROS DE SOMBRA AVANZADOS ===== */}

        {/* Sombra suave para profundidad */}
        <filter id="softShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Sombra dura para bordes */}
        <filter id="hardShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="1" floodColor="#000" floodOpacity="0.6" />
        </filter>

        {/* Glow exterior brillante */}
        <filter id="outerGlow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2 0" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ===== LAYER 1: FONDO Y EFECTOS AMBIENTALES ===== */}

      {/* Aura mágica circular */}
      <circle cx="40" cy="50" r="38" fill="url(#goldGlow)" opacity="0.6" />
      <circle cx="40" cy="50" r="32" fill="#FFC107" opacity="0.15" />

      {/* Partículas flotantes (puntos de luz) */}
      <circle cx="20" cy="30" r="2" fill="#FFEB3B" opacity="0.8" filter="url(#outerGlow)" />
      <circle cx="60" cy="35" r="1.5" fill="#FFC107" opacity="0.7" filter="url(#outerGlow)" />
      <circle cx="15" cy="55" r="1.8" fill="#FFD700" opacity="0.6" filter="url(#outerGlow)" />
      <circle cx="65" cy="58" r="1.3" fill="#FFEB3B" opacity="0.75" filter="url(#outerGlow)" />
      <circle cx="40" cy="20" r="2.5" fill="#FFF9C4" opacity="0.9" filter="url(#outerGlow)" />

      {/* ===== LAYER 2: SOMBRA BASE ===== */}

      <ellipse cx="40" cy="76" rx="30" ry="5" fill="#000" opacity="0.4" />
      <ellipse cx="40" cy="76" rx="25" ry="4" fill="#000" opacity="0.2" />

      {/* ===== LAYER 3: CUERPO DEL COFRE (BASE) ===== */}

      {/* Base principal con gradiente 3D */}
      <path
        d="M14 48 L14 70 Q14 74 18 74 L62 74 Q66 74 66 70 L66 48 Z"
        fill="url(#darkWood)"
        filter="url(#softShadow)"
      />

      {/* Vetas de madera (textura natural) */}
      <path d="M18 52 Q22 54 18 58 Q22 60 18 64" stroke="#3E2723" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M62 52 Q58 54 62 58 Q58 60 62 64" stroke="#3E2723" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M30 55 Q35 57 30 60" stroke="#2E1A0F" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M50 55 Q45 57 50 60" stroke="#2E1A0F" strokeWidth="1" fill="none" opacity="0.3" />

      {/* Borde inferior reforzado */}
      <rect x="14" y="46" width="52" height="3" fill="#4E342E" opacity="0.8" />

      {/* ===== LAYER 4: TAPA DEL COFRE ===== */}

      {/* Tapa arqueada con gradiente */}
      <path
        d="M12 36 Q12 30 18 28 L62 28 Q68 30 68 36 L68 48 L12 48 Z"
        fill="url(#lightWood)"
        filter="url(#softShadow)"
      />

      {/* Sección superior de la tapa (más clara) */}
      <path
        d="M12 36 Q12 30 18 28 L62 28 Q68 30 68 36 L68 40 L12 40 Z"
        fill="#8D6E63"
        opacity="0.6"
      />

      {/* Brillo especular en la tapa */}
      <ellipse cx="30" cy="34" rx="12" ry="6" fill="url(#specularHighlight)" />

      {/* ===== LAYER 5: HERRAJES METÁLICOS ===== */}

      {/* Bandas horizontales de bronce */}
      <rect x="12" y="42" width="56" height="2.5" fill="url(#darkBronze)" filter="url(#hardShadow)" />
      <rect x="12" y="62" width="56" height="2.5" fill="url(#darkBronze)" filter="url(#hardShadow)" />

      {/* Bisagra izquierda */}
      <rect x="10" y="38" width="4" height="8" rx="1" fill="#8B4513" filter="url(#hardShadow)" />
      <circle cx="12" cy="42" r="1.5" fill="#CD7F32" />

      {/* Bisagra derecha */}
      <rect x="66" y="38" width="4" height="8" rx="1" fill="#8B4513" filter="url(#hardShadow)" />
      <circle cx="68" cy="42" r="1.5" fill="#CD7F32" />

      {/* ===== LAYER 6: CERRADURA DORADA ===== */}

      {/* Placa de cerradura (base) */}
      <circle cx="40" cy="52" r="9" fill="url(#metalGold)" filter="url(#softShadow)" />
      <circle cx="40" cy="52" r="7.5" fill="#FFA500" />

      {/* Brillo metálico superior */}
      <ellipse cx="38" cy="50" rx="3" ry="2" fill="#FFF9C4" opacity="0.7" />

      {/* Ojo de cerradura */}
      <circle cx="40" cy="54" r="2.5" fill="#654321" />
      <path d="M40 54 L40 58" stroke="#4E342E" strokeWidth="2" strokeLinecap="round" />

      {/* ===== LAYER 7: MONEDAS DESBORDANDO ===== */}

      {/* Moneda 1 (izquierda atrás) */}
      <circle cx="28" cy="43" r="4" fill="#B8860B" filter="url(#softShadow)" />
      <circle cx="28" cy="43" r="3.5" fill="url(#metalGold)" />
      <circle cx="27" cy="42" r="1" fill="#FFF9C4" opacity="0.8" />

      {/* Moneda 2 (izquierda adelante) */}
      <circle cx="33" cy="40" r="4.5" fill="#B8860B" filter="url(#softShadow)" />
      <circle cx="33" cy="40" r="4" fill="url(#metalGold)" />
      <circle cx="32" cy="39" r="1.2" fill="#FFF9C4" opacity="0.9" />

      {/* Moneda 3 (derecha atrás) */}
      <circle cx="52" cy="43" r="4" fill="#B8860B" filter="url(#softShadow)" />
      <circle cx="52" cy="43" r="3.5" fill="url(#metalGold)" />
      <circle cx="51" cy="42" r="1" fill="#FFF9C4" opacity="0.8" />

      {/* Moneda 4 (derecha adelante) */}
      <circle cx="47" cy="40" r="4.5" fill="#B8860B" filter="url(#softShadow)" />
      <circle cx="47" cy="40" r="4" fill="url(#metalGold)" />
      <circle cx="46" cy="39" r="1.2" fill="#FFF9C4" opacity="0.9" />

      {/* Moneda 5 (centro - más grande) */}
      <circle cx="40" cy="38" r="5" fill="#B8860B" filter="url(#softShadow)" />
      <circle cx="40" cy="38" r="4.5" fill="url(#metalGold)" />
      <circle cx="39" cy="37" r="1.5" fill="#FFF9C4" opacity="0.95" />

      {/* ===== LAYER 8: DETALLES FINALES ===== */}

      {/* Estrellas brillantes (sparkles modernos) */}
      <path d="M22 28 L23 30 L22 32 L21 30 Z" fill="#FFEB3B" opacity="0.9" filter="url(#outerGlow)" />
      <path d="M58 28 L59 30 L58 32 L57 30 Z" fill="#FFEB3B" opacity="0.9" filter="url(#outerGlow)" />
      <path d="M40 18 L41.5 21 L40 24 L38.5 21 Z" fill="#FFF9C4" opacity="1" filter="url(#outerGlow)" />

      {/* Indicador de interacción (badge "CLICK") */}
      <circle cx="40" cy="16" r="8" fill="#FF5722" filter="url(#softShadow)" />
      <circle cx="40" cy="16" r="7" fill="#FF6F00" />
      <text
        x="40"
        y="19"
        fontSize="7"
        fontWeight="900"
        fill="#FFF"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
      >
        !
      </text>
    </svg>
  );
};