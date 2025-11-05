package com.bughuntersaga.api.infrastructure.persistence.adapter;

import com.bughuntersaga.api.application.port.out.LessonRepositoryPort;
import com.bughuntersaga.api.domain.model.Lesson;
import com.bughuntersaga.api.infrastructure.persistence.mapper.ContentPersistenceMapper;
import com.bughuntersaga.api.infrastructure.persistence.repository.LessonJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class LessonRepositoryAdapter implements LessonRepositoryPort {

    private final LessonJpaRepository lessonJpaRepository;
    private final ContentPersistenceMapper contentMapper;

    @Override
    public Optional<Lesson> findById(Integer id) {
        return lessonJpaRepository.findById(id)
                .map(contentMapper::lessonToDomain);
    }

    @Override
    public List<Lesson> findByUnitId(Integer unitId) {
        return lessonJpaRepository.findByUnitIdOrderByPositionAsc(unitId).stream()
                .map(contentMapper::lessonToDomain)
                .collect(Collectors.toList());
    }
}