package com.bughuntersaga.api.infrastructure.persistence.mapper;

import com.bughuntersaga.api.domain.model.UserLessonProgress;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserLessonProgressEntity;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProgressPersistenceMapper {

    /**
     * Mapea de Entidad (JPA) a Dominio.
     * Usa la nueva estructura con ID auto-incremental.
     */
    UserLessonProgress toDomain(UserLessonProgressEntity entity);

}