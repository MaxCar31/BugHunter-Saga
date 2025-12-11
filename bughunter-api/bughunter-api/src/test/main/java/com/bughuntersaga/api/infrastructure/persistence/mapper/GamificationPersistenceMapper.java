package com.bughuntersaga.api.infrastructure.persistence.mapper;

import com.bughuntersaga.api.domain.model.UserStreak;
import com.bughuntersaga.api.domain.model.UserXpHistory;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserStreakEntity;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserXpHistoryEntity;
import com.bughuntersaga.api.domain.model.ShopItem;
import com.bughuntersaga.api.infrastructure.persistence.entity.ShopItemEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import com.bughuntersaga.api.domain.model.UserInventory;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserInventoryEntity;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GamificationPersistenceMapper {

    // --- UserXpHistory ---
    @Mapping(source = "user.id", target = "userId")
    UserXpHistory toDomain(UserXpHistoryEntity entity);

    @Mapping(target = "user", ignore = true)
    UserXpHistoryEntity toEntity(UserXpHistory domain);

    // --- UserStreak ---
    @Mapping(source = "id.userId", target = "userId")
    @Mapping(source = "id.activityDate", target = "activityDate")
    UserStreak toDomain(UserStreakEntity entity);

    ShopItem toDomain(ShopItemEntity entity);
    ShopItemEntity toEntity(ShopItem domain);

    // --- UserInventory (NUEVO) ---
    @Mapping(source = "user.id", target = "userId")
    UserInventory toDomain(UserInventoryEntity entity);

    @Mapping(target = "user", ignore = true) // El adaptador se encarga de las relaciones
    UserInventoryEntity toEntity(UserInventory domain);

}