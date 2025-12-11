package com.bughuntersaga.api.infrastructure.web.controller;

import com.bughuntersaga.api.application.dto.UpdateUserAccountCommand;
import com.bughuntersaga.api.application.dto.UpdateUserSettingsCommand;
import com.bughuntersaga.api.application.port.in.*;
import com.bughuntersaga.api.domain.model.FullUserProfile;
import com.bughuntersaga.api.domain.model.User;
import com.bughuntersaga.api.infrastructure.web.dto.UserAccountUpdateDTO;
import com.bughuntersaga.api.infrastructure.web.dto.UserInfoDTO;
import com.bughuntersaga.api.infrastructure.web.dto.UserProfileDTO;
import com.bughuntersaga.api.infrastructure.web.dto.UserSettingsUpdateDTO;
import com.bughuntersaga.api.infrastructure.web.dto.UserStatsDTO;
import com.bughuntersaga.api.infrastructure.web.mapper.UserApiMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    // Casos de uso
    private final GetUserProfileUseCase getUserProfileUseCase;
    private final UpdateUserAccountUseCase updateUserAccountUseCase;
    private final UpdateUserSettingsUseCase updateUserSettingsUseCase;
    private final GetUserStatsUseCase getUserStatsUseCase;

    // Mappers
    private final UserApiMapper userApiMapper;

    /**
     * GET /api/users/me/profile (Fase 5)
     */
    @GetMapping("/me/profile")
    public ResponseEntity<UserProfileDTO> getUserProfile() {
        FullUserProfile profileDomain = getUserProfileUseCase.getProfile();
        UserProfileDTO responseDTO = userApiMapper.toProfileDTO(profileDomain);
        return ResponseEntity.ok(responseDTO);
    }

    /**
     * PUT /api/users/me/account (Fase 5)
     */
    @PutMapping("/me/account")
    public ResponseEntity<UserInfoDTO> updateUserAccount(
            @Valid @RequestBody UserAccountUpdateDTO accountUpdateDTO) {

        UpdateUserAccountCommand command = userApiMapper.toCommand(accountUpdateDTO);
        User updatedUser = updateUserAccountUseCase.updateAccount(command);
        UserInfoDTO responseDTO = userApiMapper.toUserInfoDTO(updatedUser);
        return ResponseEntity.ok(responseDTO);
    }

    /**
     * PUT /api/users/me/settings (Fase 5)
     */
    @PutMapping("/me/settings")
    public ResponseEntity<UserProfileDTO> updateUserSettings(
            @Valid @RequestBody UserSettingsUpdateDTO settingsUpdateDTO) {

        UpdateUserSettingsCommand command = userApiMapper.toCommand(settingsUpdateDTO);
        FullUserProfile updatedProfile = updateUserSettingsUseCase.updateSettings(command);
        UserProfileDTO responseDTO = userApiMapper.toProfileDTO(updatedProfile);
        return ResponseEntity.ok(responseDTO);
    }

    /**
     * GET /api/users/me/stats (Fase 4)
     */
    @GetMapping("/me/stats")
    public ResponseEntity<UserStatsDTO> getUserStats() {
        UserStatsResult result = getUserStatsUseCase.getStats();
        UserStatsDTO responseDTO = userApiMapper.toStatsDTO(result);
        return ResponseEntity.ok(responseDTO);
    }
}