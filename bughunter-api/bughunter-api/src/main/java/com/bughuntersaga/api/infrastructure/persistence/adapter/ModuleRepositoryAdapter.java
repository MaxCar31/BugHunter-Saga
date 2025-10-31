
package com.bughuntersaga.api.infrastructure.persistence.adapter;

import com.bughuntersaga.api.domain.model.Module;
import com.bughuntersaga.api.infrastructure.persistence.mapper.ContentPersistenceMapper;
import com.bughuntersaga.api.infrastructure.persistence.repository.ModuleJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import com.bughuntersaga.api.application.port.out.ModuleRepositoryPort;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Repository
@RequiredArgsConstructor
public class ModuleRepositoryAdapter implements ModuleRepositoryPort {

    private final ModuleJpaRepository moduleJpaRepository;
    private final ContentPersistenceMapper contentMapper;

    @Override
    public List<Module> findAll() {
        return moduleJpaRepository.findAll().stream().map(contentMapper::moduleToDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Module> findById(Integer id) {
        return moduleJpaRepository.findById(id).map(contentMapper::moduleToDomain);
    }

    @Override
    public Optional<Module> findByCode(String code) {
        return moduleJpaRepository.findByCode(code).map(contentMapper::moduleToDomain);
    }
}
