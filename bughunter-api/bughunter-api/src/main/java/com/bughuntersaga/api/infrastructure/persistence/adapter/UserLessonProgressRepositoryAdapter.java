package com.bughuntersaga.api.infrastructure.persistence.adapter;

import com.bughuntersaga.api.application.port.out.UserLessonProgressRepositoryPort;
import com.bughuntersaga.api.domain.model.UserLessonProgress;
import com.bughuntersaga.api.infrastructure.persistence.entity.LessonEntity;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserEntity;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserLessonProgressEntity;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserLessonProgressId;
import com.bughuntersaga.api.infrastructure.persistence.mapper.ProgressPersistenceMapper;
import com.bughuntersaga.api.infrastructure.persistence.repository.LessonJpaRepository;
import com.bughuntersaga.api.infrastructure.persistence.repository.UserJpaRepository;
import com.bughuntersaga.api.infrastructure.persistence.repository.UserLessonProgressJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

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
        return jpaRepository.findCompletedLessonIdsByUserId(userId);
    }

    @Override
    public boolean existsByUserIdAndLessonId(UUID userId, Integer lessonId) {
        return jpaRepository.existsById_UserIdAndId_LessonId(userId, lessonId);
    }

    @Override
    public UserLessonProgress save(UserLessonProgress progress) {
        // Para manejar @MapsId correctamente, debemos cargar las entidades padre
        UserEntity userEntity = userJpaRepository.findById(progress.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado para guardar progreso: " + progress.getUserId()));

        LessonEntity lessonEntity = lessonJpaRepository.findById(progress.getLessonId())
                .orElseThrow(() -> new RuntimeException("Lección no encontrada para guardar progreso: " + progress.getLessonId()));

        // Construimos la entidad
        UserLessonProgressEntity entity = new UserLessonProgressEntity();
        entity.setId(new UserLessonProgressId(progress.getUserId(), progress.getLessonId()));
        entity.setUser(userEntity);
        entity.setLesson(lessonEntity);
        entity.setCompletedAt(progress.getCompletedAt()); // O ZonedDateTime.now() si se prefiere

        UserLessonProgressEntity savedEntity = jpaRepository.save(entity);

        // Devolvemos el modelo de dominio
        return mapper.toDomain(savedEntity);
    }
}