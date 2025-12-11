package com.bughuntersaga.api.infrastructure.persistence.repository;

import com.bughuntersaga.api.infrastructure.persistence.entity.UserStreakEntity;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserStreakId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

@Repository
public interface UserStreakJpaRepository extends JpaRepository<UserStreakEntity, UserStreakId> {

    /**
     * Obtiene un conjunto de todas las fechas de actividad únicas para un usuario.
     * Optimizado para el cálculo de racha.
     */
    @Query("SELECT s.id.activityDate FROM UserStreakEntity s WHERE s.id.userId = :userId")
    Set<LocalDate> findAllActivityDatesByUserId(@Param("userId") UUID userId);
}