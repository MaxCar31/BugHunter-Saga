package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.port.in.GetLeaderboardUseCase;
import com.bughuntersaga.api.application.port.out.LeaderboardData;
import com.bughuntersaga.api.application.port.out.LeaderboardRepositoryPort;
import com.bughuntersaga.api.application.port.out.UserRepositoryPort;
import com.bughuntersaga.api.domain.exception.UserNotFoundException;
import com.bughuntersaga.api.domain.model.Leaderboard;
import com.bughuntersaga.api.domain.model.LeaderboardEntry;
import com.bughuntersaga.api.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetLeaderboardService implements GetLeaderboardUseCase {

    private final LeaderboardRepositoryPort leaderboardRepositoryPort;
    private final UserRepositoryPort userRepositoryPort;
    private final Clock clock;

    private static final ZoneId UTC_ZONE = ZoneId.of("UTC");

    @Override
    public Leaderboard getLeaderboard() {
        // 1. OBTENER ESTADO ACTUAL
        User currentUser = getCurrentUser();
        ZonedDateTime now = ZonedDateTime.now(clock.withZone(UTC_ZONE));

        // 2. CALCULAR RANGO DE LA SEMANA (Lunes 00:00 a Domingo 23:59 en UTC)
        ZonedDateTime startOfWeek = now.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY))
                .toLocalDate().atStartOfDay(UTC_ZONE);
        ZonedDateTime endOfWeek = now.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY))
                .toLocalDate().atTime(LocalTime.MAX).atZone(UTC_ZONE);

        // 3. OBTENER DATOS DE LA BD
        List<LeaderboardData> dbData = leaderboardRepositoryPort.findLeaderboardData(startOfWeek, endOfWeek);

        // 4. PROCESAR Y ENRIQUECER (Lógica de Negocio)
        List<LeaderboardEntry> entries = new ArrayList<>();
        int rank = 1;
        for (LeaderboardData data : dbData) {
            entries.add(LeaderboardEntry.builder()
                    .rank(rank++)
                    .name(data.name())
                    .xp(data.totalXp())
                    .isCurrentUser(data.userId().equals(currentUser.getId()))
                    .build());
        }

        // 5. CALCULAR TIEMPO RESTANTE
        String timeUntilEnd = formatTimeUntilEnd(now, endOfWeek);

        // 6. CONSTRUIR RESULTADO
        return Leaderboard.builder()
                .leagueName("Liga Bronce") // Fijo, como en el OpenAPI
                .timeUntilEnd(timeUntilEnd)
                .users(entries)
                .build();
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepositoryPort.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado: " + username));
    }

    private String formatTimeUntilEnd(ZonedDateTime now, ZonedDateTime endOfWeek) {
        Duration duration = Duration.between(now, endOfWeek);
        long days = duration.toDays();
        long hours = duration.toHours() % 24;

        if (days > 0) {
            return String.format("%d días %d horas restantes", days, hours);
        } else if (hours > 0) {
            return String.format("%d horas restantes", hours);
        } else {
            return String.format("%d minutos restantes", duration.toMinutes() % 60);
        }
    }
}