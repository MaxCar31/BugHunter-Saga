package com.bughuntersaga.api.application.port.out;

public interface PasswordEncoderPort {
    /**
     * Codifica una contraseña en texto plano.
     */
    String encode(String rawPassword);

    /**
     * Compara una contraseña en texto plano con una ya codificada.
     */
    boolean matches(String rawPassword, String encodedPassword);
}