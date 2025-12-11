package com.bughuntersaga.api.infrastructure.persistence.repository;

import com.bughuntersaga.api.infrastructure.persistence.entity.UserLessonProgressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;
import java.util.UUID;

@Repository
public interface UserLessonProgressJpaRepository extends JpaRepository<UserLessonProgressEntity, Long> {

    /**
     * Obtiene un conjunto de IDs de lecciones completadas por un usuario.
     * Solo considera la primera completación exitosa (score >= 50).
     */
    @Query("""
                SELECT DISTINCT ulp.lessonId
                FROM UserLessonProgressEntity ulp
                WHERE ulp.userId = :userId
                AND (ulp.score IS NULL OR ulp.score >= 50)
            """)
    Set<Integer> findCompletedLessonIdsByUserId(@Param("userId") UUID userId);

    /**
     * Verifica si existe al menos una completación exitosa de la lección por el
     * usuario.
     */
    @Query("""
                SELECT COUNT(ulp) > 0
                FROM UserLessonProgressEntity ulp
                WHERE ulp.userId = :userId
                AND ulp.lessonId = :lessonId
                AND (ulp.score IS NULL OR ulp.score >= 50)
            """)
    boolean existsByUserIdAndLessonId(@Param("userId") UUID userId, @Param("lessonId") Integer lessonId);

    /**
     * Cuenta el número de completaciones exitosas de una lección por un usuario.
     */
    @Query("""
                SELECT COUNT(ulp)
                FROM UserLessonProgressEntity ulp
                WHERE ulp.userId = :userId
                AND ulp.lessonId = :lessonId
                AND (ulp.score IS NULL OR ulp.score >= 50)
            """)
    int countCompletionsByUserIdAndLessonId(@Param("userId") UUID userId, @Param("lessonId") Integer lessonId);

    /**
     * Obtiene el número del siguiente intento para una lección específica.
     */
    @Query("""
                SELECT COALESCE(MAX(ulp.attemptNumber), 0) + 1
                FROM UserLessonProgressEntity ulp
                WHERE ulp.userId = :userId
                AND ulp.lessonId = :lessonId
            """)
    int getNextAttemptNumber(@Param("userId") UUID userId, @Param("lessonId") Integer lessonId);

    /**
     * Elimina todas las completaciones de una lección específica para permitir
     * reiniciarla.
     * (Solo si necesitas resetear completamente - normalmente no usarás esto)
     */
    @Modifying
    @Query("DELETE FROM UserLessonProgressEntity ulp WHERE ulp.userId = :userId AND ulp.lessonId = :lessonId")
    void deleteByUserIdAndLessonId(@Param("userId") UUID userId, @Param("lessonId") Integer lessonId);
}