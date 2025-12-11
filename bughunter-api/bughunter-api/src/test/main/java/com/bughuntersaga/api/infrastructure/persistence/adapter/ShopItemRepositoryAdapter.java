package com.bughuntersaga.api.infrastructure.persistence.adapter;

import com.bughuntersaga.api.application.port.out.ShopItemRepositoryPort;
import com.bughuntersaga.api.domain.model.ShopItem;
import com.bughuntersaga.api.infrastructure.persistence.mapper.GamificationPersistenceMapper;
import com.bughuntersaga.api.infrastructure.persistence.repository.ShopItemJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class ShopItemRepositoryAdapter implements ShopItemRepositoryPort {

    private final ShopItemJpaRepository jpaRepository;
    private final GamificationPersistenceMapper mapper;

    @Override
    public List<ShopItem> findAll() {
        return jpaRepository.findAll().stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<ShopItem> findByItemCode(String itemCode) {
        return jpaRepository.findByItemCode(itemCode)
                .map(mapper::toDomain);
    }

    @Override
    public List<ShopItem> findAvailableItemsForUser(UUID userId) {
        return jpaRepository.findAvailableForUser(userId).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
}