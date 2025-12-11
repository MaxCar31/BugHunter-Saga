package com.bughuntersaga.api.infrastructure.security.adapter;

import com.bughuntersaga.api.application.port.out.TokenGeneratorPort;
import com.bughuntersaga.api.infrastructure.security.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtTokenGeneratorAdapter implements TokenGeneratorPort {


    private final JwtUtil jwtUtil;

    @Override
    public String generateToken(String username) {
        return jwtUtil.generateToken(username);
    }
}