
package com.bughuntersaga.api.application.port.out;


import com.bughuntersaga.api.domain.model.Lesson;

import java.util.List;
import java.util.Optional;

public interface LessonRepositoryPort {
    Optional<Lesson> findById(Integer id);
    List<Lesson> findByUnitId(Integer unitId);
}
