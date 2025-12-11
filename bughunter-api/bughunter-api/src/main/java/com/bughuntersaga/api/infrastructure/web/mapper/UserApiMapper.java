package com.bughuntersaga.api.infrastructure.web.mapper;

import com.bughuntersaga.api.application.dto.UpdateUserAccountCommand;
import com.bughuntersaga.api.application.dto.UpdateUserSettingsCommand;
import com.bughuntersaga.api.application.port.in.UserStatsResult;
import com.bughuntersaga.api.domain.model.Badge;
import com.bughuntersaga.api.domain.model.FullUserProfile;
import com.bughuntersaga.api.domain.model.User;
import com.bughuntersaga.api.infrastructure.web.dto.BadgeDTO;
import com.bughuntersaga.api.infrastructure.web.dto.UserAccountUpdateDTO;
import com.bughuntersaga.api.infrastructure.web.dto.UserInfoDTO;
import com.bughuntersaga.api.infrastructure.web.dto.UserProfileDTO;
import com.bughuntersaga.api.infrastructure.web.dto.UserSettingsUpdateDTO;
import com.bughuntersaga.api.infrastructure.web.dto.UserStatsDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserApiMapper {

    // --- Fase 4 ---
    UserStatsDTO toStatsDTO(UserStatsResult result);

    /**
     * Mapea el modelo de dominio combinado al DTO de respuesta.
     */
    UserProfileDTO toProfileDTO(FullUserProfile domain);

    /**
     * Mapea Badge de dominio a BadgeDTO.
     */
    BadgeDTO toBadgeDTO(Badge badge);

    /**
     * Mapea el DTO de entrada de settings al Comando de aplicación.
     */
    UpdateUserSettingsCommand toCommand(UserSettingsUpdateDTO dto);

    /**
     * Mapea el DTO de entrada de account al Comando de aplicación.
     */
    UpdateUserAccountCommand toCommand(UserAccountUpdateDTO dto);

    /**
     * Mapea el User de dominio al UserInfoDTO (usado por /account y /login).
     */
    @Mapping(source = "id", target = "id")
    UserInfoDTO toUserInfoDTO(User user);
}