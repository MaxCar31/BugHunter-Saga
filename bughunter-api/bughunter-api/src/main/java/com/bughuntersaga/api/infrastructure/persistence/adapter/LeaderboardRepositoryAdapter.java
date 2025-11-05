package com.bughuntersaga.api.infrastructure.persistence.adapter;

import com.bughuntersaga.api.application.port.out.LeaderboardData;
import com.bughuntersaga.api.application.port.out.LeaderboardRepositoryPort;
import com.bughuntersaga.api.infrastructure.persistence.repository.UserXpHistoryJpaRepository;
import com.bughuntersaga.api.infrastructure.persistence.repository.projections.LeaderboardProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class LeaderboardRepositoryAdapter implements LeaderboardRepositoryPort {

    private final UserXpHistoryJpaRepository userXpHistoryRepository;

    @Override
    public List<LeaderboardData> findLeaderboardData(ZonedDateTime start, ZonedDateTime end) {

        List<LeaderboardProjection> projections = userXpHistoryRepository
                .findLeaderboardForWeek(start, end);


        return projections.stream()
                .map(p -> new LeaderboardData(
                        p.getUserId(),
                        p.getName(),
                        p.getTotalXp()
                ))
                .collect(Collectors.toList());
    }
}