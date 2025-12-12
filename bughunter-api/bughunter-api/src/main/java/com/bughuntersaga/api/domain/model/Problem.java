
package com.bughuntersaga.api.domain.model;

import lombok.*;

import java.util.List;

/**
 * Entidad de dominio Problem.
 * Contiene campos específicos según el tipo de problema.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Problem {

    private String type;

    // Campos para tipo INFO
    private String moduleTitle;
    private String introduction;
    private List<String> objectives;

    // Campos para preguntas
    private String question;

    // Campos para SELECT_1_OF_3
    private List<AnswerOption> answers;
    private Integer correctAnswer;

    // Campos para FILL_IN_THE_BLANK
    private List<String> answerTiles;
    private List<Integer> correctAnswerIndices;

    // Campos para CODE_CHALLENGE
    private String codeTemplate;
    private String expectedAnswer;
    private String hint;
    private String explanation;
    private List<TestCase> testCases;

    /**
     * Opción de respuesta.
     */
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AnswerOption {
        private String name;
    }

    /**
     * Caso de prueba para CODE_CHALLENGE.
     */
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TestCase {
        private String input;
        private String expectedOutput;
        private String description;
    }
}