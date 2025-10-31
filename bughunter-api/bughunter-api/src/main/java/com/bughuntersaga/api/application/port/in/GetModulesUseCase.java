
package com.bughuntersaga.api.application.port.in;

import com.bughuntersaga.api.domain.model.Module;
import java.util.List;

public interface GetModulesUseCase {

    List<Module> getModules();

}
