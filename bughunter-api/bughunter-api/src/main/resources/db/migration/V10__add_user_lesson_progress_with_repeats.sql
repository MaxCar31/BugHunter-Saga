-- Migración V10: Crear tabla user_lesson_progress con estructura para repeticiones
-- Esta tabla permite múltiples intentos de la misma lección por usuario

CREATE TABLE user_lesson_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    lesson_id INTEGER NOT NULL,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    score INTEGER,
    attempt_number INTEGER DEFAULT 1 NOT NULL,
    
    -- Foreign keys
    CONSTRAINT fk_user_lesson_progress_user 
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_lesson_progress_lesson 
        FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

-- Índices para optimizar consultas
CREATE INDEX idx_user_lesson_progress_user_id ON user_lesson_progress(user_id);
CREATE INDEX idx_user_lesson_progress_lesson_id ON user_lesson_progress(lesson_id);
CREATE INDEX idx_user_lesson_progress_user_lesson ON user_lesson_progress(user_id, lesson_id);
CREATE INDEX idx_user_lesson_progress_attempt ON user_lesson_progress(user_id, lesson_id, attempt_number);

-- Comentarios
COMMENT ON TABLE user_lesson_progress IS 'Progreso de lecciones con soporte para múltiples intentos';
COMMENT ON COLUMN user_lesson_progress.attempt_number IS 'Número de intento (1, 2, 3, ...)';