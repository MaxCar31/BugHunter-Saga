// Ubicación: application/port/in/GetLessonProblemsUseCase.java
package com.bughuntersaga.api.application.port.in;

import com.bughuntersaga.api.domain.model.Problem;
import java.util.List;

/**
 * Caso de uso para obtener todos los problemas de una lección específica.
 */
public interface GetLessonProblemsUseCase {

    /**
     * Obtiene todos los problemas ordenados por posición dentro de una lección.
     *
     * @param lessonId ID de la lección
     * @return Lista de Problemas
     * @throws com.bughuntersaga.api.domain.exception.LessonNotFoundException si la lección no existe.
     */
    List<Problem> getProblemsByLessonId(Integer lessonId);

}