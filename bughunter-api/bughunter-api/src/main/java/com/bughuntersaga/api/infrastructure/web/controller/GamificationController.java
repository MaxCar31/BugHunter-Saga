
    package com.bughuntersaga.api.infrastructure.web.controller;

    import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.bughuntersaga.api.application.port.in.*;


    @RestController
@RequiredArgsConstructor
    public class GamificationController {

    private final com.bughuntersaga.api.application.port.in.GetLeaderboardUseCase getLeaderboardUseCase;
    private final com.bughuntersaga.api.application.port.in.GetShopItemsUseCase getShopItemsUseCase;
    private final com.bughuntersaga.api.application.port.in.PurchaseItemUseCase purchaseItemUseCase;

    // TODO: Implementar endpoints de OpenAPI
    // @GetMapping("/leaderboard") ...
    // @GetMapping("/shop/items") ...
    // @PostMapping("/shop/purchase/{itemId}") ...

    }
