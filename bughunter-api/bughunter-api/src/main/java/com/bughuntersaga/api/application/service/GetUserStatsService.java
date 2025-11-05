package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.port.in.GetUserStatsUseCase;
import com.bughuntersaga.api.application.port.in.UserStatsResult;
import com.bughuntersaga.api.application.port.out.UserProfileRepositoryPort;
import com.bughuntersaga.api.application.port.out.UserRepositoryPort;
import com.bughuntersaga.api.application.port.out.UserStreakRepositoryPort;
import com.bughuntersaga.api.application.port.out.UserXpHistoryRepositoryPort;
import com.bughuntersaga.api.domain.exception.UserNotFoundException;
import com.bughuntersaga.api.domain.model.User;
import com.bughuntersaga.api.domain.model.UserProfile;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true) // Este endpoint es de solo lectura
public class GetUserStatsService implements GetUserStatsUseCase {

    private final UserRepositoryPort userRepositoryPort;
    private final UserProfileRepositoryPort userProfileRepositoryPort;
    private final UserXpHistoryRepositoryPort userXpHistoryRepositoryPort;
    private final UserStreakRepositoryPort userStreakRepositoryPort;
    private final Clock clock;

    private static final ZoneId UTC_ZONE = ZoneId.of("UTC");

    @Override
    public UserStatsResult getStats() {

        // 1. OBTENER USUARIO Y ESTADO ACTUAL
        User currentUser = getCurrentUser();
        UUID userId = currentUser.getId();
        UserProfile userProfile = getUserProfile(userId);

        ZonedDateTime now = ZonedDateTime.now(clock.withZone(UTC_ZONE));
        LocalDate today = now.toLocalDate();

        // 2. OBTENER DATOS FÁCILES (DEL PERFIL)
        int totalLingots = userProfile.getLingots();

        // 3. OBTENER DATOS DE RACHA
        Set<LocalDate> activeDays = userStreakRepositoryPort.findAllActivityDatesByUserId(userId);
        int currentStreak = calculateCurrentStreak(activeDays, today);

        // 4. OBTENER DATOS AGREGADOS (XP)
        int totalXp = userXpHistoryRepositoryPort.sumTotalXpByUserId(userId);

        // Calcular rangos de fecha
        ZonedDateTime startOfToday = today.atStartOfDay(UTC_ZONE);
        ZonedDateTime startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY)).atStartOfDay(UTC_ZONE);

        int xpToday = userXpHistoryRepositoryPort.sumXpEarnedBetween(userId, startOfToday, now);
        int xpThisWeek = userXpHistoryRepositoryPort.sumXpEarnedBetween(userId, startOfWeek, now);

        // 5. CONSTRUIR RESULTADO
        // leagueRank se deja como null (es de Fase 6)

        return new UserStatsResult(
                totalXp,
                totalLingots,
                currentStreak,
                xpToday,
                xpThisWeek,
                null, // leagueRank
                activeDays
        );
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
     * Lógica de cálculo de racha. (Reutilizada de CompleteLessonService)
     */
    private int calculateCurrentStreak(Set<LocalDate> allDates, LocalDate today) {
        int currentStreak = 0;
        LocalDate dayToCheck = today;

        while (allDates.contains(dayToCheck)) {
            currentStreak++;
            dayToCheck = dayToCheck.minusDays(1);
        }
        return currentStreak;
    }
}