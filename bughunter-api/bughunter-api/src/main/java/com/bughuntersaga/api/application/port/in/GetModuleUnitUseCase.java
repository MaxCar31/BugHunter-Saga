package com.bughuntersaga.api.application.port.in;

import com.bughuntersaga.api.domain.model.Unit;
import java.util.List;

public interface GetModuleUnitUseCase {
    List<Unit> getModuleUnits(String moduleCode);
}
