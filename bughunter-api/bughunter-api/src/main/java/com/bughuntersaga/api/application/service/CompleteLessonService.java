package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.dto.CompleteLessonCommand;
import com.bughuntersaga.api.application.port.in.CompleteLessonResult;
import com.bughuntersaga.api.application.port.in.CompleteLessonUseCase;
import com.bughuntersaga.api.application.port.out.*;
import com.bughuntersaga.api.domain.exception.InsufficientScoreException;
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
        validateScore(command);

        // 2. CALCULAR NÚMERO DE INTENTO Y RECOMPENSAS
        int attemptNumber = userLessonProgressRepositoryPort.getNextAttemptNumber(currentUser.getId(),
                command.getLessonId());
        int completionsCount = userLessonProgressRepositoryPort.countCompletionsByUserIdAndLessonId(currentUser.getId(),
                command.getLessonId());

        System.out.println("🔢 DEBUG: Attempt calculation - userId: " + currentUser.getId() +
                ", lessonId: " + command.getLessonId() +
                ", attemptNumber: " + attemptNumber +
                ", completionsCount: " + completionsCount);

        int xpEarned;
        int lingotsEarned;

        if (command.getIsPractice()) {
            // Modo práctica: sin recompensas
            xpEarned = 0;
            lingotsEarned = 0;
        } else {
            // Lógica de XP proporcional por repetición:
            // XP base = 10, pero proporcional a respuestas correctas
            // 1ra vez: XP proporcional completo
            // 2da vez: 50% del XP proporcional
            // 3ra vez en adelante: 0 XP

            // Calcular XP proporcional basado en respuestas correctas
            // Ejemplo: 3/4 correctas = 7.5 XP, 2/4 correctas = 5 XP
            double baseXpForLesson = 10.0; // XP máximo por lección
            int totalQuestions = command.getCorrectAnswerCount() + command.getIncorrectAnswerCount();
            
            double proportionalXp;
            if (totalQuestions > 0) {
                // Usar conteo exacto de respuestas correctas e incorrectas
                proportionalXp = baseXpForLesson * ((double) command.getCorrectAnswerCount() / totalQuestions);
                System.out.println("🧮 DEBUG: XP calculation - correctAnswers: " + command.getCorrectAnswerCount() + 
                                 ", totalQuestions: " + totalQuestions + 
                                 ", proportionalXp: " + proportionalXp);
            } else {
                // Fallback: usar score como porcentaje (score = 75 significa 75%)
                proportionalXp = baseXpForLesson * (command.getScore() / 100.0);
                System.out.println("🧮 DEBUG: XP fallback calculation - score: " + command.getScore() + 
                                 "%, proportionalXp: " + proportionalXp);
            }

            if (completionsCount == 0) {
                // Primera completación exitosa - XP proporcional completo
                xpEarned = (int) Math.round(proportionalXp);
                lingotsEarned = LINGOT_REWARD;
            } else if (completionsCount == 1) {
                // Segunda completación exitosa - 50% del XP proporcional
                xpEarned = (int) Math.round(proportionalXp * 0.5);
                lingotsEarned = LINGOT_REWARD / 2;
            } else {
                // Tercera completación en adelante - sin recompensas
                xpEarned = 0;
                lingotsEarned = 0;
            }
        }

        // 3. LÓGICA DE PERSISTENCIA
        System.out.println("🎯 DEBUG: Guardando lección - userId: " + currentUser.getId() +
                ", lessonId: " + command.getLessonId() +
                ", score: " + command.getScore() +
                ", correctAnswers: " + command.getCorrectAnswerCount() +
                ", incorrectAnswers: " + command.getIncorrectAnswerCount() +
                ", attemptNumber: " + attemptNumber +
                ", completionsCount: " + completionsCount +
                ", xpEarned: " + xpEarned +
                ", lingotsEarned: " + lingotsEarned);

        // Guardar progreso de lección con número de intento
        userLessonProgressRepositoryPort.save(UserLessonProgress.builder()
                .userId(currentUser.getId())
                .lessonId(command.getLessonId())
                .completedAt(now)
                .score(command.getScore())
                .attemptNumber(attemptNumber)
                .build());

        // Guardar historial de XP solo si se ganó XP
        if (xpEarned > 0) {
            userXpHistoryRepositoryPort.save(UserXpHistory.builder()
                    .userId(currentUser.getId())
                    .xpEarned(xpEarned)
                    .sourceType("LESSON")
                    .sourceId(command.getLessonId())
                    .createdAt(now)
                    .build());
        }

        // Actualizar Lingots solo si se ganaron lingots
        if (lingotsEarned > 0) {
            int newTotalLingots = userProfile.getLingots() + lingotsEarned;
            userProfile.setLingots(newTotalLingots);
            userProfileRepositoryPort.save(userProfile);
        }

        // 4. LÓGICA DE RACHA (solo para primera completación del día)
        int newStreak = calculateAndUpdateStreak(currentUser.getId(), today);

        // 5. DEVOLVER RESULTADO
        int currentLingots = userProfile.getLingots() + lingotsEarned;
        return new CompleteLessonResult(xpEarned, lingotsEarned, currentLingots, newStreak);
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

        // Ya no necesitamos eliminar registros anteriores porque la nueva estructura
        // permite múltiples completaciones con attempt_number
        int completionsCount = userLessonProgressRepositoryPort.countCompletionsByUserIdAndLessonId(userId, lessonId);

        System.out.println("🔄 DEBUG: Lección validada - userId: " + userId +
                ", lessonId: " + lessonId +
                ", completaciones previas: " + completionsCount);
    }

    private void validateScore(CompleteLessonCommand command) {
        // Validar que el score no sea null cuando no es práctica
        if (!command.getIsPractice() && command.getScore() == null) {
            throw new IllegalArgumentException("Score es requerido para lecciones que no son práctica");
        }

        // Validar que el score sea >= 50% para pasar la lección (solo si no es
        // práctica)
        if (!command.getIsPractice() && command.getScore() != null && command.getScore() < 50) {
            throw new InsufficientScoreException(
                    "Se requiere al menos 50% de respuestas correctas para completar la lección. Score actual: "
                            + command.getScore() + "%");
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