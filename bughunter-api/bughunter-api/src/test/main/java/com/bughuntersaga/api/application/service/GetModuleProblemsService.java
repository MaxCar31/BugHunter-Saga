
package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.port.out.ProblemRepositoryPort;
import com.bughuntersaga.api.domain.model.Problem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.bughuntersaga.api.application.port.in.GetModuleProblemsUseCase;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class GetModuleProblemsService implements GetModuleProblemsUseCase {

    private final ProblemRepositoryPort problemRepository;
    @Override
    public List<Problem> getModuleProblems(String moduleName) {
        List<Problem> problems = problemRepository.findProblemsByModuleCode(moduleName);
        return problems;
    }
}
