package com.bughuntersaga.api;

import com.bughuntersaga.api.infrastructure.web.dto.AuthResponseDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
class ProgressControllerIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String jwtToken;

    @BeforeEach
    void setUp() throws Exception {
        // PASO 1: REGISTRAR el usuario
        String registerJson = """
        {
            "username": "maxstell",
            "name": "mateo chida",
            "email": "max@gmail.com",
            "password": "pass1234"
        }
        """;

        try {
            mockMvc.perform(post("/api/auth/register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(registerJson))
                    .andExpect(status().isCreated());
        } catch (AssertionError e) {
            // Usuario ya existe
        }

        // PASO 2: LOGIN
        String loginJson = """
        {
            "emailOrUsername": "max@gmail.com",
            "password": "pass1234"
        }
        """;

        MvcResult result = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andReturn();

        String jsonResponse = result.getResponse().getContentAsString();
        AuthResponseDTO authResponse = objectMapper.readValue(jsonResponse, AuthResponseDTO.class);
        jwtToken = authResponse.token();
    }

    @Test
    void completeLesson_shouldReturnOk_withRealUser() throws Exception {
        String validJson = """
        {
            "lessonId": 1,
            "correctAnswerCount": 10,
            "incorrectAnswerCount": 0,
            "timeTakenMs": 5000,
            "isPractice": false
        }
        """;

        mockMvc.perform(post("/api/progress/lesson")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.xpEarned").isNumber())
                .andExpect(jsonPath("$.newStreak").isNumber());
    }

    @Test
    void completeLesson_shouldReturnBadRequest_whenDtoIsInvalid_withRealUser() throws Exception {
        String invalidJson = """
        {
            "correctAnswerCount": 10,
            "incorrectAnswerCount": 0,
            "timeTakenMs": 5000,
            "isPractice": false
        }
        """;

        mockMvc.perform(post("/api/progress/lesson")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Validation Error"));
    }

    @Test
    void completeLesson_shouldReturnForbidden_withoutToken() throws Exception {
        String validJson = """
        {
            "lessonId": 1,
            "correctAnswerCount": 10,
            "incorrectAnswerCount": 0,
            "timeTakenMs": 5000,
            "isPractice": false
        }
        """;

        mockMvc.perform(post("/api/progress/lesson")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validJson))
                .andExpect(status().isForbidden());  // ✅ 403
    }

    @Test
    void completeLesson_shouldReturnForbidden_withInvalidToken() throws Exception {
        String validJson = """
        {
            "lessonId": 1,
            "correctAnswerCount": 10,
            "incorrectAnswerCount": 0,
            "timeTakenMs": 5000,
            "isPractice": false
        }
        """;

        mockMvc.perform(post("/api/progress/lesson")
                        .header("Authorization", "Bearer invalid-token-xyz")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validJson))
                .andExpect(status().isForbidden());  // ✅ 403
    }
}