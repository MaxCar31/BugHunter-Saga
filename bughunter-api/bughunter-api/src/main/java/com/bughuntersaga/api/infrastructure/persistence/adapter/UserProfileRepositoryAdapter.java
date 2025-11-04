package com.bughuntersaga.api.infrastructure.persistence.adapter;

import com.bughuntersaga.api.application.port.out.UserProfileRepositoryPort;
import com.bughuntersaga.api.domain.model.UserProfile;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserEntity;
import com.bughuntersaga.api.infrastructure.persistence.repository.UserJpaRepository;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserProfileEntity;
import com.bughuntersaga.api.infrastructure.persistence.mapper.UserPersistenceMapper;
import com.bughuntersaga.api.infrastructure.persistence.repository.UserProfileJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class UserProfileRepositoryAdapter implements UserProfileRepositoryPort {

    private final UserProfileJpaRepository userProfileJpaRepository;
    private final UserPersistenceMapper userPersistenceMapper;


    private final UserJpaRepository userJpaRepository;

    @Override
    public UserProfile save(UserProfile userProfile) {

        UserProfileEntity entity = userPersistenceMapper.toUserProfileEntity(userProfile);

        UserEntity userEntity = userJpaRepository.findById(userProfile.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado al crear perfil: " + userProfile.getUserId()));

        entity.setUser(userEntity);

        UserProfileEntity savedEntity = userProfileJpaRepository.save(entity);
        return userPersistenceMapper.toUserProfileDomain(savedEntity);
    }

    @Override
    public Optional<UserProfile> findById(UUID userId) {
        return userProfileJpaRepository.findById(userId)
                .map(userPersistenceMapper::toUserProfileDomain);
    }
}