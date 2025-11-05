package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.dto.ForgotPasswordCommand;
import com.bughuntersaga.api.application.port.in.ForgotPasswordUseCase;
import com.bughuntersaga.api.application.port.out.EmailSenderPort;
import com.bughuntersaga.api.application.port.out.UserRepositoryPort;
import com.bughuntersaga.api.domain.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.ZonedDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ForgotPasswordService implements ForgotPasswordUseCase {

    private final UserRepositoryPort userRepositoryPort;
    private final EmailSenderPort emailSenderPort;
    private final Clock clock; // (Asegúrate de tener este Bean de Fase 3)

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendBaseUrl;

    @Value("${app.security.reset-token-duration-hours:1}")
    private long resetTokenDurationHours;

    @Override
    @Transactional
    public void handle(ForgotPasswordCommand command) {

        Optional<User> userOptional = userRepositoryPort.findByEmail(command.getEmail());

        // --- ¡PROTECCIÓN DE SEGURIDAD! ---
        // Si el usuario no existe, NO lanzamos un error.
        // Simplemente terminamos la ejecución silenciosamente.
        // Esto previene que los atacantes "adivinen" qué emails están registrados.
        if (userOptional.isEmpty()) {
            log.warn("Solicitud de reseteo para email no existente: {}", command.getEmail());
            return; // No hacer nada
        }

        User user = userOptional.get();
        ZonedDateTime now = ZonedDateTime.now(clock);

        // 1. Generar Token
        String token = UUID.randomUUID().toString();

        // 2. Establecer Expiración
        user.setPasswordResetToken(token);
        user.setPasswordResetExpires(now.plusHours(resetTokenDurationHours));

        // 3. Guardar en BD
        userRepositoryPort.save(user);

        // 4. Pedir al puerto de email que envíe
        String resetUrlBase = frontendBaseUrl + "/reset-password";
        emailSenderPort.sendPasswordResetEmail(user, token, resetUrlBase);

        log.info("Token de reseteo generado para el usuario: {}", user.getUsername());
    }
}