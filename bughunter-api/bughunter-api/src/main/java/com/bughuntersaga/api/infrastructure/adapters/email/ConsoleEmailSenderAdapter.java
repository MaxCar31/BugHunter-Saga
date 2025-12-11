package com.bughuntersaga.api.infrastructure.adapters.email;

import com.bughuntersaga.api.application.port.out.EmailSenderPort;
import com.bughuntersaga.api.domain.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/**
 * Adaptador de Email "Simulado" (Mock/Stub).
 * En lugar de enviar un email real, imprime el enlace en la consola.
 * Perfecto para desarrollo y pruebas.
 */
@Component
@Slf4j
public class ConsoleEmailSenderAdapter implements EmailSenderPort {

    @Override
    public void sendPasswordResetEmail(User user, String token, String resetUrlBase) {
        String resetLink = resetUrlBase + "?token=" + token;

        log.info("==================================================");
        log.info("===== SIMULACIÓN DE ENVÍO DE EMAIL =====");
        log.info("Para: {}", user.getEmail());
        log.info("Asunto: Resetea tu contraseña de BugHunter Saga");
        log.info("Cuerpo: ¡Hola, {}! Para resetear tu contraseña, haz clic en este enlace:", user.getName());
        log.info("Enlace: {}", resetLink);
        log.info("==================================================");
    }
}