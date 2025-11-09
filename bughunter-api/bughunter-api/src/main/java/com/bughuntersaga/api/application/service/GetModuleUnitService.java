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

        // --- 4. Actualizar el estado de cada lección ---
        units.forEach(unit -> {
            if (unit.getLessons() != null) {
                unit.getLessons().forEach(lesson -> {
                    if (completedLessonIds.contains(lesson.getId())) {
                        lesson.setStatus("COMPLETE");
                    } else {
                        lesson.setStatus("ACTIVE");
                    }
                });
            }
        });

        return units;
    }
}
