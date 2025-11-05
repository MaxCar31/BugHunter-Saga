package com.bughuntersaga.api.infrastructure.persistence.mapper;

import com.bughuntersaga.api.domain.model.UserLessonProgress;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserLessonProgressEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProgressPersistenceMapper {

    /**
     * Mapea de Entidad (JPA) a Dominio.
     * Maneja la clave compuesta @EmbeddedId.
     */
    @Mapping(source = "id.userId", target = "userId")
    @Mapping(source = "id.lessonId", target = "lessonId")
    UserLessonProgress toDomain(UserLessonProgressEntity entity);


}