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


    UserEntity toUserEntity(User user);
    User toUserDomain(UserEntity userEntity);

    @Mapping(source = "userId", target = "userId")
    UserProfile toUserProfileDomain(UserProfileEntity entity);

    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "user", ignore = true)
    UserProfileEntity toUserProfileEntity(UserProfile domain);



}