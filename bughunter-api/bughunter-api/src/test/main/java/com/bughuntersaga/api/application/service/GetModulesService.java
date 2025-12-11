
package com.bughuntersaga.api.application.service;

import com.bughuntersaga.api.application.port.out.ModuleRepositoryPort;
import com.bughuntersaga.api.domain.model.Module;
import lombok.RequiredArgsConstructor;
import com.bughuntersaga.api.domain.model.Module;
import org.springframework.stereotype.Service;
import com.bughuntersaga.api.application.port.in.GetModulesUseCase;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetModulesService implements GetModulesUseCase {

    private final ModuleRepositoryPort moduleRepository;

    @Override
    public List<Module> getModules() {
        List<Module> modules = moduleRepository.findAll();
        return modules;
    }
}
