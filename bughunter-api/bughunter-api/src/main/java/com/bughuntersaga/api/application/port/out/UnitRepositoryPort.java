
package com.bughuntersaga.api.application.port.out;


import com.bughuntersaga.api.domain.model.Unit;

import java.util.List;
import java.util.Optional;

public interface UnitRepositoryPort {

    /**
     * Obtiene la primera unidad de un módulo.
     *
     * @param moduleCode Código del módulo
     * @return Primera unidad con sus lecciones
     */
    Optional<Unit> findFirstUnitByModuleCode(String moduleCode);

    /**
     * Obtiene todas las unidades de un módulo.
     *
     * @param moduleCode Código del módulo
     * @return Lista de unidades
     */
    List<Unit> findUnitsByModuleCode(String moduleCode);

    /**
     * Obtiene una unidad por su ID, incluyendo sus lecciones.
     *
     * @param unitId ID de la unidad
     * @return Unidad con sus lecciones
     */
    Optional<Unit> findByIdWithLessons(Integer unitId);

}
