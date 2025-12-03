package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.port.in.GetModuleUnitUseCase;
import com.bughuntersaga.api.application.port.out.UnitRepositoryPort;
import com.bughuntersaga.api.application.port.out.UserRepositoryPort;
import com.bughuntersaga.api.application.port.out.UserLessonProgressRepositoryPort;
import com.bughuntersaga.api.domain.model.Unit;
import com.bughuntersaga.api.domain.model.User;
import com.bughuntersaga.api.domain.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetModuleUnitService implements GetModuleUnitUseCase {

    private final UnitRepositoryPort unitRepository;
    private final UserRepositoryPort userRepositoryPort;
    private final UserLessonProgressRepositoryPort userLessonProgressRepositoryPort;

    @Override
    public List<Unit> getModuleUnits(String moduleCode) {

        // --- 1. Obtener el usuario autenticado ---
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // viene del JWT

        User currentUser = userRepositoryPort.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado: " + username));

        // --- 2. Obtener todas las unidades del módulo ---
        List<Unit> units = unitRepository.findAllUnitsByModuleCode(moduleCode);

        if (units.isEmpty()) {
            throw new RuntimeException("No se encontraron unidades para el módulo: " + moduleCode);
        }

        // --- 3. Obtener el progreso del usuario ---
        Set<Integer> completedLessonIds =
                userLessonProgressRepositoryPort.findCompletedLessonIdsByUserId(currentUser.getId());

        // --- 4. Calcular el estado de cada lección basado en progreso secuencial ---
        for (int unitIndex = 0; unitIndex < units.size(); unitIndex++) {
            Unit unit = units.get(unitIndex);
            
            if (unit.getLessons() == null || unit.getLessons().isEmpty()) {
                continue;
            }

            // Verificar si todas las unidades anteriores están completas
            boolean previousUnitsComplete = true;
            for (int i = 0; i < unitIndex; i++) {
                Unit previousUnit = units.get(i);
                if (previousUnit.getLessons() != null) {
                    boolean allLessonsComplete = previousUnit.getLessons().stream()
                            .allMatch(l -> completedLessonIds.contains(l.getId()));
                    if (!allLessonsComplete) {
                        previousUnitsComplete = false;
                        break;
                    }
                }
            }

            // Asignar estado a cada lección en la unidad actual
            for (int lessonIndex = 0; lessonIndex < unit.getLessons().size(); lessonIndex++) {
                var lesson = unit.getLessons().get(lessonIndex);

                // Si ya está completa
                if (completedLessonIds.contains(lesson.getId())) {
                    lesson.setStatus("COMPLETE");
                    continue;
                }

                // Si hay unidades anteriores incompletas, está bloqueada
                if (!previousUnitsComplete) {
                    lesson.setStatus("LOCKED");
                    continue;
                }

                // Verificar si todas las lecciones anteriores en esta unidad están completas
                boolean previousLessonsComplete = true;
                for (int i = 0; i < lessonIndex; i++) {
                    var previousLesson = unit.getLessons().get(i);
                    if (!completedLessonIds.contains(previousLesson.getId())) {
                        previousLessonsComplete = false;
                        break;
                    }
                }

                // Asignar ACTIVE o LOCKED
                if (previousLessonsComplete) {
                    lesson.setStatus("ACTIVE");
                } else {
                    lesson.setStatus("LOCKED");
                }
            }
        }

        return units;
    }
}
