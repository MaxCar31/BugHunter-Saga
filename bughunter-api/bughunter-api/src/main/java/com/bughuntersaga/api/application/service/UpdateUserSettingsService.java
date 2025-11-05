package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.dto.UpdateUserSettingsCommand;
import com.bughuntersaga.api.application.port.in.UpdateUserSettingsUseCase;
import com.bughuntersaga.api.application.port.out.UserProfileRepositoryPort;
import com.bughuntersaga.api.application.port.out.UserRepositoryPort;
import com.bughuntersaga.api.domain.exception.UserNotFoundException;
import com.bughuntersaga.api.domain.model.FullUserProfile;
import com.bughuntersaga.api.domain.model.User;
import com.bughuntersaga.api.domain.model.UserProfile;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List; // IMPORTAR
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UpdateUserSettingsService implements UpdateUserSettingsUseCase {

    private final UserRepositoryPort userRepositoryPort;
    private final UserProfileRepositoryPort userProfileRepositoryPort;

    // Lista de valores permitidos (definida en tu OpenAPI)
    private static final List<Integer> VALID_XP_GOALS = List.of(1, 10, 20, 30, 50);

    @Override
    @Transactional
    public FullUserProfile updateSettings(UpdateUserSettingsCommand command) {
        // 1. Obtener usuario y perfil
        User currentUser = getCurrentUser();
        UserProfile userProfile = getUserProfile(currentUser.getId());

        // 2. Aplicar cambios (solo si no son nulos)
        if (command.getDailyXpGoal() != null) {

            // --- ¡NUEVA VALIDACIÓN DE REGLA DE NEGOCIO! ---
            if (!VALID_XP_GOALS.contains(command.getDailyXpGoal())) {
                throw new IllegalArgumentException(
                        "Meta de XP inválida. Debe ser una de: " + VALID_XP_GOALS
                );
            }
            userProfile.setDailyXpGoal(command.getDailyXpGoal());
        }

        if (command.getSoundEffectsEnabled() != null) {
            userProfile.setSoundEffectsEnabled(command.getSoundEffectsEnabled());
        }

        // 3. Guardar cambios
        UserProfile updatedProfile = userProfileRepositoryPort.save(userProfile);

        // 4. Devolver el perfil combinado actualizado
        return FullUserProfile.builder()
                .userId(currentUser.getId())
                .name(currentUser.getName())
                .username(currentUser.getUsername())
                .email(currentUser.getEmail())
                .joinedAt(currentUser.getCreatedAt())
                .lingots(updatedProfile.getLingots())
                .dailyXpGoal(updatedProfile.getDailyXpGoal())
                .soundEffectsEnabled(updatedProfile.getSoundEffectsEnabled())
                .build();
    }

    // --- Métodos de ayuda ---
    private User getCurrentUser() {
        // ... (código existente)
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepositoryPort.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado: " + username));
    }

    private UserProfile getUserProfile(UUID userId) {
        // ... (código existente)
        return userProfileRepositoryPort.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Perfil de usuario no encontrado."));
    }
}