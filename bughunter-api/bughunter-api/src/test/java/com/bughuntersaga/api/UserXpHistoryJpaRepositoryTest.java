package com.bughuntersaga.api;


import com.bughuntersaga.api.infrastructure.persistence.entity.UserEntity;
import com.bughuntersaga.api.infrastructure.persistence.entity.UserXpHistoryEntity;
import com.bughuntersaga.api.infrastructure.persistence.mapper.GamificationPersistenceMapper;
import com.bughuntersaga.api.infrastructure.persistence.mapper.UserPersistenceMapper;
import com.bughuntersaga.api.infrastructure.persistence.repository.UserXpHistoryJpaRepository;
import com.bughuntersaga.api.infrastructure.persistence.repository.projections.LeaderboardProjection;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

import java.time.ZonedDateTime;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import com.bughuntersaga.api.infrastructure.persistence.mapper.ContentPersistenceMapper;
import com.bughuntersaga.api.infrastructure.persistence.mapper.ProgressPersistenceMapper;
@DataJpaTest
@Import({
        GamificationPersistenceMapper.class,
        UserPersistenceMapper.class,
        ContentPersistenceMapper.class,
        ProgressPersistenceMapper.class
})
class UserXpHistoryJpaRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserXpHistoryJpaRepository xpHistoryRepository;

    @Test
    void findLeaderboardForWeek_shouldSumAndRankUsersCorrectly() {
        // Arrange
        ZonedDateTime start = ZonedDateTime.now().minusDays(1);
        ZonedDateTime end = ZonedDateTime.now().plusDays(1);
        ZonedDateTime outsideRange = ZonedDateTime.now().minusDays(2);

        // Crear usuarios (necesarios por la FK)
        UserEntity user1 = UserEntity.builder()
                .username("player1")
                .email("player1@test.com")
                .name("Player One")
                .passwordHash("hash")
                .build();

        UserEntity user2 = UserEntity.builder()
                .username("player2")
                .email("player2@test.com")
                .name("Player Two")
                .passwordHash("hash")
                .build();

        entityManager.persist(user1);
        entityManager.persist(user2);

        // Crear historial de XP
        // Player 1: 10 + 20 = 30 XP
        entityManager.persist(new UserXpHistoryEntity(null, user1, 10, "LESSON", 1, start.plusHours(1)));
        entityManager.persist(new UserXpHistoryEntity(null, user1, 20, "LESSON", 2, start.plusHours(2)));

        // Player 2: 15 XP
        entityManager.persist(new UserXpHistoryEntity(null, user2, 15, "LESSON", 1, start.plusHours(3)));

        // XP fuera de rango (no debe contar)
        entityManager.persist(new UserXpHistoryEntity(null, user1, 1000, "LESSON", 1, outsideRange));

        entityManager.flush();

        // Act
        List<LeaderboardProjection> leaderboard = xpHistoryRepository.findLeaderboardForWeek(start, end);

        // Assert
        assertThat(leaderboard).isNotNull();
        assertThat(leaderboard).hasSize(2);

        // Verifica el ranking (DESC)
        assertThat(leaderboard.get(0).getName()).isEqualTo("Player One");
        assertThat(leaderboard.get(0).getTotalXp()).isEqualTo(30);

        assertThat(leaderboard.get(1).getName()).isEqualTo("Player Two");
        assertThat(leaderboard.get(1).getTotalXp()).isEqualTo(15);
    }
}