
package com.bughuntersaga.api.infrastructure.persistence.adapter;

import com.bughuntersaga.api.application.port.out.ProblemRepositoryPort;
import com.bughuntersaga.api.domain.model.Problem;
import com.bughuntersaga.api.infrastructure.persistence.mapper.ContentPersistenceMapper;
import com.bughuntersaga.api.infrastructure.persistence.repository.ProblemJpaRepository;
import com.bughuntersaga.api.infrastructure.web.mapper.ContentApiMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Adaptador de persistencia para problemas.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class ProblemRepositoryAdapter implements ProblemRepositoryPort {

    private final ProblemJpaRepository jpaRepository;
    private final ContentPersistenceMapper mapper;

    @Override
    public List<Problem> findProblemsByModuleCode(String moduleCode) {
        return jpaRepository.findProblemsByModuleCode(moduleCode).stream()
                .map(mapper::problemToDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Problem> findById(Integer id) {
        return jpaRepository.findById(id).map(mapper::problemToDomain);
    }

    @Override
    public List<Problem> findByLessonId(Integer lessonId) {
        return jpaRepository.findByLessonIdOrderByPositionAsc(lessonId).stream()
                .map(mapper::problemToDomain)
                .collect(Collectors.toList());
    }
}