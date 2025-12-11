// Ubicación: src/test/java/com/bughuntersaga/api/PlayerJourneyE2ETest.java

package com.bughuntersaga.api;

import com.bughuntersaga.api.infrastructure.web.dto.AuthResponseDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest // ✅ AGREGAR ESTA ANOTACIÓN
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class PlayerJourneyE2ETest extends BaseIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    // Guardamos el token entre pruebas
    private static String jwtToken;

    @Test
    @Order(1)
    void playerCanRegister() throws Exception {
        String registrationJson = """
        {
            "username": "E2E_Player",
            "name": "E2E Player",
            "email": "e2e@player.com",
            "password": "password123"
        }
        """;

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registrationJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.user.username").value("E2E_Player"));
    }

    @Test
    @Order(2)
    void playerCanLogin() throws Exception {
        String loginJson = """
        {
            "emailOrUsername": "e2e@player.com",
            "password": "password123"
        }
        """;

        MvcResult result = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andReturn();

        // Extraemos y guardamos el token
        String jsonResponse = result.getResponse().getContentAsString();
        AuthResponseDTO authResponse = objectMapper.readValue(jsonResponse, AuthResponseDTO.class);
        jwtToken = authResponse.token();
    }

    @Test
    @Order(3)
    void playerCanCompleteLesson() throws Exception {
        String lessonCompletionJson = """
        {
            "lessonId": 1,
            "correctAnswerCount": 10,
            "incorrectAnswerCount": 0,
            "timeTakenMs": 15000,
            "isPractice": false
        }
        """;

        mockMvc.perform(post("/api/progress/lesson")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(lessonCompletionJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.xpEarned").isNumber())
                .andExpect(jsonPath("$.xpEarned").value(20))
                .andExpect(jsonPath("$.newStreak").value(1));
    }

    @Test
    @Order(4)
    void playerStatsAreUpdated() throws Exception {
        mockMvc.perform(get("/api/users/me/stats")
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalXp").value(20))
                .andExpect(jsonPath("$.currentStreak").value(1))
                .andExpect(jsonPath("$.xpToday").value(20));
    }
}