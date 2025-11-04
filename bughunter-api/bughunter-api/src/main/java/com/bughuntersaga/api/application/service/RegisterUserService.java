package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.dto.RegisterUserCommand;
import com.bughuntersaga.api.application.port.in.RegisterUserUseCase;
import com.bughuntersaga.api.application.port.out.UserProfileRepositoryPort;
import com.bughuntersaga.api.domain.exception.EmailAlreadyExistsException;
import com.bughuntersaga.api.domain.exception.UsernameAlreadyExistsException;
import com.bughuntersaga.api.domain.model.AuthToken;
import com.bughuntersaga.api.domain.model.User;
import com.bughuntersaga.api.domain.model.UserProfile;
import com.bughuntersaga.api.infrastructure.persistence.repository.UserRepository;
import com.bughuntersaga.api.infrastructure.security.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RegisterUserService implements RegisterUserUseCase {

    private final UserRepository userRepository;
    private final UserProfileRepositoryPort userProfileRepositoryPort;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    @Transactional
    public AuthToken register(RegisterUserCommand command) {
        // Validar duplicados
        if (userRepository.findByUsername(command.getUsername()).isPresent()) {
            throw new UsernameAlreadyExistsException("El username ya existe: " + command.getUsername());
        }
        if (userRepository.findByEmail(command.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("El email ya existe: " + command.getEmail());
        }

        // Hashear contraseña
        String passwordHash = passwordEncoder.encode(command.getRawPassword());

        // Crear usuario
        User newUser = User.builder()
                .username(command.getUsername())
                .email(command.getEmail())
                .passwordHash(passwordHash)
                .name(command.getName())
                .build();

        User savedUser = userRepository.save(newUser);

        // Crear perfil por defecto
        UserProfile newProfile = UserProfile.builder()
                .userId(savedUser.getId())
                .lingots(0)
                .dailyXpGoal(10)
                .soundEffectsEnabled(true)
                .build();

        userProfileRepositoryPort.save(newProfile);

        // Generar token JWT
        String token = jwtUtil.generateToken(savedUser.getUsername());

        // Retornar token + usuario
        return AuthToken.builder()
                .token(token)
                .user(savedUser)
                .build();
    }
}
