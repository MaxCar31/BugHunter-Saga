package com.bughuntersaga.api.infrastructure.web.mapper;

import com.bughuntersaga.api.domain.model.Lesson;
import com.bughuntersaga.api.domain.model.Problem;
import com.bughuntersaga.api.domain.model.Unit;
import com.bughuntersaga.api.infrastructure.web.dto.LessonTileDTO;
import com.bughuntersaga.api.infrastructure.web.dto.ModuleResponseDTO;
import com.bughuntersaga.api.domain.model.Module;
import com.bughuntersaga.api.infrastructure.web.dto.ProblemDTO;
import com.bughuntersaga.api.infrastructure.web.dto.UnitDetailDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.stream.Collectors;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ContentApiMapper {

    @Mapping(source = "name", target = "shortName")
    ModuleResponseDTO toModuleResponseDTO(Module module);


    UnitDetailDTO toUnitDetailDTO(Unit unit);

    @Mapping(target = "answers", expression = "java(mapAnswers(problem))")
    ProblemDTO toProblemDTO(Problem problem);

    default java.util.List<ProblemDTO.AnswerOption> mapAnswers(Problem problem) {
        if (problem.getAnswers() == null) return null;
        return problem.getAnswers().stream()
                .map(answer -> new ProblemDTO.AnswerOption(answer.getName()))
                .collect(Collectors.toList());
    }
    /**
     * Convierte Unit → UnitDTO
     * NOTA: Los colores (backgroundColor, textColor, borderColor)
     * no están en el dominio Unit. Deben ser configurados
     * manualmente o venir del módulo.
     */
    @Mapping(target = "backgroundColor", constant = "bg-blue-500")
    @Mapping(target = "textColor", constant = "text-white")
    @Mapping(target = "borderColor", constant = "border-blue-700")
    @Mapping(target = "tiles", source = "lessons")
    UnitDetailDTO toUnitDTO(Unit unit);

    /**
     * Convierte Lesson → LessonTileDTO.
     */
    @Mapping(target = "lessonId", source = "id")
    LessonTileDTO toLessonTileDTO(Lesson lesson);
}