package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.port.in.GetModuleUnitUseCase;
import com.bughuntersaga.api.application.port.out.UnitRepositoryPort;
import com.bughuntersaga.api.application.port.out.UserRepositoryPort;
import com.bughuntersaga.api.application.port.out.UserLessonProgressRepositoryPort;
import com.bughuntersaga.api.domain.model.Lesson;
import com.bughuntersaga.api.domain.model.Unit;
import com.bughuntersaga.api.domain.model.User;
import com.bughuntersaga.api.domain.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetModuleUnitService implements GetModuleUnitUseCase {

    private final UnitRepositoryPort unitRepository;
    private final UserRepositoryPort userRepositoryPort;
    private final UserLessonProgressRepositoryPort userLessonProgressRepositoryPort;

    @Override
    public Unit getModuleUnit(String moduleCode) {

        // --- 1. Obtener el usuario autenticado ---
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // Esto viene del token JWT

        User currentUser = userRepositoryPort.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado: " + username));

        // --- 2. Obtener la unidad (Lógica de Fase 2) ---
        Unit unit = unitRepository.findFirstUnitByModuleCode(moduleCode)
                .orElseThrow(() -> new RuntimeException("Módulo no encontrado: " + moduleCode));

        // --- 3. Obtener el progreso del usuario (Lógica de Fase 4) ---
        Set<Integer> completedLessonIds = userLessonProgressRepositoryPort
                .findCompletedLessonIdsByUserId(currentUser.getId());

        // --- 4. Calcular el 'status' real ---
        if (unit.getLessons() != null) {
            // Ordenamos por posición para asegurar la secuencia 1 -> 2 -> 3
            List<Lesson> sortedLessons = unit.getLessons().stream()
                    .sorted(Comparator.comparingInt(Lesson::getPosition))
                    .collect(Collectors.toList());

            boolean previousCompleted = true; // La primera siempre está desbloqueada

            for (Lesson lesson : sortedLessons) {
                if (completedLessonIds.contains(lesson.getId())) {
                    lesson.setStatus("COMPLETE");
                    previousCompleted = true;
                } else {
                    if (previousCompleted) {
                        lesson.setStatus("ACTIVE"); // Es la siguiente disponible
                        previousCompleted = false; // Las siguientes estarán bloqueadas
                    } else {
                        lesson.setStatus("LOCKED"); // <--- ESTADO CORRECTO
                    }
                }
            }
            unit.setLessons(sortedLessons);
        }

        return unit;
    }
}