-- Añade columnas para el flujo de "olvidé mi contraseña"
ALTER TABLE users
    ADD COLUMN password_reset_token VARCHAR(255) NULL,
ADD COLUMN password_reset_expires TIMESTAMPTZ NULL;

-- (Opcional) Un índice en el token para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_users_password_reset_token ON users(password_reset_token);