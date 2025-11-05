// Ubicación: application/service/GetLessonProblemsService.java
package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.port.in.GetLessonProblemsUseCase;
import com.bughuntersaga.api.application.port.out.ProblemRepositoryPort;
import com.bughuntersaga.api.domain.exception.LessonNotFoundException;
import com.bughuntersaga.api.domain.model.Problem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetLessonProblemsService implements GetLessonProblemsUseCase {

    private final ProblemRepositoryPort problemRepositoryPort;

    @Override
    public List<Problem> getProblemsByLessonId(Integer lessonId) {

        List<Problem> problems = problemRepositoryPort.findByLessonId(lessonId);

        return problems;
    }
}