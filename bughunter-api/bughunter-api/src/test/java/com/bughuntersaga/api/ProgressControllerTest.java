package com.bughuntersaga.api;

import com.bughuntersaga.api.application.port.in.CompleteLessonUseCase;
import com.bughuntersaga.api.application.port.in.ClaimTreasureUseCase;
import com.bughuntersaga.api.application.port.in.CompleteLessonResult;
import com.bughuntersaga.api.infrastructure.web.controller.ProgressController;
import com.bughuntersaga.api.infrastructure.web.mapper.ProgressApiMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ProgressController.class)
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
}