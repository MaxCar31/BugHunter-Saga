package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.port.in.GetUserStatsUseCase;
import com.bughuntersaga.api.application.port.in.PurchaseItemUseCase;
import com.bughuntersaga.api.application.port.in.UserStatsResult;
import com.bughuntersaga.api.application.port.out.*;
import com.bughuntersaga.api.domain.exception.InsufficientFundsException;
import com.bughuntersaga.api.domain.exception.ResourceNotFoundException;
import com.bughuntersaga.api.domain.exception.UserNotFoundException;
import com.bughuntersaga.api.domain.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.ZonedDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PurchaseItemService implements PurchaseItemUseCase {

    // Puertos
    private final UserRepositoryPort userRepositoryPort;
    private final UserProfileRepositoryPort userProfileRepositoryPort;
    private final ShopItemRepositoryPort shopItemRepositoryPort;
    private final UserInventoryRepositoryPort userInventoryRepositoryPort;

    // Casos de uso
    private final GetUserStatsUseCase getUserStatsUseCase; // Para devolver stats actualizados

    private final Clock clock;

    @Override
    @Transactional
    public UserStatsResult purchaseItem(String itemCode) {

        // 1. OBTENER ESTADO ACTUAL
        User currentUser = getCurrentUser();
        UUID userId = currentUser.getId();
        UserProfile userProfile = getUserProfile(userId);

        // 2. OBTENER ARTÍCULO Y VALIDAR
        ShopItem item = shopItemRepositoryPort.findByItemCode(itemCode)
                .orElseThrow(() -> new ResourceNotFoundException("Artículo no encontrado: Artículo no encontrado: " + itemCode, itemCode));

        // 3. LÓGICA DE COMPRA
        if (userProfile.getLingots() < item.getCost()) {
            throw new InsufficientFundsException("Fondos insuficientes. Necesita " + item.getCost() + " lingots.");
        }

        // 4. EJECUTAR TRANSACCIÓN

        // Restar lingots
        userProfile.setLingots(userProfile.getLingots() - item.getCost());
        userProfileRepositoryPort.save(userProfile);

        // Añadir a inventario
        Optional<UserInventory> existingInventory = userInventoryRepositoryPort
                .findByUserIdAndItemCode(userId, itemCode);

        UserInventory inventoryToSave;
        if (existingInventory.isPresent()) {
            // Actualizar cantidad
            inventoryToSave = existingInventory.get();
            inventoryToSave.setQuantity(inventoryToSave.getQuantity() + 1);
        } else {
            // Crear nuevo registro
            inventoryToSave = UserInventory.builder()
                    .userId(userId)
                    .itemCode(itemCode)
                    .quantity(1)
                    .createdAt(ZonedDateTime.now(clock))
                    .build();
        }

        userInventoryRepositoryPort.save(inventoryToSave);

        // 5. DEVOLVER STATS ACTUALIZADOS (como pide el OpenAPI)
        // Reutilizamos el caso de uso que ya construimos
        return getUserStatsUseCase.getStats();
    }

    // --- Métodos de ayuda ---

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepositoryPort.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado: " + username));
    }

    private UserProfile getUserProfile(UUID userId) {
        return userProfileRepositoryPort.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Perfil de usuario no encontrado."));
    }
}