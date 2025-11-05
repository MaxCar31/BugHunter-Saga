package com.bughuntersaga.api.infrastructure.web.controller;

import com.bughuntersaga.api.application.dto.CompleteLessonCommand;
import com.bughuntersaga.api.application.port.in.ClaimTreasureResult;
import com.bughuntersaga.api.application.port.in.ClaimTreasureUseCase;
import com.bughuntersaga.api.application.port.in.CompleteLessonResult;
import com.bughuntersaga.api.application.port.in.CompleteLessonUseCase;
import com.bughuntersaga.api.infrastructure.web.dto.LessonCompletionResponseDTO;
import com.bughuntersaga.api.infrastructure.web.dto.LessonResultDTO;
import com.bughuntersaga.api.infrastructure.web.mapper.ProgressApiMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/progress")
public class ProgressController {

    private final CompleteLessonUseCase completeLessonUseCase;
    private final ClaimTreasureUseCase claimTreasureUseCase;
    private final ProgressApiMapper progressApiMapper; // Añadido

    /**
     * Endpoint para registrar la finalización de una lección (Fase 3).
     * Coincide con: POST /api/progress/lesson
     */
    @PostMapping("/lesson")
    public ResponseEntity<LessonCompletionResponseDTO> completeLesson(
            @Valid @RequestBody LessonResultDTO lessonResultDTO) {

        // 1. Mapear DTO (web) a Comando (app)
        CompleteLessonCommand command = progressApiMapper.toCommand(lessonResultDTO);

        // 2. Ejecutar el caso de uso
        CompleteLessonResult result = completeLessonUseCase.handle(command);

        // 3. Mapear Resultado (app) a DTO (web)
        LessonCompletionResponseDTO responseDTO = progressApiMapper.toDTO(result);

        return ResponseEntity.ok(responseDTO);
    }

    /**
     * Endpoint para reclamar un tesoro (Fase 4).
     * Coincide con: POST /api/progress/treasure/{lessonId}
     */
    @PostMapping("/treasure/{lessonId}")
    public ResponseEntity<Map<String, Integer>> claimTreasure(@PathVariable("lessonId") Integer lessonId) {

        ClaimTreasureResult result = claimTreasureUseCase.claimTreasure(lessonId);

        Map<String, Integer> response = Map.of(
                "lingotsEarned", result.lingotsEarned(),
                "totalLingots", result.totalLingots()
        );

        return ResponseEntity.ok(response);
    }
}