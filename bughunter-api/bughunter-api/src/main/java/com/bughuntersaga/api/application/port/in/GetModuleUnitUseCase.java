
package com.bughuntersaga.api.application.port.in;


import com.bughuntersaga.api.domain.model.Unit;


public interface GetModuleUnitUseCase {

    Unit getModuleUnit(String moduleCode);

}
