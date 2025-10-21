package com.bughuntersaga.api.infrastructure.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.bughuntersaga.api.application.port.in.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/content")
    public class ContentController {

    private final com.bughuntersaga.api.application.port.in.GetModulesUseCase getModulesUseCase;
    private final com.bughuntersaga.api.application.port.in.GetModuleUnitUseCase getModuleUnitUseCase;
    private final com.bughuntersaga.api.application.port.in.GetModuleProblemsUseCase getModuleProblemsUseCase;

    // TODO: Implementar endpoints de OpenAPI
    // @GetMapping("/modules") ...
    // @GetMapping("/modules/{moduleCode}/unit") ...
    // @GetMapping("/modules/{moduleCode}/problems") ...

    }
