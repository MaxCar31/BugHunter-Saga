package com.bughuntersaga.api.infrastructure.web.mapper;

import com.bughuntersaga.api.application.dto.CompleteLessonCommand;
import com.bughuntersaga.api.application.port.in.CompleteLessonResult;
import com.bughuntersaga.api.infrastructure.web.dto.LessonCompletionResponseDTO;
import com.bughuntersaga.api.infrastructure.web.dto.LessonResultDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProgressApiMapper {

    /**
     * Mapea el DTO web de entrada al Comando de aplicación.
     */
    CompleteLessonCommand toCommand(LessonResultDTO dto);

    /**
     * Mapea el Resultado de dominio al DTO web de salida.
     */
    LessonCompletionResponseDTO toDTO(CompleteLessonResult result);
}