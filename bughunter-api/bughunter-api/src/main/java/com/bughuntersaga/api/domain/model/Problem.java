
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
}