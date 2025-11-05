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
        List<AnswerOption> answers,
        Integer correctAnswer,
        List<String> answerTiles,
        List<Integer> correctAnswerIndices
)
{
    public record AnswerOption(String name) {}
}