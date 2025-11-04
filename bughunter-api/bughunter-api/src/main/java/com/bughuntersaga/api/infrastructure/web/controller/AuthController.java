package com.bughuntersaga.api.infrastructure.web.controller;

import com.bughuntersaga.api.application.dto.LoginUserCommand;
import com.bughuntersaga.api.application.dto.RegisterUserCommand;
import com.bughuntersaga.api.application.port.in.LoginUserUseCase;
import com.bughuntersaga.api.application.port.in.RegisterUserUseCase;
import com.bughuntersaga.api.domain.model.AuthToken;
import com.bughuntersaga.api.infrastructure.web.dto.UserRegistrationDTO;
import com.bughuntersaga.api.infrastructure.web.mapper.AuthApiMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.bughuntersaga.api.infrastructure.web.dto.UserLoginDTO;
import com.bughuntersaga.api.infrastructure.web.dto.AuthResponseDTO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final RegisterUserUseCase registerUserUseCase;
    private final LoginUserUseCase loginUserUseCase;
    private final AuthApiMapper authApiMapper;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody UserRegistrationDTO request) {


        RegisterUserCommand command = authApiMapper.toRegisterCommand(request);
        AuthToken authToken = registerUserUseCase.register(command);
        AuthResponseDTO response = authApiMapper.toAuthResponseDTO(authToken);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody UserLoginDTO request) {


        LoginUserCommand command = authApiMapper.toLoginCommand(request);
        AuthToken authToken = loginUserUseCase.login(command);
        AuthResponseDTO response = authApiMapper.toAuthResponseDTO(authToken);
        return ResponseEntity.ok(response);
    }
}