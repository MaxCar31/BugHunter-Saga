
    package com.bughuntersaga.api.infrastructure.persistence.adapter;

    import com.bughuntersaga.api.domain.model.Lesson;
    import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import com.bughuntersaga.api.application.port.out.LessonRepositoryPort;

    import java.util.List;
    import java.util.Optional;


    @Repository
@RequiredArgsConstructor
    public class LessonRepositoryAdapter implements LessonRepositoryPort {

    // Contenido de la clase

        @Override
        public Optional<Lesson> findById(Integer id) {
            return Optional.empty();
        }

        @Override
        public List<Lesson> findByUnitId(Integer unitId) {
            return List.of();
        }
    }
