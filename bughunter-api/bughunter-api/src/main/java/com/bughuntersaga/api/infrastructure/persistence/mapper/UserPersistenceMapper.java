
    package com.bughuntersaga.api.infrastructure.persistence.mapper;

    import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;


    @Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserPersistenceMapper {
    }
