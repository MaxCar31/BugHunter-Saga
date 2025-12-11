package com.bughuntersaga.api.infrastructure.persistence.adapter;

import com.bughuntersaga.api.application.port.out.UserRepositoryPort;
import com.bughuntersaga.api.domain.model.User;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserEntity;
import com.bughuntersaga.api.infrastructure.persistence.mapper.UserPersistenceMapper;
import com.bughuntersaga.api.infrastructure.persistence.repository.UserJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class UserRepositoryAdapter implements UserRepositoryPort {

    // Depende de implementaciones de persistencia
    private final UserJpaRepository userJpaRepository;
    private final UserPersistenceMapper userPersistenceMapper;

    @Override
    public User save(User user) {
        // Mapea de Dominio a Entidad
        UserEntity userEntity = userPersistenceMapper.toUserEntity(user);
        // Guarda la Entidad
        UserEntity savedEntity = userJpaRepository.save(userEntity);
        // Mapea de Entidad a Dominio
        return userPersistenceMapper.toUserDomain(savedEntity);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userJpaRepository.findByUsername(username)
                .map(userPersistenceMapper::toUserDomain);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userJpaRepository.findByEmail(email)
                .map(userPersistenceMapper::toUserDomain);
    }

    @Override
    public Optional<User> findByUsernameOrEmail(String username, String email) {
        return userJpaRepository.findByUsernameOrEmail(username, email)
                .map(userPersistenceMapper::toUserDomain);
    }

    @Override
    public boolean existsByUsernameAndIdNot(String username, UUID userId) {
        return userJpaRepository.existsByUsernameAndIdNot(username, userId);
    }
}