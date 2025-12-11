
package com.bughuntersaga.api.application.port.out;


import com.bughuntersaga.api.domain.model.Problem;

import java.util.List;
import java.util.Optional;

/**
 * Puerto para el repositorio de problemas.
 */
public interface ProblemRepositoryPort {
    List<Problem> findProblemsByModuleCode(String moduleCode);
    Optional<Problem> findById(Integer id);
    List<Problem> findByLessonId(Integer lessonId);
}