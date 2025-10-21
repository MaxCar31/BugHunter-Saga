package tic.BugHunter.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tic.BugHunter.dto.UserLoginDTO;
import tic.BugHunter.dto.UserRegistrationDTO;
import tic.BugHunter.model.User;
import tic.BugHunter.model.UserProfile;
import tic.BugHunter.repository.UserProfileRepository;
import tic.BugHunter.repository.UserRepository;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final PasswordEncoder passwordEncoder;

    public void registerUser(UserRegistrationDTO registrationDTO) {
        if (userRepository.existsByUsername(registrationDTO.username())) {
            throw new IllegalArgumentException("Username already exists");
        }

        if (userRepository.existsByEmail(registrationDTO.email())) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = User.builder()
                .username(registrationDTO.username())
                .name(registrationDTO.name())
                .email(registrationDTO.email())
                .passwordHash(passwordEncoder.encode(registrationDTO.password()))
                .build();

        User savedUser = userRepository.save(user);

        UserProfile userProfile = UserProfile.builder()
                .user(savedUser)
                .userId(savedUser.getId())
                .lingots(0)
                .dailyXpGoal(10)
                .soundEffectsEnabled(true)
                .build();

        userProfileRepository.save(userProfile);
    }

    public AuthResponseDTO loginUser(UserLoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.emailOrUsername())
                .or(() -> userRepository.findByUsername(loginDTO.emailOrUsername()))
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (!passwordEncoder.matches(loginDTO.password(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        String token = UUID.randomUUID().toString();

        return new AuthResponseDTO(
                token,
                new UserInfoDTO(
                        user.getId(),
                        user.getUsername(),
                        user.getName(),
                        user.getEmail()
                )
        );
    }
}