package com.bughuntersaga.api.infrastructure.web.controller;

import com.bughuntersaga.api.application.dto.RegisterUserCommand;
import com.bughuntersaga.api.application.port.in.RegisterUserUseCase;
import com.bughuntersaga.api.domain.exception.EmailAlreadyExistsException;
import com.bughuntersaga.api.domain.exception.UsernameAlreadyExistsException;
import com.bughuntersaga.api.domain.model.AuthToken;
import com.bughuntersaga.api.infrastructure.web.dto.UserRegistrationDTO;
import com.bughuntersaga.api.infrastructure.web.mapper.AuthApiMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.bughuntersaga.api.application.service.LoginUserService;
import com.bughuntersaga.api.infrastructure.web.dto.UserLoginDTO;
import com.bughuntersaga.api.infrastructure.web.dto.AuthResponseDTO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final RegisterUserUseCase registerUserUseCase;
    private final LoginUserService loginUserService;
    private final AuthApiMapper authApiMapper;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody UserRegistrationDTO request) {
        try {
            RegisterUserCommand command = authApiMapper.toRegisterCommand(request);
            AuthToken authToken = registerUserUseCase.register(command);
            AuthResponseDTO response = authApiMapper.toAuthResponseDTO(authToken);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (UsernameAlreadyExistsException | EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody UserLoginDTO request) {
        try {
            AuthResponseDTO response = loginUserService.login(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
