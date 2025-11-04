package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.dto.LoginUserCommand;
import com.bughuntersaga.api.application.port.in.LoginUserUseCase;
import com.bughuntersaga.api.application.port.out.PasswordEncoderPort;
import com.bughuntersaga.api.application.port.out.TokenGeneratorPort;
import com.bughuntersaga.api.application.port.out.UserRepositoryPort;
import com.bughuntersaga.api.domain.exception.InvalidCredentialsException;
import com.bughuntersaga.api.domain.model.AuthToken;
import com.bughuntersaga.api.domain.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginUserService implements LoginUserUseCase {


    private final UserRepositoryPort userRepositoryPort;
    private final PasswordEncoderPort passwordEncoderPort;
    private final TokenGeneratorPort tokenGeneratorPort;

    @Override
    @Transactional(readOnly = true) // Login es de solo lectura
    public AuthToken login(LoginUserCommand command) {
        log.info("Intento de login para: {}", command.getEmailOrUsername());

        // 1. Buscar usuario (usando el puerto)
        User user = userRepositoryPort.findByUsernameOrEmail(command.getEmailOrUsername(), command.getEmailOrUsername())
                .orElseThrow(() -> {
                    log.warn("Login fallido: Usuario no encontrado - {}", command.getEmailOrUsername());
                    // Lanza una excepción de dominio, no de infraestructura
                    return new InvalidCredentialsException("Credenciales inválidas");
                });

        // 2. Validar contraseña (usando el puerto)
        if (!passwordEncoderPort.matches(command.getPassword(), user.getPasswordHash())) {
            log.warn("Login fallido: Contraseña inválida para - {}", command.getEmailOrUsername());
            throw new InvalidCredentialsException("Credenciales inválidas");
        }

        // 3. Generar token (usando el puerto)
        log.info("Contraseña válida. Generando token para: {}", user.getUsername());
        String token = tokenGeneratorPort.generateToken(user.getUsername());

        log.info("Login exitoso para: {}", user.getUsername());
        return AuthToken.builder()
                .token(token)
                .user(user)
                .build();
    }
}