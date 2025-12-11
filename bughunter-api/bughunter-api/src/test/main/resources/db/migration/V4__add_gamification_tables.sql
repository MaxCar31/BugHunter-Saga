-- ============================================================================
-- Migration: V4__add_gamification_tables.sql
-- Description: Crea todas las tablas para gamificación (Fases 3, 4, 6)
-- ============================================================================

-- Tabla para los artículos de la tienda
CREATE TABLE IF NOT EXISTS shop_items (
                                          id SERIAL PRIMARY KEY,
                                          item_code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    cost INTEGER NOT NULL DEFAULT 0,
    icon VARCHAR(50)
    );

-- Tabla para el inventario del usuario
CREATE TABLE IF NOT EXISTS user_inventory (
                                              id SERIAL PRIMARY KEY,
                                              user_id UUID NOT NULL,
                                              item_code VARCHAR(50) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT (NOW()),

    CONSTRAINT fk_user_inventory_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

    CONSTRAINT fk_user_inventory_item
    FOREIGN KEY (item_code) REFERENCES shop_items(item_code) ON DELETE CASCADE,

    UNIQUE (user_id, item_code)
    );

-- Tabla para el historial de XP (para Stats y Leaderboard)
CREATE TABLE IF NOT EXISTS user_xp_history (
                                               id BIGSERIAL PRIMARY KEY,
                                               user_id UUID NOT NULL,
                                               xp_earned INTEGER NOT NULL,
                                               source_type VARCHAR(50), -- 'LESSON', 'TREASURE', etc.
    source_id INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_xp_history_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

-- Tabla para las rachas (streaks)
CREATE TABLE IF NOT EXISTS user_streaks (
                                            user_id UUID NOT NULL,
                                            activity_date DATE NOT NULL,

                                            PRIMARY KEY (user_id, activity_date), -- Clave primaria compuesta

    CONSTRAINT fk_streaks_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

-- Tabla para las ligas (leaderboard)
CREATE TABLE IF NOT EXISTS leagues (
                                       id SERIAL PRIMARY KEY,
                                       name VARCHAR(50) NOT NULL UNIQUE,
    min_xp INTEGER NOT NULL,
    max_xp INTEGER,
    icon VARCHAR(50)
    );

-- (Opcional) Poblar las ligas
INSERT INTO leagues (name, min_xp, max_xp, icon) VALUES
                                                     ('Bronce', 0, 500, '🥉'),
                                                     ('Plata', 501, 1500, '🥈'),
                                                     ('Oro', 1501, 3000, '🥇');