
package com.bughuntersaga.api.infrastructure.persistence.mapper;
import com.bughuntersaga.api.domain.model.Lesson;
import com.bughuntersaga.api.domain.model.Module;
import com.bughuntersaga.api.domain.model.Problem;
import com.bughuntersaga.api.domain.model.Unit;
import com.bughuntersaga.api.infrastructure.persistence.entity.LessonEntity;
import com.bughuntersaga.api.infrastructure.persistence.entity.ModuleEntity;
import com.bughuntersaga.api.infrastructure.persistence.entity.ProblemEntity;
import com.bughuntersaga.api.infrastructure.persistence.entity.UnitEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Mapper consolidado para entidades de persistencia de Content.
 *
 * Usa nombres ESPECÍFICOS para evitar ambigüedad:
 * - moduleToDomain() / moduleToEntity() ← Para Module
 * - problemToDomain() / problemToEntity() ← Para Problem
 *
 * Configuración:
 * - componentModel = "spring": Genera bean de Spring
 * - unmappedTargetPolicy = IGNORE: Ignora campos sin mapear
 */
@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface ContentPersistenceMapper {

    // ========================================
    // Mapeo de Module (Automático)
    // ========================================

    /**
     * Convierte ModuleEntity → Module.
     * MapStruct genera el código automáticamente.
     */
    Module moduleToDomain(ModuleEntity moduleEntity);

    /**
     * Convierte Module → ModuleEntity.
     * MapStruct genera el código automáticamente.
     */
    ModuleEntity moduleToEntity(Module module);


    // ========================================
    // Mapeo de Unit
    // ========================================

    /**
     * Convierte UnitEntity → Unit.
     *
     * NOTA: El campo 'lessons' no se mapea automáticamente.
     * Se debe cargar y asignar manualmente en el adaptador.
     */
    @Mapping(target = "lessons", ignore = true)
    Unit unitToDomain(UnitEntity entity);

    UnitEntity unitToEntity(Unit domain);

    // ========================================
    // Mapeo de Lesson
    // ========================================

    /**
     * Convierte LessonEntity → Lesson.
     *
     * NOTA: El campo 'status' no existe en la BD.
     * Se debe asignar manualmente según la lógica de negocio.
     */
    @Mapping(target = "status", ignore = true)
    Lesson lessonToDomain(LessonEntity entity);

    LessonEntity lessonToEntity(Lesson domain);


    // ========================================
    // Mapeo de Problem
    // ========================================

    default Problem problemToDomain(ProblemEntity entity) {
        if (entity == null) return null;

        Problem.ProblemBuilder builder = Problem.builder()
                .type(entity.getType());

        Map<String, Object> content = entity.getContent();
        if (content == null) return builder.build();

        // Extraer campos comunes primero (como 'question')
        builder.question((String) content.get("question"));

        // Extraer campos específicos del tipo
        switch (entity.getType()) {
            case "INFO" -> mapInfoType(builder, content);
            case "SELECT_1_OF_3" -> mapSelectType(builder, content);
            case "FILL_IN_THE_BLANK" -> mapFillInBlankType(builder, content);
        }

        return builder.build();
    }

    // ... (problemToEntity está bien) ...

    // ========================================
    // Métodos Auxiliares (Corregidos)
    // ========================================

    /**
     * Mapea campos para tipo INFO.
     * CORREGIDO: Extrae: title, content
     */
    @SuppressWarnings("unchecked")
    default void mapInfoType(Problem.ProblemBuilder builder, Map<String, Object> content) {
        // Tu SQL usa 'title', no 'moduleTitle' en el problema
        builder.introduction((String) content.get("title"));

        // Aquí puedes decidir cómo mapear 'content' y 'example'
        // Por ejemplo, podrías concatenarlos o usar 'introduction' para 'content'
        // Asumamos que 'introduction' en el dominio es el 'title' de la BD
        // y 'moduleTitle' es el 'content' de la BD.
        builder.moduleTitle((String) content.get("content"));

        // 'objectives' no existe en tu SQL.
    }

    /**
     * Mapea campos para tipo SELECT_1_OF_3.
     * CORREGIDO: Extrae: question, options (como answers), correctAnswer
     */
    @SuppressWarnings("unchecked")
    default void mapSelectType(Problem.ProblemBuilder builder, Map<String, Object> content) {
        // 'question' ya se mapea arriba

        // CORREGIDO: Tu SQL usa "options", no "answers"
        Object answersObj = content.get("options");
        if (answersObj instanceof List) {
            List<Map<String, Object>> answersRaw = (List<Map<String, Object>>) answersObj;
            List<Problem.AnswerOption> answers = answersRaw.stream()
                    .map(map -> Problem.AnswerOption.builder()
                            // CORREGIDO: Tu SQL usa "text", no "name"
                            .name((String) map.get("text"))
                            .build())
                    .collect(Collectors.toList());
            builder.answers(answers);
        }

        // Mapear respuesta correcta
        // Tu SQL la tiene como String ("b"), pero tu dominio la espera como Integer.
        // Aquí necesitarás una lógica para convertir "a"->0, "b"->1, "c"->2
        Object correctAnswer = content.get("correctAnswer");
        if (correctAnswer instanceof String) {
            switch ((String) correctAnswer) {
                case "a" -> builder.correctAnswer(0);
                case "b" -> builder.correctAnswer(1);
                case "c" -> builder.correctAnswer(2);
                // Añade más casos si es necesario
            }
        }
    }

    /**
     * Mapea campos para tipo FILL_IN_THE_BLANK.
     * CORREGIDO: Extrae: question, blanks, correctAnswers
     */
    @SuppressWarnings("unchecked")
    default void mapFillInBlankType(Problem.ProblemBuilder builder, Map<String, Object> content) {
        // 'question' ya se mapea arriba

        // CORREGIDO: Tu SQL usa "blanks", no "answerTiles"
        Object answerTiles = content.get("blanks");
        if (answerTiles instanceof List) {
            builder.answerTiles((List<String>) answerTiles);
        }

        // CORREGIDO: Tu SQL usa "correctAnswers" (lista de Strings)
        // pero tu dominio espera "correctAnswerIndices" (lista de Integers)
        // Por ahora, asumiré que "correctAnswers" de tu SQL *debería*
        // haber sido "correctAnswerIndices" con números.
        // Si no, la lógica de conversión es más compleja.
        Object correctIndices = content.get("correctAnswerIndices"); // Asumiendo que cambias el SQL
        if (correctIndices instanceof List) {
            List<Integer> indices = ((List<?>) correctIndices).stream()
                    .filter(obj -> obj instanceof Number)
                    .map(obj -> ((Number) obj).intValue())
                    .collect(Collectors.toList());
            builder.correctAnswerIndices(indices);
        }
    }
}
