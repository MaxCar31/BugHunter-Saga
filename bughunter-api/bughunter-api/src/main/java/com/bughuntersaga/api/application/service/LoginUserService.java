
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
public class LoginUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponseDTO login(UserLoginDTO request) {
        // Buscar usuario por username o email
        User user = userRepository.findByUsernameOrEmail(request.emailOrUsername(), request.emailOrUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Validar contraseña
        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid password");
        }

        // Generar token JWT
        String token = jwtUtil.generateToken(user.getUsername());

        // Devolver respuesta
        UserInfoDTO userInfo = new UserInfoDTO(
                user.getId().toString(),
                user.getUsername(),
                user.getName(),
                user.getEmail());

        return new AuthResponseDTO(token, userInfo);
    }
}
