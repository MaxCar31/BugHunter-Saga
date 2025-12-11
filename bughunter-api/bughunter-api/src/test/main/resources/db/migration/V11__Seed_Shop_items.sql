-- ============================================================================
-- Migration: V12__Add_Badges_And_Titles_Shop_Items.sql
-- Description: Sistema de badges y títulos para testing professionals
-- Fecha: 2025-12-02
-- Autor: BugHunter Saga Team
-- ============================================================================

-- 🔍 Explicación:
-- Esta migración agrega items visuales permanentes (badges + títulos)
-- relacionados con el mundo del testing y QA profesional.
--
-- Categorías:
-- 1. Badges (5): Insignias coleccionables permanentes
-- 2. Títulos (3): Texto personalizado bajo el nombre del usuario
--
-- IMPORTANTE:
-- - Esta es data NUEVA, NO elimina items existentes (double-xp, etc.)
-- - Si necesitas eliminar items antiguos, hazlo en una migración aparte
-- - Los items son permanentes (NO consumibles)
-- - Compra única por usuario (validado en backend)
-- - NO requieren condiciones especiales (solo tener suficientes Puntos QA)

-- ============================================================================
-- 1. BADGES (INSIGNIAS TESTING-THEMED)
-- ============================================================================

-- 🧪 Badge 1: Maestro de Pruebas (60 Puntos QA)
INSERT INTO shop_items (item_code, name, description, cost, icon)
VALUES (
    'badge-test-master',
    'Maestro de Pruebas',
    'Insignia permanente que demuestra tu dominio en testing de software. Solo se puede comprar una vez.',
    60,
    '🧪'
);

-- 🔍 Badge 2: Inspector de Calidad (120 Puntos QA)
INSERT INTO shop_items (item_code, name, description, cost, icon)
VALUES (
    'badge-quality-inspector',
    'Inspector de Calidad',
    'Insignia permanente para inspectores de calidad expertos. Solo se puede comprar una vez.',
    120,
    '🔍'
);

-- 🏆 Badge 3: Gurú del Testing (250 Puntos QA)
INSERT INTO shop_items (item_code, name, description, cost, icon)
VALUES (
    'badge-testing-guru',
    'Gurú del Testing',
    'Insignia permanente para maestros del testing. Máximo reconocimiento en BugHunter Saga.',
    250,
    '🏆'
);

-- 🔥 Badge 4: Tester Imparable (100 Puntos QA)
INSERT INTO shop_items (item_code, name, description, cost, icon)
VALUES (
    'badge-unstoppable-tester',
    'Tester Imparable',
    'Insignia permanente para testers imparables. Solo se puede comprar una vez.',
    100,
    '🔥'
);

-- 🐛 Badge 5: Cazador de Bugs (30 Puntos QA)
-- Badge de nivel inicial, disponible desde el principio
INSERT INTO shop_items (item_code, name, description, cost, icon)
VALUES (
    'badge-bug-hunter',
    'Cazador de Bugs',
    'Tu primera insignia. Demuestra que has comenzado tu viaje en el mundo del testing.',
    30,
    '🐛'
);

-- ============================================================================
-- 2. TÍTULOS PROFESIONALES (TESTING-THEMED)
-- ============================================================================

-- 🎯 Título 1: Cazador de Bugs (30 Puntos QA)
INSERT INTO shop_items (item_code, name, description, cost, icon)
VALUES (
    'title-bug-hunter',
    'Cazador de Bugs',
    'Título profesional que se muestra bajo tu nombre en el perfil y leaderboard. Indica tu especialidad en encontrar defectos.',
    30,
    '🎯'
);

-- 👑 Título 2: Maestro QA (50 Puntos QA)
INSERT INTO shop_items (item_code, name, description, cost, icon)
VALUES (
    'title-qa-master',
    'Maestro QA',
    'Título profesional que demuestra tu maestría en Quality Assurance. Se muestra bajo tu nombre en el perfil y leaderboard.',
    50,
    '👑'
);

-- ⭐ Título 3: Leyenda del Testing (80 Puntos QA)
INSERT INTO shop_items (item_code, name, description, cost, icon)
VALUES (
    'title-tester-legend',
    'Leyenda del Testing',
    'Título profesional de élite que te distingue como una leyenda en el mundo del testing. Se muestra bajo tu nombre en el perfil.',
    80,
    '⭐'
);

-- ============================================================================
-- VERIFICACIÓN DE INSERCIÓN
-- ============================================================================

-- Ejecutar manualmente para verificar:
-- SELECT item_code, name, cost, icon FROM shop_items WHERE item_code LIKE 'badge-%' OR item_code LIKE 'title-%' ORDER BY cost ASC;
--
-- Resultado esperado (8 items):
-- | item_code              | name                  | cost | icon |
-- |------------------------|-----------------------|------|------|
-- | title-bug-hunter       | Cazador de Bugs       | 30   | 🎯   |
-- | badge-bug-hunter       | Cazador de Bugs       | 30   | 🐛   |
-- | title-qa-master        | Maestro QA            | 50   | 👑   |
-- | badge-test-master      | Maestro de Pruebas    | 60   | 🧪   |
-- | title-tester-legend    | Leyenda del Testing   | 80   | ⭐   |
-- | badge-unstoppable-tester| Tester Imparable     | 100  | 🔥   |
-- | badge-quality-inspector| Inspector de Calidad  | 120  | 🔍   |
-- | badge-testing-guru     | Gurú del Testing      | 250  | 🏆   |

-- ============================================================================
-- NOTAS DE IMPLEMENTACIÓN (Backend)
-- ============================================================================

-- BADGES Y TÍTULOS:
-- - Son permanentes (NO se consumen después de comprar)
-- - Compra única validada en PurchaseItemService:
--   if (userInventoryRepository.existsByUserIdAndItemCode(userId, itemCode)) {
--       throw new ItemAlreadyOwnedException("Ya posees este item");
--   }
-- - NO requieren validaciones extra (módulos completados, rachas, etc.)
-- - SOLO se valida que el usuario tenga suficientes lingots (Puntos QA)
-- - Se muestran en /profile como grid de insignias o texto bajo el nombre

-- ECONOMÍA BALANCEADA:
-- - Lección primera vez: 5 Puntos QA
-- - Tesoro: 20 Puntos QA
-- - Sesión típica (5 lecciones + 1 tesoro): ~45 Puntos QA
--
-- Distribución de precios:
-- - Títulos básicos: 30-50 Puntos QA (1-2 sesiones)
-- - Badges básicos: 30-60 Puntos QA (1-2 sesiones)
-- - Badges intermedios: 100-120 Puntos QA (3-5 sesiones)
-- - Badges premium: 250 Puntos QA (8-10 sesiones)

-- ============================================================================
-- Fin de la migración V12
-- ============================================================================