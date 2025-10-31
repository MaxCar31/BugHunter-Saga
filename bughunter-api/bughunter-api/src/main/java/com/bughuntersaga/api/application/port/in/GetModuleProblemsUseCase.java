
package com.bughuntersaga.api.application.port.in;


import com.bughuntersaga.api.domain.model.Problem;

import java.util.List;

public interface GetModuleProblemsUseCase {

    List<Problem> getModuleProblems(String moduleName);

}
