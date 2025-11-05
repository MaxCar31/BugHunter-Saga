package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.port.in.GetShopItemsUseCase;
import com.bughuntersaga.api.application.port.out.ShopItemRepositoryPort;
import com.bughuntersaga.api.domain.model.ShopItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetShopItemsService implements GetShopItemsUseCase {

    private final ShopItemRepositoryPort shopItemRepositoryPort;

    @Override
    public List<ShopItem> getShopItems() {
        return shopItemRepositoryPort.findAll();
    }
}