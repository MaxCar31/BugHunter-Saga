package com.bughuntersaga.api.application.port.in;

import com.bughuntersaga.api.application.dto.CompleteLessonCommand;

/**
 * Caso de uso para registrar la finalización de una lección.
 */
public interface CompleteLessonUseCase {

    /**
     * Maneja la lógica de negocio de completar una lección.
     *
     * @param command DTO con los detalles de la lección completada.
     * @return Un objeto CompleteLessonResult con las recompensas obtenidas.
     * @throws com.bughuntersaga.api.domain.exception.LessonAlreadyCompletedException si la lección ya fue completada.
     */
    CompleteLessonResult handle(CompleteLessonCommand command);
}