
package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.port.out.UnitRepositoryPort;
import com.bughuntersaga.api.domain.model.Unit;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.bughuntersaga.api.application.port.in.GetModuleUnitUseCase;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetModuleUnitService implements GetModuleUnitUseCase {

    private final UnitRepositoryPort unitRepository;


    @Override
    public Unit getModuleUnit(String moduleCode) {
        // FASE 1: Obtener la primera unidad
        Unit unit = unitRepository.findFirstUnitByModuleCode(moduleCode)
                .orElseThrow(() -> new RuntimeException("Módulo no encontrado: " + moduleCode));

        // FASE 1: Marcar todas las lecciones como ACTIVE
        if (unit.getLessons() != null) {
            unit.getLessons().forEach(lesson -> lesson.setStatus("ACTIVE"));
        }

        return unit;
    }

}
