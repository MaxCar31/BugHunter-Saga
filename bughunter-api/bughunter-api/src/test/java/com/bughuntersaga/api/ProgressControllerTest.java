package com.bughuntersaga.api;

import com.bughuntersaga.api.application.port.in.ClaimTreasureResult;
import com.bughuntersaga.api.application.port.in.CompleteLessonUseCase;
import com.bughuntersaga.api.application.port.in.ClaimTreasureUseCase;
import com.bughuntersaga.api.application.port.in.CompleteLessonResult;
import com.bughuntersaga.api.domain.exception.LessonAlreadyCompletedException;
import com.bughuntersaga.api.domain.exception.LessonNotFoundException;
import com.bughuntersaga.api.domain.exception.TreasureAlreadyClaimedException;
import com.bughuntersaga.api.infrastructure.web.controller.ProgressController;
import com.bughuntersaga.api.infrastructure.web.mapper.ProgressApiMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import com.bughuntersaga.api.infrastructure.security.config.SecurityConfiguration;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import com.bughuntersaga.api.infrastructure.web.mapper.AuthApiMapper;
import com.bughuntersaga.api.infrastructure.web.mapper.UserApiMapper;
@WebMvcTest(
        controllers = ProgressController.class,
        excludeAutoConfiguration = {SecurityConfiguration.class}
)
@Import({AuthApiMapper.class, UserApiMapper.class})
class ProgressControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;


    @MockitoBean
    private CompleteLessonUseCase completeLessonUseCase;

    @MockitoBean
    private ClaimTreasureUseCase claimTreasureUseCase;

    @MockitoBean
    private ProgressApiMapper progressApiMapper;

    @Test
    @WithMockUser
    void completeLesson_shouldReturnBadRequest_whenDtoIsInvalid() throws Exception {
        String invalidJson = """
        {
            "correctAnswerCount": 10,
            "incorrectAnswerCount": 0,
            "timeTakenMs": 5000,
            "isPractice": false
        }
        """;

        mockMvc.perform(post("/api/progress/lesson")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Validation Error"))
                .andExpect(jsonPath("$.message").value("Lesson ID is required"));
    }

    @Test
    @WithMockUser
    void completeLesson_shouldReturnOk_whenDtoIsValid() throws Exception {
        String validJson = """
        {
            "lessonId": 1,
            "correctAnswerCount": 10,
            "incorrectAnswerCount": 0,
            "timeTakenMs": 5000,
            "isPractice": false
        }
        """;

        CompleteLessonResult result = new CompleteLessonResult(20, 5, 105, 3);
        when(completeLessonUseCase.handle(any())).thenReturn(result);
        when(progressApiMapper.toCommand(any())).thenReturn(null);
        when(progressApiMapper.toDTO(result)).thenCallRealMethod();

        mockMvc.perform(post("/api/progress/lesson")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.xpEarned").value(20))
                .andExpect(jsonPath("$.newStreak").value(3));
    }
    @Test
    @WithMockUser
    void completeLesson_shouldReturnConflict_whenLessonAlreadyCompleted() throws Exception {
        // Arrange
        String validJson = """
        { "lessonId": 2, "correctAnswerCount": 5, "incorrectAnswerCount": 0, "timeTakenMs": 10000, "isPractice": false }
    """;

        // 1. Simular que el Caso de Uso lanza la excepción de Dominio
        when(progressApiMapper.toCommand(any())).thenReturn(null);
        when(completeLessonUseCase.handle(any()))
                .thenThrow(new LessonAlreadyCompletedException("Lección ya completada: 2"));

        // Act & Assert
        mockMvc.perform(post("/api/progress/lesson")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validJson))
                .andExpect(status().isConflict()) // Esperar HTTP 409
                .andExpect(jsonPath("$.error").value("Conflict"))
                .andExpect(jsonPath("$.message").value("Lección ya completada: 2"));
    }

    @Test
    @WithMockUser
    void completeLesson_shouldReturnNotFound_whenLessonDoesNotExist() throws Exception {
        // Arrange
        String validJson = """
        { "lessonId": 999, "correctAnswerCount": 5, "incorrectAnswerCount": 0, "timeTakenMs": 10000, "isPractice": false }
    """;

        // 2. Simular que el Caso de Uso lanza la excepción de Dominio
        when(progressApiMapper.toCommand(any())).thenReturn(null);
        when(completeLessonUseCase.handle(any()))
                .thenThrow(new LessonNotFoundException(999));

        // Act & Assert
        mockMvc.perform(post("/api/progress/lesson")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validJson))
                .andExpect(status().isNotFound()) // Esperar HTTP 404
                .andExpect(jsonPath("$.error").value("Not Found"))
                .andExpect(jsonPath("$.message").value("Lesson not found with id: 999"));
    }

    @Test
    @WithMockUser
    void claimTreasure_shouldReturnOkAndLingots() throws Exception {
        // Arrange
        Integer lessonId = 4; // ID de un tesoro

        // Simular el resultado del Caso de Uso de Tesoro
        ClaimTreasureResult result = new ClaimTreasureResult(20, 125);
        when(claimTreasureUseCase.claimTreasure(lessonId)).thenReturn(result);

        // Act & Assert
        mockMvc.perform(post("/api/progress/treasure/{lessonId}", lessonId)
                        .header("Authorization", "Bearer mock-token")) // Simulación del token
                .andExpect(status().isOk())
                // El controlador devuelve un Map<String, Integer>
                .andExpect(jsonPath("$.lingotsEarned").value(20))
                .andExpect(jsonPath("$.totalLingots").value(125));
    }

    @Test
    @WithMockUser
    void claimTreasure_shouldReturnBadRequest_whenAlreadyClaimed() throws Exception {
        // Arrange
        Integer lessonId = 4;

        // Simular que el Caso de Uso lanza la excepción de Dominio
        when(claimTreasureUseCase.claimTreasure(lessonId))
                .thenThrow(new TreasureAlreadyClaimedException("Tesoro ya reclamado."));

        // Act & Assert
        mockMvc.perform(post("/api/progress/treasure/{lessonId}", lessonId)
                        .header("Authorization", "Bearer mock-token"))
                .andExpect(status().isBadRequest()) // Esperar HTTP 400 según tu GlobalExceptionHandler
                .andExpect(jsonPath("$.error").value("Bad Request"))
                .andExpect(jsonPath("$.message").value("Tesoro ya reclamado."));
    }
}