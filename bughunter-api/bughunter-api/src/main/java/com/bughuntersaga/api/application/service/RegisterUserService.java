
package com.bughuntersaga.api.application.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.bughuntersaga.api.domain.model.User;
import com.bughuntersaga.api.infrastructure.persistence.repository.UserRepository;
import com.bughuntersaga.api.infrastructure.security.jwt.JwtUtil;
import com.bughuntersaga.api.infrastructure.web.dto.UserLoginDTO;
import com.bughuntersaga.api.infrastructure.web.dto.AuthResponseDTO;
import com.bughuntersaga.api.infrastructure.web.dto.UserInfoDTO;

@Service
@RequiredArgsConstructor
public class RegisterUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponseDTO register(UserLoginDTO request) {
        // Validar que no exista usuario con ese username o email
        if (userRepository.findByUsername(request.emailOrUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (userRepository.findByEmail(request.emailOrUsername()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        // Crear nuevo usuario
        String passwordHash = passwordEncoder.encode(request.password());
        User newUser = User.builder()
                .username(request.emailOrUsername())
                .email(request.emailOrUsername().contains("@") ? request.emailOrUsername()
                        : request.emailOrUsername() + "@default.local")
                .passwordHash(passwordHash)
                .name(request.emailOrUsername())
                .lastname("User") // Valor por defecto
                .build();

        User savedUser = userRepository.save(newUser);

        // Generar token JWT
        String token = jwtUtil.generateToken(savedUser.getUsername());

        // Devolver respuesta
        UserInfoDTO userInfo = new UserInfoDTO(
                savedUser.getId().toString(),
                savedUser.getUsername(),
                savedUser.getName(),
                savedUser.getEmail());

        return new AuthResponseDTO(token, userInfo);
    }
}
