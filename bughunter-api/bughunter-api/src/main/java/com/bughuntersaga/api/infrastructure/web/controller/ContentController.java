package com.bughuntersaga.api.infrastructure.web.controller;

import com.bughuntersaga.api.application.port.in.GetModuleProblemsUseCase;
import com.bughuntersaga.api.application.port.in.GetModuleUnitUseCase;
import com.bughuntersaga.api.application.port.in.GetModulesUseCase;
import com.bughuntersaga.api.domain.model.Module;
import com.bughuntersaga.api.domain.model.Problem;
import com.bughuntersaga.api.domain.model.Unit;
import com.bughuntersaga.api.infrastructure.web.dto.ModuleResponseDTO;
import com.bughuntersaga.api.infrastructure.web.dto.ProblemDTO;
import com.bughuntersaga.api.infrastructure.web.dto.UnitDetailDTO;
import com.bughuntersaga.api.infrastructure.web.mapper.ContentApiMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/content/modules")
public class ContentController {

    private final ContentApiMapper contentApiMapper;
    private final GetModulesUseCase getModulesUseCase;
    private final GetModuleProblemsUseCase getModuleProblemsUseCase;
    private final GetModuleUnitUseCase getModuleUnitUseCase;


    @GetMapping("")
    public ResponseEntity<List<ModuleResponseDTO>> getModules() {
        List<Module> modules = getModulesUseCase.getModules();
        List<ModuleResponseDTO> moduleResponseDTOs = modules.stream().map(contentApiMapper::toModuleResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(moduleResponseDTOs);
    }

    @GetMapping("/{moduleCode}/problems")
    public ResponseEntity<List<ProblemDTO>> getProblemsByModule(@PathVariable("moduleCode") String moduleCode) {
        List<Problem> problems = getModuleProblemsUseCase.getModuleProblems(moduleCode);
        List<ProblemDTO> problemDTOS = problems.stream().map(contentApiMapper::toProblemDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(problemDTOS);
    }


    @GetMapping("/{moduleCode}/unit")
    public ResponseEntity<UnitDetailDTO> getUnitsByModule(@PathVariable("moduleCode") String moduleCode) {
        // Ejecutar caso de uso
        Unit unit = getModuleUnitUseCase.getModuleUnit(moduleCode);

        // Convertir a DTO
        UnitDetailDTO response = contentApiMapper.toUnitDTO(unit);
        return ResponseEntity.ok(response);
    }

}
