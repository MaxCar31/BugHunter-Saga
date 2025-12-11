/*
 * Índices de rendimiento para las Fases 4 y 6.
 */


CREATE INDEX IF NOT EXISTS idx_xp_history_user_id
    ON user_xp_history (user_id);


CREATE INDEX IF NOT EXISTS idx_xp_history_created_at
    ON user_xp_history (created_at);

