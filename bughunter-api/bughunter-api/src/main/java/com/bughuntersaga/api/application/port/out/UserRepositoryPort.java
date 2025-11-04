package com.bughuntersaga.api.application.port.out;

import com.bughuntersaga.api.domain.model.User;
import java.util.Optional;

public interface UserRepositoryPort {

    /**
     * Guarda o actualiza un usuario.
     */
    User save(User user);

    /**
     * Busca un usuario por su username.
     */
    Optional<User> findByUsername(String username);

    /**
     * Busca un usuario por su email.
     */
    Optional<User> findByEmail(String email);

    /**
     * Busca un usuario por username O email (para el login).
     */
    Optional<User> findByUsernameOrEmail(String username, String email);
}