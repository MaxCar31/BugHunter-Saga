package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.port.in.ClaimTreasureResult;
import com.bughuntersaga.api.application.port.in.ClaimTreasureUseCase;
import com.bughuntersaga.api.application.port.out.LessonRepositoryPort;
import com.bughuntersaga.api.application.port.out.UserProfileRepositoryPort;
import com.bughuntersaga.api.application.port.out.UserRepositoryPort;
import com.bughuntersaga.api.application.port.out.UserLessonProgressRepositoryPort;
import com.bughuntersaga.api.domain.exception.LessonNotFoundException;
import com.bughuntersaga.api.domain.exception.TreasureAlreadyClaimedException;
import com.bughuntersaga.api.domain.exception.UserNotFoundException;
import com.bughuntersaga.api.domain.model.Lesson;
import com.bughuntersaga.api.domain.model.User;
import com.bughuntersaga.api.domain.model.UserLessonProgress;
import com.bughuntersaga.api.domain.model.UserProfile;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;

@Service
@RequiredArgsConstructor
public class ClaimTreasureService implements ClaimTreasureUseCase {


    private final UserRepositoryPort userRepositoryPort;
    private final UserProfileRepositoryPort userProfileRepositoryPort;
    private final LessonRepositoryPort lessonRepositoryPort;
    private final UserLessonProgressRepositoryPort userLessonProgressRepositoryPort;

    @Value("${app.rewards.treasure:20}")
    private int TREASURE_REWARD_LINGOTS;

    @Override
    @Transactional // ¡MUY IMPORTANTE! Esto asegura atomicidad
    public ClaimTreasureResult claimTreasure(Integer lessonId) {

        // 1. Obtener usuario autenticado (Lógica de Seguridad)
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepositoryPort.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado: " + username));

        // 2. Validar la Lección (Lógica de Negocio)
        Lesson lesson = lessonRepositoryPort.findById(lessonId)
                .orElseThrow(() -> new LessonNotFoundException(lessonId));

        if (!"treasure".equalsIgnoreCase(lesson.getType())) {
            throw new IllegalArgumentException("La lección no es un tesoro.");
        }

        // 3. Validar que no se haya reclamado (Lógica de Negocio)
        boolean alreadyClaimed = userLessonProgressRepositoryPort
                .existsByUserIdAndLessonId(currentUser.getId(), lessonId);

        if (alreadyClaimed) {
            throw new TreasureAlreadyClaimedException("Tesoro ya reclamado por el usuario.");
        }

        // 4. Otorgar recompensa (Lógica de Negocio)
        UserProfile userProfile = userProfileRepositoryPort.findById(currentUser.getId())
                .orElseThrow(() -> new UserNotFoundException("Perfil de usuario no encontrado."));

        userProfile.setLingots(userProfile.getLingots() + TREASURE_REWARD_LINGOTS);
        userProfileRepositoryPort.save(userProfile); // Guardar el perfil actualizado

        // 5. Marcar como reclamado (Lógica de Negocio)
        UserLessonProgress progress = UserLessonProgress.builder()
                .userId(currentUser.getId())
                .lessonId(lessonId)
                .completedAt(ZonedDateTime.now())
                .build();

        userLessonProgressRepositoryPort.save(progress);

        // 6. Devolver resultado
        return new ClaimTreasureResult(TREASURE_REWARD_LINGOTS, userProfile.getLingots());
    }
}