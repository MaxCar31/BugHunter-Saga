package com.bughuntersaga.api.infrastructure.persistence.repository;

import com.bughuntersaga.api.infrastructure.persistence.entity.UserLessonProgressEntity;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserLessonProgressId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;
import java.util.UUID;

@Repository
public interface UserLessonProgressJpaRepository extends JpaRepository<UserLessonProgressEntity, UserLessonProgressId> {

    /**
     * Obtiene un conjunto de IDs de lecciones completadas por un usuario.
     */
    @Query("""
        SELECT ulp.id.lessonId 
        FROM UserLessonProgressEntity ulp 
        WHERE ulp.id.userId = :userId
    """)
    Set<Integer> findCompletedLessonIdsByUserId(@Param("userId") UUID userId);

    /**
     * Verifica la existencia por la clave compuesta.
     * Spring Data JPA genera este query automáticamente basado en el nombre.
     */
    boolean existsById_UserIdAndId_LessonId(UUID userId, Integer lessonId);
}