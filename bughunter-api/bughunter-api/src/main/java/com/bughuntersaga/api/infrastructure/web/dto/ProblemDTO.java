package com.bughuntersaga.api.infrastructure.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ProblemDTO(
        String type,

        String moduleTitle,
        String introduction,
        List<String> objectives,


        String question,

        // Campos para SELECT_1_OF_3
        List<AnswerOption> answers,
        Integer correctAnswer,

        // Campos para FILL_IN_THE_BLANK
        List<String> answerTiles,


        List<Integer> correctAnswerIndices
)
{
    public record AnswerOption(String name) {}
}