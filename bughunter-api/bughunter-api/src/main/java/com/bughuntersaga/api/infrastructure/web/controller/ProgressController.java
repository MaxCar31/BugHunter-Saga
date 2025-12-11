package com.bughuntersaga.api.infrastructure.web.controller;

import com.bughuntersaga.api.application.dto.CompleteLessonCommand;
import com.bughuntersaga.api.application.dto.UnitProgressResponse;
import com.bughuntersaga.api.application.port.in.ClaimTreasureResult;
import com.bughuntersaga.api.application.port.in.ClaimTreasureUseCase;
import com.bughuntersaga.api.application.port.in.CompleteLessonResult;
import com.bughuntersaga.api.application.port.in.CompleteLessonUseCase;
import com.bughuntersaga.api.application.port.out.LessonRepositoryPort;
import com.bughuntersaga.api.application.port.out.UserLessonProgressRepositoryPort;
import com.bughuntersaga.api.application.port.out.UserRepositoryPort;
import com.bughuntersaga.api.domain.exception.UserNotFoundException;
import com.bughuntersaga.api.domain.model.User;
import com.bughuntersaga.api.infrastructure.web.dto.LessonCompletionResponseDTO;
import com.bughuntersaga.api.infrastructure.web.dto.LessonResultDTO;
import com.bughuntersaga.api.infrastructure.web.mapper.ProgressApiMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/progress")
public class ProgressController {

    private final CompleteLessonUseCase completeLessonUseCase;
    private final ClaimTreasureUseCase claimTreasureUseCase;
    private final ProgressApiMapper progressApiMapper; // Añadido

    // Dependencias para el progreso de unidad
    private final UserRepositoryPort userRepositoryPort;
    private final LessonRepositoryPort lessonRepositoryPort;
    private final UserLessonProgressRepositoryPort userLessonProgressRepositoryPort;

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
                "totalLingots", result.totalLingots());

        return ResponseEntity.ok(response);
    }

    /**
     * Endpoint para obtener el progreso de una unidad específica.
     * GET /api/progress/unit/{unitId}
     */
    @GetMapping("/unit/{unitId}")
    public ResponseEntity<UnitProgressResponse> getUnitProgress(@PathVariable("unitId") Integer unitId) {

        // Obtener usuario actual
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepositoryPort.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado: " + username));

        // Obtener todas las lecciones de la unidad
        var lessonsInUnit = lessonRepositoryPort.findByUnitId(unitId);
        int totalLessons = lessonsInUnit.size();

        if (totalLessons == 0) {
            // Unidad vacía o no existe
            return ResponseEntity.ok(UnitProgressResponse.builder()
                    .unitId(unitId)
                    .unitTitle("Unidad " + unitId)
                    .currentXp(0)
                    .totalXpNeeded(0)
                    .completedLessons(0)
                    .totalLessons(0)
                    .progressPercentage(0.0)
                    .build());
        }

        // Calcular XP total necesario (máximo 10 XP por lección)
        int totalXpNeeded = totalLessons * 10;

        // Calcular XP actual y lecciones completadas
        int currentXp = 0;
        int completedLessons = 0;

        for (var lesson : lessonsInUnit) {
            int completions = userLessonProgressRepositoryPort.countCompletionsByUserIdAndLessonId(
                    currentUser.getId(), lesson.getId());

            if (completions > 0) {
                completedLessons++;
                // Para el XP actual, obtener el mejor score de todas las completaciones
                // Asumiendo que el primer intento da el XP máximo
                currentXp += 10; // TODO: Obtener el XP real basado en el mejor score
            }
        }

        // Calcular porcentaje de progreso
        double progressPercentage = totalXpNeeded > 0 ? (double) currentXp / totalXpNeeded * 100.0 : 0.0;

        UnitProgressResponse response = UnitProgressResponse.builder()
                .unitId(unitId)
                .unitTitle("Unidad " + unitId) // TODO: Obtener título real de la unidad
                .currentXp(currentXp)
                .totalXpNeeded(totalXpNeeded)
                .completedLessons(completedLessons)
                .totalLessons(totalLessons)
                .progressPercentage(progressPercentage)
                .build();

        return ResponseEntity.ok(response);
    }
}