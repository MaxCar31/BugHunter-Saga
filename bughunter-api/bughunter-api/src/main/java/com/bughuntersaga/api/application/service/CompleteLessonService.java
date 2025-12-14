package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.dto.CompleteLessonCommand;
import com.bughuntersaga.api.application.port.in.CompleteLessonResult;
import com.bughuntersaga.api.application.port.in.CompleteLessonUseCase;
import com.bughuntersaga.api.application.port.out.*;
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

    // Para consistencia en fechas
    private final Clock clock;
    private static final ZoneId UTC_ZONE = ZoneId.of("UTC");

    // Valores de recompensa
    @Value("${app.rewards.lesson.baseXp:10}")
    private int BASE_XP;

    @Value("${app.rewards.lesson.lingot:5}")
    private int LINGOT_REWARD;

    // Recompensa reducida por practicar (repetir lección)
    private static final int PRACTICE_XP = 5;

    @Override
    @Transactional
    public CompleteLessonResult handle(CompleteLessonCommand command) {

        // 1. OBTENER ESTADO ACTUAL
        ZonedDateTime now = ZonedDateTime.now(clock.withZone(UTC_ZONE));
        LocalDate today = now.toLocalDate();

        User currentUser = getCurrentUser();
        UserProfile userProfile = getUserProfile(currentUser.getId());

        // Validamos que la lección exista (ya NO lanza error si está completada)
        ensureLessonExists(command.getLessonId());

        // 2. VERIFICAR SI ES UNA REPETICIÓN (PRÁCTICA)
        boolean isRepeat = userLessonProgressRepositoryPort
                .existsByUserIdAndLessonId(currentUser.getId(), command.getLessonId());

        // 3. LÓGICA DE PERSISTENCIA (PROGRESO)
        // Solo guardamos el progreso "Completado" si es la primera vez
        if (!isRepeat) {
            userLessonProgressRepositoryPort.save(UserLessonProgress.builder()
                    .userId(currentUser.getId())
                    .lessonId(command.getLessonId())
                    .completedAt(now)
                    .build());
        }

        // 4. CALCULAR RECOMPENSAS
        // Si repite: Gana XP de práctica (5) y 0 Lingots.
        // Si es nueva: Gana XP base + respuestas y Lingots completos.
        int xpEarned;
        int lingotsEarned;
        String sourceType;

        if (isRepeat) {
            xpEarned = PRACTICE_XP;
            lingotsEarned = 0; // No damos lingots por repetir
            sourceType = "PRACTICE"; // Diferenciamos en el historial
        } else {
            xpEarned = BASE_XP + command.getCorrectAnswerCount();
            lingotsEarned = command.getIsPractice() ? 0 : LINGOT_REWARD;
            sourceType = "LESSON";
        }

        // 5. GUARDAR HISTORIAL DE XP (Siempre se guarda, sea práctica o lección nueva)
        userXpHistoryRepositoryPort.save(UserXpHistory.builder()
                .userId(currentUser.getId())
                .xpEarned(xpEarned)
                .sourceType(sourceType)
                .sourceId(command.getLessonId())
                .createdAt(now)
                .build());

        // 6. ACTUALIZAR PERFIL (LINGOTS)
        // Solo si ganó algo (para evitar updates innecesarios)
        if (lingotsEarned > 0) {
            int newTotalLingots = userProfile.getLingots() + lingotsEarned;
            userProfile.setLingots(newTotalLingots);
            userProfileRepositoryPort.save(userProfile);
        }

        // 7. LÓGICA DE RACHA
        int newStreak = calculateAndUpdateStreak(currentUser.getId(), today);

        // 8. DEVOLVER RESULTADO
        return new CompleteLessonResult(xpEarned, lingotsEarned, userProfile.getLingots(), newStreak);
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

    /**
     * Valida solo que la lección exista en base de datos.
     * Ya no valida si el usuario la completó.
     */
    private void ensureLessonExists(Integer lessonId) {
        lessonRepositoryPort.findById(lessonId)
                .orElseThrow(() -> new LessonNotFoundException(lessonId));
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