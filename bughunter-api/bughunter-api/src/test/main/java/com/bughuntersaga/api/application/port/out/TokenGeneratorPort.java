package com.bughuntersaga.api.application.port.out;

public interface TokenGeneratorPort {
    /**
     * Genera un token (JWT) para un username específico.
     */
    String generateToken(String username);
}