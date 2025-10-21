
    package com.bughuntersaga.api.infrastructure.web.controller;

    import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.bughuntersaga.api.application.port.in.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
    public class AuthController {

    private final com.bughuntersaga.api.application.port.in.RegisterUserUseCase registerUserUseCase;
    private final com.bughuntersaga.api.application.port.in.LoginUserUseCase loginUserUseCase;
    private final com.bughuntersaga.api.application.port.in.ForgotPasswordUseCase forgotPasswordUseCase;

    // TODO: Implementar endpoints de OpenAPI
    // @PostMapping("/register") ...
    // @PostMapping("/login") ...
    // @PostMapping("/forgot-password") ...

    }
