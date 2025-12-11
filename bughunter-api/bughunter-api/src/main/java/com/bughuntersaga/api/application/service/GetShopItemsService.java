package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.port.in.GetShopItemsUseCase;
import com.bughuntersaga.api.application.port.out.ShopItemRepositoryPort;
import com.bughuntersaga.api.application.port.out.UserRepositoryPort;
import com.bughuntersaga.api.domain.exception.UserNotFoundException;
import com.bughuntersaga.api.domain.model.ShopItem;
import com.bughuntersaga.api.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetShopItemsService implements GetShopItemsUseCase {

    private final ShopItemRepositoryPort shopItemRepositoryPort;
    private final UserRepositoryPort userRepositoryPort;

    @Override
    public List<ShopItem> getShopItems() {
        // Obtener usuario autenticado desde SecurityContext
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepositoryPort.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado: " + username));

        // Retornar solo items que el usuario NO ha comprado
        return shopItemRepositoryPort.findAvailableItemsForUser(currentUser.getId());
    }
}