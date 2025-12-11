package com.bughuntersaga.api.infrastructure.web.controller;

import com.bughuntersaga.api.application.port.in.GetLeaderboardUseCase;
import com.bughuntersaga.api.application.port.in.GetShopItemsUseCase;
import com.bughuntersaga.api.application.port.in.PurchaseItemUseCase;
import com.bughuntersaga.api.application.port.in.UserStatsResult;
import com.bughuntersaga.api.domain.model.Leaderboard;
import com.bughuntersaga.api.domain.model.ShopItem;
import com.bughuntersaga.api.infrastructure.web.dto.LeaderboardDTO;
import com.bughuntersaga.api.infrastructure.web.dto.ShopItemDTO;
import com.bughuntersaga.api.infrastructure.web.dto.UserStatsDTO;
import com.bughuntersaga.api.infrastructure.web.mapper.GamificationApiMapper;
import com.bughuntersaga.api.infrastructure.web.mapper.UserApiMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class GamificationController {

    private final GetLeaderboardUseCase getLeaderboardUseCase;
    private final GetShopItemsUseCase getShopItemsUseCase;
    private final PurchaseItemUseCase purchaseItemUseCase;

    // Mappers
    private final GamificationApiMapper gamificationApiMapper;
    private final UserApiMapper userApiMapper;

    /**
     * GET /api/leaderboard (Fase 6)
     */
    @GetMapping("/leaderboard")
    public ResponseEntity<LeaderboardDTO> getLeaderboard() {

        // 1. Ejecutar el caso de uso
        Leaderboard leaderboard = getLeaderboardUseCase.getLeaderboard();

        // 2. Mapear de Dominio (App) a DTO (Web)
        LeaderboardDTO responseDTO = gamificationApiMapper.toLeaderboardDTO(leaderboard);

        return ResponseEntity.ok(responseDTO);
    }

    /**
     * GET /api/shop/items (Fase 6)
     */
    @GetMapping("/shop/items")
    public ResponseEntity<List<ShopItemDTO>> getShopItems() {
        // ... (implementado)
        List<ShopItem> items = getShopItemsUseCase.getShopItems();
        List<ShopItemDTO> responseDTOs = items.stream()
                .map(gamificationApiMapper::toShopItemDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    /**
     * POST /api/shop/purchase/{itemId} (Fase 6)
     */
    @PostMapping("/shop/purchase/{itemId}")
    public ResponseEntity<UserStatsDTO> purchaseItem(@PathVariable("itemId") String itemId) {
        // ... (implementado)
        UserStatsResult updatedStats = purchaseItemUseCase.purchaseItem(itemId);
        UserStatsDTO responseDTO = userApiMapper.toStatsDTO(updatedStats);
        return ResponseEntity.ok(responseDTO);
    }
}