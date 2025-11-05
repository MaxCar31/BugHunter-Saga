package com.bughuntersaga.api.infrastructure.persistence.adapter;

import com.bughuntersaga.api.application.port.out.UserInventoryRepositoryPort;
import com.bughuntersaga.api.domain.model.UserInventory;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserEntity;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserInventoryEntity;
import com.bughuntersaga.api.infrastructure.persistence.mapper.GamificationPersistenceMapper;
import com.bughuntersaga.api.infrastructure.persistence.repository.UserInventoryJpaRepository;
import com.bughuntersaga.api.infrastructure.persistence.repository.UserJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class UserInventoryRepositoryAdapter implements UserInventoryRepositoryPort {

    private final UserInventoryJpaRepository jpaRepository;
    private final UserJpaRepository userJpaRepository; // Necesario para la relación
    private final GamificationPersistenceMapper mapper;

    @Override
    public Optional<UserInventory> findByUserIdAndItemCode(UUID userId, String itemCode) {
        return jpaRepository.findByUserIdAndItemCode(userId, itemCode)
                .map(mapper::toDomain);
    }

    @Override
    public UserInventory save(UserInventory inventory) {
        // Mapear de Dominio a Entidad
        UserInventoryEntity entity = jpaRepository.findById(inventory.getId() != null ? inventory.getId() : -1)
                .orElse(mapper.toEntity(inventory));

        // Asignar los campos mapeados
        entity.setQuantity(inventory.getQuantity());
        entity.setItemCode(inventory.getItemCode());

        // Adjuntar la entidad de usuario (requerido por el @ManyToOne)
        if (entity.getUser() == null) {
            UserEntity userEntity = userJpaRepository.findById(inventory.getUserId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado al guardar inventario: " + inventory.getUserId()));
            entity.setUser(userEntity);
        }

        // Guardar la entidad
        UserInventoryEntity savedEntity = jpaRepository.save(entity);

        // Mapear de vuelta a Dominio
        return mapper.toDomain(savedEntity);
    }
}