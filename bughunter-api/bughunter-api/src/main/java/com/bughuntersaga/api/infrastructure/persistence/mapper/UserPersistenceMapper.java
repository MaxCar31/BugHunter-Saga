package com.bughuntersaga.api.infrastructure.persistence.mapper;

import com.bughuntersaga.api.domain.model.User;
import com.bughuntersaga.api.domain.model.UserProfile;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserEntity;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserProfileEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserPersistenceMapper {

    // --- Mapeos User <-> UserEntity ---
    // (Ahora ambos usan LocalDateTime para createdAt, así que esto funciona)
    UserEntity toUserEntity(User user);
    User toUserDomain(UserEntity userEntity);


    // --- Mapeos UserProfile <-> UserProfileEntity ---

    // Al mapear DE Entidad A Dominio:
    // Mapea el 'userId' de la entidad al 'userId' del dominio.
    @Mapping(source = "userId", target = "userId")
    UserProfile toUserProfileDomain(UserProfileEntity entity);


    // Al mapear DE Dominio A Entidad:
    // Mapea el 'userId' del dominio al 'userId' de la entidad.
    // Ignoramos el objeto 'user' en la entidad, ya que lo manejamos por ID.
    @Mapping(source = "userId", target = "userId")
    @Mapping(target = "user", ignore = true)
    UserProfileEntity toUserProfileEntity(UserProfile domain);
}