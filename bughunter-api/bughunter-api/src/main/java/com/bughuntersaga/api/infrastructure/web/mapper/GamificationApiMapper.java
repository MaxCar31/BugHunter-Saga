package com.bughuntersaga.api.infrastructure.web.mapper;

import com.bughuntersaga.api.domain.model.Leaderboard;
import com.bughuntersaga.api.domain.model.LeaderboardEntry;
import com.bughuntersaga.api.domain.model.ShopItem;
import com.bughuntersaga.api.infrastructure.web.dto.LeaderboardDTO;
import com.bughuntersaga.api.infrastructure.web.dto.LeaderboardEntryDTO;
import com.bughuntersaga.api.infrastructure.web.dto.ShopItemDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GamificationApiMapper {


    @Mapping(source = "itemCode", target = "itemId")
    ShopItemDTO toShopItemDTO(ShopItem domain);


    LeaderboardDTO toLeaderboardDTO(Leaderboard domain);
    LeaderboardEntryDTO toLeaderboardEntryDTO(LeaderboardEntry domain);

}