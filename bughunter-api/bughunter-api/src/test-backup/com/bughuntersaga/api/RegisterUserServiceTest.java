// Ubicación: src/test/java/com/bughuntersaga/api/application/service/RegisterUserServiceTest.java

package com.bughuntersaga.api;

import com.bughuntersaga.api.application.dto.RegisterUserCommand;
import com.bughuntersaga.api.application.port.out.PasswordEncoderPort;
import com.bughuntersaga.api.application.port.out.TokenGeneratorPort;
import com.bughuntersaga.api.application.port.out.UserProfileRepositoryPort;
import com.bughuntersaga.api.application.port.out.UserRepositoryPort;
import com.bughuntersaga.api.application.service.RegisterUserService;
import com.bughuntersaga.api.domain.exception.UsernameAlreadyExistsException;
import com.bughuntersaga.api.domain.exception.EmailAlreadyExistsException;
import com.bughuntersaga.api.domain.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RegisterUserServiceTest {

    // Mockeamos todos los puertos (dependencias externas)
    @Mock
    private UserRepositoryPort userRepositoryPort;
    @Mock
    private UserProfileRepositoryPort userProfileRepositoryPort;
    @Mock
    private PasswordEncoderPort passwordEncoderPort;
    @Mock
    private TokenGeneratorPort tokenGeneratorPort;

    // Inyectamos los mocks en el servicio que queremos probar
    @InjectMocks
    private RegisterUserService registerUserService;

    private RegisterUserCommand command;

    @BeforeEach
    void setUp() {
        command = RegisterUserCommand.builder()
                .username("testuser")
                .name("Test User")
                .email("test@example.com")
                .rawPassword("password123")
                .build();
    }

    @Test
    void register_shouldThrowException_whenUsernameExists() {
        // Arrange
        // Simulamos que el puerto del repositorio SÍ encuentra un usuario
        when(userRepositoryPort.findByUsername("testuser")).thenReturn(Optional.of(new User()));

        // Act & Assert
        // Verificamos que se lanza la excepción de dominio correcta
        assertThrows(UsernameAlreadyExistsException.class, () -> {
            registerUserService.register(command);
        });

        // Verificamos que no se llamó a ningún otro puerto (fallo rápido)
        verify(passwordEncoderPort, never()).encode(any());
        verify(userRepositoryPort, never()).save(any());
    }

    @Test
    void register_shouldThrowException_whenEmailExists() {
        // Arrange
        // Simulamos que el username está libre, pero el email NO
        when(userRepositoryPort.findByUsername("testuser")).thenReturn(Optional.empty());
        when(userRepositoryPort.findByEmail("test@example.com")).thenReturn(Optional.of(new User()));

        // Act & Assert
        assertThrows(EmailAlreadyExistsException.class, () -> {
            registerUserService.register(command);
        });

        verify(passwordEncoderPort, never()).encode(any());
        verify(userRepositoryPort, never()).save(any());
    }

    @Test
    void register_shouldSaveUserAndProfile_whenDataIsNew() {
        // Arrange
        when(userRepositoryPort.findByUsername("testuser")).thenReturn(Optional.empty());
        when(userRepositoryPort.findByEmail("test@example.com")).thenReturn(Optional.empty());

        when(passwordEncoderPort.encode("password123")).thenReturn("hashedPassword");

        User savedUser = User.builder()
                .id(UUID.randomUUID())
                .username("testuser")
                .build();

        // Simulamos el guardado del usuario
        when(userRepositoryPort.save(any(User.class))).thenReturn(savedUser);

        when(tokenGeneratorPort.generateToken("testuser")).thenReturn("test.jwt.token");

        // Act
        var authToken = registerUserService.register(command);

        // Assert
        assertNotNull(authToken);
        assertEquals("test.jwt.token", authToken.getToken());
        assertEquals("testuser", authToken.getUser().getUsername());

        // Verificamos que los puertos fueron llamados en el orden correcto
        verify(passwordEncoderPort).encode("password123");
        verify(userRepositoryPort).save(any(User.class));
        verify(userProfileRepositoryPort).save(any()); // Verificamos que el perfil también se guarda
        verify(tokenGeneratorPort).generateToken("testuser");
    }
}