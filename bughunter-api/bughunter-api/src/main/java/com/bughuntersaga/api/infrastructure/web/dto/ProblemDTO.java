package com.bughuntersaga.api.infrastructure.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

/**
 * DTO de respuesta para problema.
 * Campos nulos no aparecen en el JSON.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ProblemDTO(
        String type,

        // Campos para tipo INFO
        String moduleTitle,
        String introduction,
        List<String> objectives,

        // Campos para preguntas
        String question,

        // Campos para SELECT_1_OF_3
        List<AnswerOption> answers,
        Integer correctAnswer,

        // Campos para FILL_IN_THE_BLANK
        List<String> answerTiles,

        @JsonProperty("correctAnswer")
        List<Integer> correctAnswerIndices
        // --- FIN DE LA CORRECCIÓN ---
) {
    public record AnswerOption(String name) {}
}