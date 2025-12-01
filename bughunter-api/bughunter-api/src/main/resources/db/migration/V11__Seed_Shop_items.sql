-- ============================================================================
-- Migration: V11__populate_shop_items.sql
-- Description: Poblar tabla shop_items con artículos iniciales de la tienda
-- Fecha: 2025-01-XX
-- Autor: BugHunter Saga Team
-- ============================================================================

-- 🔍 Explicación:
-- Esta migración inserta los artículos iniciales de la tienda (shop_items)
-- que los usuarios pueden comprar con lingots (Puntos QA).
--
-- Items implementados:
-- 1. Doble XP (10 lingots) - Potenciador de XP que multiplica x2 en próxima lección
-- 2. Triple XP (20 lingots) - Potenciador de XP que multiplica x3 en próxima lección
-- 3. Avatar Tester (25 lingots) - Cosmético que cambia el avatar del usuario
--
-- Campos de la tabla shop_items:
-- - item_code: Identificador único del artículo (usado en lógica de backend)
-- - name: Nombre mostrado en UI (español)
-- - description: Descripción del artículo (español, para tooltip/card)
-- - cost: Precio en lingots (Puntos QA)
-- - icon: Emoji o código de icono para renderizar en frontend
--
-- Notas:
-- - Los item_code deben coincidir con los esperados por el backend
-- - Los iconos son emojis para simplicidad (⚡, 🔥, 🧑‍💻)
-- - Los costos están balanceados considerando:
--   * Lecciones otorgan 5 lingots (primera vez)
--   * Tesoros otorgan 20 lingots
--   * Sesión típica puede ganar 30-50 lingots

-- ============================================================================
-- 1. POTENCIADORES DE XP
-- ============================================================================

INSERT INTO shop_items (item_code, name, description, cost, icon)
VALUES
    -- Doble XP (Power-up de uso único)
    (
        'double-xp',
        'Doble XP',
        'Multiplica por 2 el XP que ganas en tu próxima lección completada. ¡Ideal para avanzar más rápido!',
        10,
        '⚡'
    ),

    -- Triple XP (Power-up premium de uso único)
    (
        'triple-xp',
        'Triple XP',
        'Multiplica por 3 el XP que ganas en tu próxima lección completada. ¡Progreso acelerado al máximo!',
        20,
        '🔥'
    );

-- ============================================================================
-- 2. COSMÉTICOS (PERSONALIZACIÓN)
-- ============================================================================

INSERT INTO shop_items (item_code, name, description, cost, icon)
VALUES
    -- Avatar Tester (Cosmético permanente)
    (
        'avatar-tester',
        'Avatar Tester',
        'Cambia tu avatar al estilo de un tester profesional. Este cambio es permanente y se verá en tu perfil.',
        25,
        '🧑‍💻'
    );

-- ============================================================================
-- Verificación de inserción
-- ============================================================================

-- Esta consulta puede ejecutarse manualmente para verificar que los items
-- se insertaron correctamente:
--
-- SELECT item_code, name, cost, icon FROM shop_items ORDER BY cost ASC;
--
-- Resultado esperado:
-- | item_code    | name         | cost | icon  |
-- |--------------|--------------|------|-------|
-- | double-xp    | Doble XP     | 10   | ⚡    |
-- | triple-xp    | Triple XP    | 20   | 🔥    |
-- | avatar-tester| Avatar Tester| 25   | 🧑‍💻  |

-- ============================================================================
-- Notas de Implementación
-- ============================================================================

-- 1. POWER-UPS (double-xp, triple-xp):
--    - Se compran en /shop
--    - Se guardan en user_inventory después de comprar
--    - Se ACTIVAN automáticamente al completar la siguiente lección
--    - Backend aplica multiplicador en CompleteLessonService:
--      * Consulta user_inventory para ver si tiene power-up activo
--      * Aplica multiplicador: baseXp * 2 (o * 3)
--      * Elimina power-up de user_inventory después de usar (consumido)
--
-- 2. COSMÉTICOS (avatar-tester):
--    - Se compran en /shop
--    - Se guardan en user_inventory (permanente, no se consume)
--    - Frontend lee user_inventory para determinar qué avatar mostrar
--    - Backend puede agregar campo 'active_avatar' en user_profiles
--      para rendimiento (evitar join en cada petición)
--
-- 3. EXTENSIBILIDAD:
--    Para agregar más items en el futuro, simplemente ejecutar:
--    INSERT INTO shop_items (item_code, name, description, cost, icon)
--    VALUES ('nuevo-item', 'Nombre', 'Descripción', 30, '🎁');
--
-- 4. INTEGRIDAD REFERENCIAL:
--    La tabla user_inventory tiene FK a shop_items.item_code,
--    por lo que NO se puede eliminar un item si usuarios lo poseen.
--    Para "desactivar" un item, agregar campo 'is_active BOOLEAN'
--    en una migración futura.

-- ============================================================================
-- Fin de la migración V11
-- ============================================================================