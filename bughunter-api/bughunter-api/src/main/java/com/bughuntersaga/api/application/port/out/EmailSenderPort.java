package com.bughuntersaga.api.application.port.out;

import com.bughuntersaga.api.domain.model.User;

/**
 * Puerto de salida para un servicio de envío de emails.
 * La implementación (adaptador) podría ser SMTP, SendGrid, Mailgun, etc.
 */
public interface EmailSenderPort {

    /**
     * Envía un email de reseteo de contraseña al usuario.
     *
     * @param user El objeto User (que contiene el email)
     * @param token El token de reseteo (ej. "abc-123")
     * @param resetUrlBase La URL base para construir el enlace (ej. "http://localhost:3000/reset-password")
     */
    void sendPasswordResetEmail(User user, String token, String resetUrlBase);
}