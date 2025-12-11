package com.bughuntersaga.api.infrastructure.persistence.adapter;

import com.bughuntersaga.api.application.port.out.UserStreakRepositoryPort;
import com.bughuntersaga.api.domain.model.UserStreak;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserEntity;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserStreakEntity;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserStreakId;
import com.bughuntersaga.api.infrastructure.persistence.mapper.GamificationPersistenceMapper;
import com.bughuntersaga.api.infrastructure.persistence.repository.UserJpaRepository;
import com.bughuntersaga.api.infrastructure.persistence.repository.UserStreakJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class UserStreakRepositoryAdapter implements UserStreakRepositoryPort {

    private final UserStreakJpaRepository jpaRepository;
    private final UserJpaRepository userJpaRepository;
    private final GamificationPersistenceMapper mapper;

    @Override
    public UserStreak save(UserStreak streak) {

        UserEntity userEntity = userJpaRepository.findById(streak.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado al guardar racha: " + streak.getUserId()));


        UserStreakEntity entity = new UserStreakEntity();
        entity.setId(new UserStreakId(streak.getUserId(), streak.getActivityDate()));
        entity.setUser(userEntity);

        UserStreakEntity savedEntity = jpaRepository.save(entity);
        return mapper.toDomain(savedEntity);
    }

    @Override
    public Set<LocalDate> findAllActivityDatesByUserId(UUID userId) {
        return jpaRepository.findAllActivityDatesByUserId(userId);
    }
}