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
 * Mapper consolidado para entidades de persistencia de contenido.
 * 
 * Mapea entidades ↔ modelos de dominio para modules, units, lessons y problems.
 * 
 * Configuración:
 * - componentModel = "spring"
 * - unmappedTargetPolicy = IGNORE
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ContentPersistenceMapper {

    // ============================================================
    // MODULE
    // ============================================================

    Module moduleToDomain(ModuleEntity moduleEntity);

    ModuleEntity moduleToEntity(Module module);

    // ============================================================
    // UNIT
    // ============================================================

    @Mapping(target = "lessons", ignore = true)
    Unit unitToDomain(UnitEntity entity);

    UnitEntity unitToEntity(Unit domain);

    // ============================================================
    // LESSON
    // ============================================================

    @Mapping(target = "status", ignore = true)
    Lesson lessonToDomain(LessonEntity entity);

    LessonEntity lessonToEntity(Lesson domain);

    // ============================================================
    // PROBLEM
    // ============================================================

    /**
     * Convierte ProblemEntity → Problem (dominio).
     * Mapea dinámicamente según el tipo definido en el JSON.
     */
    default Problem problemToDomain(ProblemEntity entity) {
        if (entity == null)
            return null;

        Map<String, Object> content = entity.getContent();
        if (content == null) {
            return Problem.builder()
                    .type(entity.getType())
                    .build();
        }

        Problem.ProblemBuilder builder = Problem.builder()
                .type(entity.getType())
                .question((String) content.get("question"))
                .moduleTitle((String) content.get("moduleTitle"))
                .introduction((String) content.get("introduction"))
                .objectives((List<String>) content.get("objectives"));

        switch (entity.getType()) {
            case "INFO" -> mapInfo(builder, content);
            case "MULTIPLE_CHOICE" -> mapMultipleChoice(builder, content);
            case "FILL_IN_THE_BLANK" -> mapFillInBlank(builder, content);
            case "CODE_CHALLENGE" -> mapCodeChallenge(builder, content);
        }

        return builder.build();
    }

    // ============================================================
    // Métodos auxiliares por tipo
    // ============================================================

    @SuppressWarnings("unchecked")
    private void mapInfo(Problem.ProblemBuilder builder, Map<String, Object> content) {
        // INFO ya tiene moduleTitle, introduction y objectives, nada extra.
    }

    @SuppressWarnings("unchecked")
    private void mapMultipleChoice(Problem.ProblemBuilder builder, Map<String, Object> content) {
        Object answersObj = content.get("answers");
        if (answersObj instanceof List<?> answersList) {
            List<Map<String, Object>> rawAnswers = (List<Map<String, Object>>) answersList;
            List<Problem.AnswerOption> answers = rawAnswers.stream()
                    .map(map -> Problem.AnswerOption.builder()
                            .name((String) map.get("name"))
                            .build())
                    .collect(Collectors.toList());
            builder.answers(answers);
        }

        Object correctAnswer = content.get("correctAnswer");
        if (correctAnswer instanceof Number number) {
            builder.correctAnswer(number.intValue());
        }
    }

    @SuppressWarnings("unchecked")
    private void mapFillInBlank(Problem.ProblemBuilder builder, Map<String, Object> content) {
        Object tiles = content.get("answerTiles");
        if (tiles instanceof List<?> tileList) {
            builder.answerTiles((List<String>) tileList);
        }

        Object indices = content.get("correctAnswerIndices");
        if (indices instanceof List<?> indexList) {
            List<Integer> parsed = ((List<?>) indexList).stream()
                    .filter(o -> o instanceof Number)
                    .map(o -> ((Number) o).intValue())
                    .collect(Collectors.toList());
            builder.correctAnswerIndices(parsed);
        }
    }

    @SuppressWarnings("unchecked")
    private void mapCodeChallenge(Problem.ProblemBuilder builder, Map<String, Object> content) {
        builder.codeTemplate((String) content.get("codeTemplate"));
        builder.expectedAnswer((String) content.get("expectedAnswer"));
        builder.hint((String) content.get("hint"));
        builder.explanation((String) content.get("explanation"));

        Object testCasesObj = content.get("testCases");
        if (testCasesObj instanceof List<?> testCasesList) {
            List<Map<String, Object>> rawTestCases = (List<Map<String, Object>>) testCasesList;
            List<Problem.TestCase> testCases = rawTestCases.stream()
                    .map(map -> Problem.TestCase.builder()
                            .input((String) map.get("input"))
                            .expectedOutput((String) map.get("expectedOutput"))
                            .description((String) map.get("description"))
                            .build())
                    .collect(Collectors.toList());
            builder.testCases(testCases);
        }
    }

    // ============================================================
    // problemToEntity
    // ============================================================

    default ProblemEntity problemToEntity(Problem domain) {
        if (domain == null)
            return null;

        Map<String, Object> content = Map.ofEntries(
                Map.entry("type", domain.getType()),
                Map.entry("moduleTitle", domain.getModuleTitle()),
                Map.entry("introduction", domain.getIntroduction()),
                Map.entry("objectives", domain.getObjectives()),
                Map.entry("question", domain.getQuestion()),
                Map.entry("answers", domain.getAnswers()),
                Map.entry("correctAnswer", domain.getCorrectAnswer()),
                Map.entry("answerTiles", domain.getAnswerTiles()),
                Map.entry("correctAnswerIndices", domain.getCorrectAnswerIndices()));

        return ProblemEntity.builder()
                .type(domain.getType())
                .content(content)
                .build();
    }
}
