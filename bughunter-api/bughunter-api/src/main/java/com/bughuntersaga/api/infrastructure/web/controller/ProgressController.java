
    package com.bughuntersaga.api.infrastructure.web.controller;

    import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.bughuntersaga.api.application.port.in.*;


    @RestController
@RequiredArgsConstructor
@RequestMapping("/progress")
    public class ProgressController {

    private final com.bughuntersaga.api.application.port.in.CompleteLessonUseCase completeLessonUseCase;
    private final com.bughuntersaga.api.application.port.in.ClaimTreasureUseCase claimTreasureUseCase;

    // TODO: Implementar endpoints de OpenAPI
    // @PostMapping("/lesson") ...
    // @PostMapping("/treasure/{lessonId}") ...

    }
