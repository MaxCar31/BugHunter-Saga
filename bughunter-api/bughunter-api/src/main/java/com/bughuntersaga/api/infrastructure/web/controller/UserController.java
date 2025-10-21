
    package com.bughuntersaga.api.infrastructure.web.controller;

    import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.bughuntersaga.api.application.port.in.*;


    @RestController
@RequiredArgsConstructor
@RequestMapping("/users")
    public class UserController {

    private final com.bughuntersaga.api.application.port.in.GetUserProfileUseCase getUserProfileUseCase;
    private final com.bughuntersaga.api.application.port.in.UpdateUserAccountUseCase updateUserAccountUseCase;
    private final com.bughuntersaga.api.application.port.in.UpdateUserSettingsUseCase updateUserSettingsUseCase;
    private final com.bughuntersaga.api.application.port.in.GetUserStatsUseCase getUserStatsUseCase;

    // TODO: Implementar endpoints de OpenAPI
    // @GetMapping("/me/profile") ...
    // @PutMapping("/me/account") ...
    // @PutMapping("/me/settings") ...
    // @GetMapping("/me/stats") ...

    }
