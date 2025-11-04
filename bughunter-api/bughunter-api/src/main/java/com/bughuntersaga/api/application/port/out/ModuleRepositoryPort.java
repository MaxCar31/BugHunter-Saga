
package com.bughuntersaga.api.application.port.out;

import com.bughuntersaga.api.domain.model.Module;
import java.util.List;
import java.util.Optional;

/**
 * Puerto para el repositorio de módulos.
 */
public interface ModuleRepositoryPort {
    List<Module> findAll();
    Optional<Module> findById(Integer id);
    Optional<Module> findByCode(String code);
}
