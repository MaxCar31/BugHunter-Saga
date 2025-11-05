package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.dto.CompleteLessonCommand;
import com.bughuntersaga.api.application.port.in.CompleteLessonResult;
import com.bughuntersaga.api.application.port.in.CompleteLessonUseCase;
import com.bughuntersaga.api.application.port.out.*;
import com.bughuntersaga.api.domain.exception.LessonAlreadyCompletedException;
import com.bughuntersaga.api.domain.exception.LessonNotFoundException;
import com.bughuntersaga.api.domain.exception.UserNotFoundException;
import com.bughuntersaga.api.domain.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompleteLessonService implements CompleteLessonUseCase {

    // Puertos requeridos por este caso de uso
    private final UserRepositoryPort userRepositoryPort;
    private final UserProfileRepositoryPort userProfileRepositoryPort;
    private final LessonRepositoryPort lessonRepositoryPort;
    private final UserLessonProgressRepositoryPort userLessonProgressRepositoryPort;
    private final UserXpHistoryRepositoryPort userXpHistoryRepositoryPort;
    private final UserStreakRepositoryPort userStreakRepositoryPort;

    // Para consistencia en fechas (y facilitar pruebas)
    private final Clock clock;
    private static final ZoneId UTC_ZONE = ZoneId.of("UTC");

    // Valores de recompensa (configurables)
    @Value("${app.rewards.lesson.baseXp:10}")
    private int BASE_XP;

    @Value("${app.rewards.lesson.lingot:5}")
    private int LINGOT_REWARD;

    @Override
    @Transactional
    public CompleteLessonResult handle(CompleteLessonCommand command) {

        // 1. OBTENER ESTADO ACTUAL
        ZonedDateTime now = ZonedDateTime.now(clock.withZone(UTC_ZONE));
        LocalDate today = now.toLocalDate();

        User currentUser = getCurrentUser();
        UserProfile userProfile = getUserProfile(currentUser.getId());

        validateLesson(command.getLessonId(), currentUser.getId());

        // 2. CALCULAR RECOMPENSAS
        int xpEarned = BASE_XP + command.getCorrectAnswerCount();
        int lingotsEarned = command.getIsPractice() ? 0 : LINGOT_REWARD;

        // 3. LÓGICA DE PERSISTENCIA

        // Guardar progreso de lección
        userLessonProgressRepositoryPort.save(UserLessonProgress.builder()
                .userId(currentUser.getId())
                .lessonId(command.getLessonId())
                .completedAt(now)
                .build());

        // Guardar historial de XP
        userXpHistoryRepositoryPort.save(UserXpHistory.builder()
                .userId(currentUser.getId())
                .xpEarned(xpEarned)
                .sourceType("LESSON")
                .sourceId(command.getLessonId())
                .createdAt(now)
                .build());

        // Actualizar Lingots
        int newTotalLingots = userProfile.getLingots() + lingotsEarned;
        userProfile.setLingots(newTotalLingots);
        userProfileRepositoryPort.save(userProfile);

        // 4. LÓGICA DE RACHA
        int newStreak = calculateAndUpdateStreak(currentUser.getId(), today);

        // 5. DEVOLVER RESULTADO
        return new CompleteLessonResult(xpEarned, lingotsEarned, newTotalLingots, newStreak);
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepositoryPort.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado: " + username));
    }

    private UserProfile getUserProfile(UUID userId) {
        return userProfileRepositoryPort.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Perfil de usuario no encontrado."));
    }

    private void validateLesson(Integer lessonId, UUID userId) {
        // Validar que la lección existe (lanza excepción si no)
        lessonRepositoryPort.findById(lessonId)
                .orElseThrow(() -> new LessonNotFoundException(lessonId));

        // Validar que no se haya completado
        boolean alreadyCompleted = userLessonProgressRepositoryPort
                .existsByUserIdAndLessonId(userId, lessonId);

        if (alreadyCompleted) {
            throw new LessonAlreadyCompletedException("Lección ya completada: " + lessonId);
        }
    }

    /**
     * Lógica central de cálculo de racha.
     */
    private int calculateAndUpdateStreak(UUID userId, LocalDate today) {
        Set<LocalDate> allDates = userStreakRepositoryPort.findAllActivityDatesByUserId(userId);

        // Si el usuario ya jugó hoy, no guardamos de nuevo, solo calculamos
        if (!allDates.contains(today)) {
            userStreakRepositoryPort.save(UserStreak.builder()
                    .userId(userId)
                    .activityDate(today)
                    .build());

            // Añadimos 'hoy' al set para el cálculo
            allDates.add(today);
        }

        // Calculamos la racha contando hacia atrás desde 'hoy'
        int currentStreak = 0;
        LocalDate dayToCheck = today;

        while (allDates.contains(dayToCheck)) {
            currentStreak++;
            dayToCheck = dayToCheck.minusDays(1);
        }

        return currentStreak;
    }


}