package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.dto.RegisterUserCommand;
import com.bughuntersaga.api.application.port.in.RegisterUserUseCase;
import com.bughuntersaga.api.application.port.out.PasswordEncoderPort;
import com.bughuntersaga.api.application.port.out.TokenGeneratorPort;
import com.bughuntersaga.api.application.port.out.UserProfileRepositoryPort;
import com.bughuntersaga.api.application.port.out.UserRepositoryPort;
import com.bughuntersaga.api.domain.exception.EmailAlreadyExistsException;
import com.bughuntersaga.api.domain.exception.UsernameAlreadyExistsException;
import com.bughuntersaga.api.domain.model.AuthToken;
import com.bughuntersaga.api.domain.model.User;
import com.bughuntersaga.api.domain.model.UserProfile;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RegisterUserService implements RegisterUserUseCase {

    // --- ¡ARQUITECTURA CORRECTA! ---
    // Solo depende de interfaces (Puertos)
    private final UserRepositoryPort userRepositoryPort;
    private final UserProfileRepositoryPort userProfileRepositoryPort;
    private final PasswordEncoderPort passwordEncoderPort;
    private final TokenGeneratorPort tokenGeneratorPort;

    @Override
    @Transactional
    public AuthToken register(RegisterUserCommand command) {
        log.info("Iniciando registro para el usuario: {}", command.getUsername());

        // 1. Validar duplicados (usando el puerto)
        if (userRepositoryPort.findByUsername(command.getUsername()).isPresent()) {
            throw new UsernameAlreadyExistsException("El username ya existe: " + command.getUsername());
        }
        if (userRepositoryPort.findByEmail(command.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("El email ya existe: " + command.getEmail());
        }

        // 2. Codificar password (usando el puerto)
        String passwordHash = passwordEncoderPort.encode(command.getRawPassword());

        // 3. Crear usuario (Modelo de Dominio)
        User newUserDomain = User.builder()
                .username(command.getUsername())
                .email(command.getEmail())
                .passwordHash(passwordHash)
                .name(command.getName())
                .build();

        // 4. Guardar (usando el puerto)
        User savedUserDomain = userRepositoryPort.save(newUserDomain);

        // 5. Crear perfil
        UserProfile newProfile = UserProfile.builder()
                .userId(savedUserDomain.getId())
                .lingots(0)
                .dailyXpGoal(10)
                .soundEffectsEnabled(true)
                .build();

        userProfileRepositoryPort.save(newProfile);

        // 6. Generar token (usando el puerto)
        String token = tokenGeneratorPort.generateToken(savedUserDomain.getUsername());

        return AuthToken.builder()
                .token(token)
                .user(savedUserDomain)
                .build();
    }
}