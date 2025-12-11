-- ============================================================================
-- Migration: V2__Create_User_Profiles_Table.sql
-- Description: Crea la tabla de perfiles de usuario (user_profiles)
-- Author: BugHunter Saga Team
-- Date: 2025-10-26
-- ============================================================================

-- Tabla de perfiles de usuario (gamificación)
CREATE TABLE IF NOT EXISTS user_profiles (
                                             user_id UUID PRIMARY KEY,
                                             lingots INTEGER NOT NULL DEFAULT 0,
                                             daily_xp_goal INTEGER NOT NULL DEFAULT 10,
                                             sound_effects_enabled BOOLEAN NOT NULL DEFAULT true,

                                             CONSTRAINT fk_user_profiles_user
                                             FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    CONSTRAINT chk_lingots_positive CHECK (lingots >= 0),
    CONSTRAINT chk_daily_xp_goal_range CHECK (daily_xp_goal >= 1 AND daily_xp_goal <= 100)
    );