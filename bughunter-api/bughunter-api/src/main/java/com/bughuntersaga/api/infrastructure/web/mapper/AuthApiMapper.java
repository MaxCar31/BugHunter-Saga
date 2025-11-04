package com.bughuntersaga.api.infrastructure.web.mapper;

import com.bughuntersaga.api.application.dto.LoginUserCommand;
import com.bughuntersaga.api.application.dto.RegisterUserCommand;
import com.bughuntersaga.api.domain.model.AuthToken;
import com.bughuntersaga.api.domain.model.User;
import com.bughuntersaga.api.infrastructure.web.dto.AuthResponseDTO;
import com.bughuntersaga.api.infrastructure.web.dto.UserInfoDTO;
import com.bughuntersaga.api.infrastructure.web.dto.UserLoginDTO;
import com.bughuntersaga.api.infrastructure.web.dto.UserRegistrationDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AuthApiMapper {

    // Mapeo de DTO a Comando
    @Mapping(source = "password", target = "rawPassword")
    RegisterUserCommand toRegisterCommand(UserRegistrationDTO dto);

    // Mapeo de DTO de Login a Comando de Login
    LoginUserCommand toLoginCommand(UserLoginDTO dto);

    // Mapeo de AuthToken a DTO de respuesta
    AuthResponseDTO toAuthResponseDTO(AuthToken authToken);

    // Info básica del usuario
    @Mapping(source = "id", target = "id")
    UserInfoDTO toUserInfoDTO(User user);
}