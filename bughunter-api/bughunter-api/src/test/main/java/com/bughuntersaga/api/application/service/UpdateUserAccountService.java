package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.dto.UpdateUserAccountCommand;
import com.bughuntersaga.api.application.port.in.UpdateUserAccountUseCase;
import com.bughuntersaga.api.application.port.out.UserRepositoryPort;
import com.bughuntersaga.api.domain.exception.UserNotFoundException;
import com.bughuntersaga.api.domain.exception.UsernameAlreadyExistsException;
import com.bughuntersaga.api.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UpdateUserAccountService implements UpdateUserAccountUseCase {

    private final UserRepositoryPort userRepositoryPort;

    @Override
    @Transactional
    public User updateAccount(UpdateUserAccountCommand command) {
        // 1. Obtener usuario actual
        User currentUser = getCurrentUser();

        // 2. Validar unicidad del username (si cambió)
        if (command.getUsername() != null && !command.getUsername().equals(currentUser.getUsername())) {
            boolean exists = userRepositoryPort.existsByUsernameAndIdNot(command.getUsername(), currentUser.getId());
            if (exists) {
                throw new UsernameAlreadyExistsException("El username ya está en uso: " + command.getUsername());
            }
            currentUser.setUsername(command.getUsername());
        }

        // 3. Aplicar cambios
        if (command.getName() != null) {
            currentUser.setName(command.getName());
        }

        // 4. Guardar y devolver
        return userRepositoryPort.save(currentUser);
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepositoryPort.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado: " + username));
    }
}