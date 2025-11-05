package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.port.in.GetUserProfileUseCase;
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

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetUserProfileService implements GetUserProfileUseCase {

    private final UserRepositoryPort userRepositoryPort;
    private final UserProfileRepositoryPort userProfileRepositoryPort;

    @Override
    public FullUserProfile getProfile() {
        // 1. Obtener usuario autenticado
        User currentUser = getCurrentUser();
        UserProfile userProfile = getUserProfile(currentUser.getId());

        // 2. Combinar en el modelo de dominio
        return FullUserProfile.builder()
                .userId(currentUser.getId())
                .name(currentUser.getName())
                .username(currentUser.getUsername())
                .email(currentUser.getEmail())
                .joinedAt(currentUser.getCreatedAt())
                .lingots(userProfile.getLingots())
                .dailyXpGoal(userProfile.getDailyXpGoal())
                .soundEffectsEnabled(userProfile.getSoundEffectsEnabled())
                .build();
    }

    // --- Métodos de ayuda (reutilizables) ---

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepositoryPort.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado: " + username));
    }

    private UserProfile getUserProfile(UUID userId) {
        return userProfileRepositoryPort.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Perfil de usuario no encontrado."));
    }
}