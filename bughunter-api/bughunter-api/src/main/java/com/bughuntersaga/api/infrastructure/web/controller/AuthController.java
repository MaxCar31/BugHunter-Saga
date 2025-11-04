
package com.bughuntersaga.api.infrastructure.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.bughuntersaga.api.application.service.RegisterUserService;
import com.bughuntersaga.api.application.service.LoginUserService;
import com.bughuntersaga.api.infrastructure.web.dto.UserLoginDTO;
import com.bughuntersaga.api.infrastructure.web.dto.AuthResponseDTO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final RegisterUserService registerUserService;
    private final LoginUserService loginUserService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody UserLoginDTO request) {
        try {
            AuthResponseDTO response = registerUserService.register(request);
            return ResponseEntity.status(201).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody UserLoginDTO request) {
        try {
            AuthResponseDTO response = loginUserService.login(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).build();
        }
    }
}
