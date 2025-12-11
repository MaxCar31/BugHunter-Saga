
package com.bughuntersaga.api.infrastructure.persistence.adapter;

import com.bughuntersaga.api.application.port.out.UnitRepositoryPort;
import com.bughuntersaga.api.domain.model.Lesson;
import com.bughuntersaga.api.domain.model.Unit;
import com.bughuntersaga.api.infrastructure.persistence.entity.LessonEntity;
import com.bughuntersaga.api.infrastructure.persistence.entity.UnitEntity;
import com.bughuntersaga.api.infrastructure.persistence.mapper.ContentPersistenceMapper;
import com.bughuntersaga.api.infrastructure.persistence.repository.LessonJpaRepository;
import com.bughuntersaga.api.infrastructure.persistence.repository.UnitJpaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Adaptador de persistencia para unidades.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class UnitRepositoryAdapter implements UnitRepositoryPort {

    private final UnitJpaRepository unitJpaRepository;
    private final LessonJpaRepository lessonJpaRepository;
    private final ContentPersistenceMapper mapper;

    @Override
    public Optional<Unit> findFirstUnitByModuleCode(String moduleCode) {
        return unitJpaRepository.findByModuleCodeOrderByUnitNumber(moduleCode).stream()
                .findFirst()
                .map(this::mapUnitWithLessons);
    }

    @Override
    public List<Unit> findAllUnitsByModuleCode(String moduleCode) {
        return unitJpaRepository.findByModuleCode(moduleCode).stream()
                .map(this::mapUnitWithLessons)
                .collect(Collectors.toList());
    }

    /**
     * Mapea UnitEntity a Unit y carga sus lecciones.
     */
    private Unit mapUnitWithLessons(UnitEntity unitEntity) {
        // Mapear unidad
        Unit unit = mapper.unitToDomain(unitEntity);

        // Cargar lecciones
        List<LessonEntity> lessonEntities = lessonJpaRepository
                .findByUnitIdOrderByPositionAsc(unitEntity.getId());


        List<Lesson> lessons = lessonEntities.stream()
                .map(mapper::lessonToDomain)
                .collect(Collectors.toList());
        unit.setLessons(lessons);

        return unit;
    }
}