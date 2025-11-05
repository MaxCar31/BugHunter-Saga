package com.bughuntersaga.api.infrastructure.persistence.adapter;

import com.bughuntersaga.api.application.port.out.UserXpHistoryRepositoryPort;
import com.bughuntersaga.api.domain.model.UserXpHistory;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserEntity;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserXpHistoryEntity;
import com.bughuntersaga.api.infrastructure.persistence.mapper.GamificationPersistenceMapper;
import com.bughuntersaga.api.infrastructure.persistence.repository.UserJpaRepository;
import com.bughuntersaga.api.infrastructure.persistence.repository.UserXpHistoryJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import java.time.ZonedDateTime;
import java.util.UUID;

@Repository
@RequiredArgsConstructor

public class UserXpHistoryRepositoryAdapter implements UserXpHistoryRepositoryPort {

    private final UserXpHistoryJpaRepository jpaRepository;
    private final UserJpaRepository userJpaRepository;
    private final GamificationPersistenceMapper mapper;

    @Override
    public UserXpHistory save(UserXpHistory history) {

        UserXpHistoryEntity entity = mapper.toEntity(history);
        UserEntity userEntity = userJpaRepository.findById(history.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado al guardar XP: " + history.getUserId()));
        entity.setUser(userEntity);
        entity.setCreatedAt(history.getCreatedAt());
        UserXpHistoryEntity savedEntity = jpaRepository.save(entity);
        return mapper.toDomain(savedEntity);
    }

    @Override
    public int sumTotalXpByUserId(UUID userId) {
        return jpaRepository.sumTotalXpByUserId(userId);
    }

    @Override
    public int sumXpEarnedBetween(UUID userId, ZonedDateTime start, ZonedDateTime end) {
        return jpaRepository.sumXpEarnedBetween(userId, start, end);
    }
}