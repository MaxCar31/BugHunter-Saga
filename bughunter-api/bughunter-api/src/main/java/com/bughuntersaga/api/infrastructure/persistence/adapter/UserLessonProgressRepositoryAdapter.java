package com.bughuntersaga.api.infrastructure.persistence.adapter;

import com.bughuntersaga.api.application.port.out.UserLessonProgressRepositoryPort;
import com.bughuntersaga.api.domain.model.UserLessonProgress;
import com.bughuntersaga.api.infrastructure.persistence.entity.LessonEntity;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserEntity;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserLessonProgressEntity;
import com.bughuntersaga.api.infrastructure.persistence.mapper.ProgressPersistenceMapper;
import com.bughuntersaga.api.infrastructure.persistence.repository.LessonJpaRepository;
import com.bughuntersaga.api.infrastructure.persistence.repository.UserJpaRepository;
import com.bughuntersaga.api.infrastructure.persistence.repository.UserLessonProgressJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class UserLessonProgressRepositoryAdapter implements UserLessonProgressRepositoryPort {

    private final UserLessonProgressJpaRepository jpaRepository;
    private final UserJpaRepository userJpaRepository;
    private final LessonJpaRepository lessonJpaRepository;
    private final ProgressPersistenceMapper mapper;

    @Override
    public Set<Integer> findCompletedLessonIdsByUserId(UUID userId) {
        Set<Integer> completed = jpaRepository.findCompletedLessonIdsByUserId(userId);
        System.out.println("🔍 DEBUG: Lecciones completadas para userId " + userId + ": " + completed);
        return completed;
    }

    @Override
    public boolean existsByUserIdAndLessonId(UUID userId, Integer lessonId) {
        return jpaRepository.existsByUserIdAndLessonId(userId, lessonId);
    }

    @Override
    public UserLessonProgress save(UserLessonProgress progress) {
        // Para la nueva estructura con ID auto-incremental
        UserEntity userEntity = userJpaRepository.findById(progress.getUserId())
                .orElseThrow(() -> new RuntimeException(
                        "Usuario no encontrado para guardar progreso: " + progress.getUserId()));

        LessonEntity lessonEntity = lessonJpaRepository.findById(progress.getLessonId())
                .orElseThrow(() -> new RuntimeException(
                        "Lección no encontrada para guardar progreso: " + progress.getLessonId()));

        // Construimos la entidad con la nueva estructura
        UserLessonProgressEntity entity = UserLessonProgressEntity.builder()
                .userId(progress.getUserId())
                .lessonId(progress.getLessonId())
                .user(userEntity)
                .lesson(lessonEntity)
                .completedAt(progress.getCompletedAt())
                .score(progress.getScore())
                .attemptNumber(progress.getAttemptNumber())
                .build();

        UserLessonProgressEntity savedEntity = jpaRepository.save(entity);

        // Devolvemos el modelo de dominio
        return mapper.toDomain(savedEntity);
    }

    @Override
    public int countCompletionsByUserIdAndLessonId(UUID userId, Integer lessonId) {
        return jpaRepository.countCompletionsByUserIdAndLessonId(userId, lessonId);
    }

    @Override
    public int getNextAttemptNumber(UUID userId, Integer lessonId) {
        int nextAttempt = jpaRepository.getNextAttemptNumber(userId, lessonId);
        System.out.println("🔢 DEBUG: Repository getNextAttemptNumber - userId: " + userId + 
                         ", lessonId: " + lessonId + 
                         ", result: " + nextAttempt);
        return nextAttempt;
    }

    @Override
    @Transactional
    public void deleteByUserIdAndLessonId(UUID userId, Integer lessonId) {
        jpaRepository.deleteByUserIdAndLessonId(userId, lessonId);
    }
}