
package com.bughuntersaga.api.infrastructure.web.exception;

import com.bughuntersaga.api.domain.exception.*;
import com.bughuntersaga.api.infrastructure.web.dto.ErrorDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.time.LocalDateTime;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;

/**
 * Manejador global de excepciones para la API.
 *
 * Responsabilidades:
 * - Capturar excepciones de dominio y convertirlas en respuestas HTTP
 * - Capturar excepciones de validación de Spring
 * - Retornar ErrorDTO según el contrato de la API
 * - Proporcionar mensajes de error consistentes
 */
@Slf4j
@RestControllerAdvice
public class GlobalApiExceptionHandler {




    /**
     * Maneja UserAlreadyExistsException (400 Bad Request).
     */
    @ExceptionHandler(UsernameAlreadyExistsException.class)
    public ResponseEntity<ErrorDTO> handleUserAlreadyExists(UsernameAlreadyExistsException ex) {
        ErrorDTO error = ErrorDTO.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .error("Bad Request")
                .message(ex.getMessage())
                .build();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    /**
     * Maneja InvalidCredentialsException (401 Unauthorized).
     */
    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ErrorDTO> handleInvalidCredentials(InvalidCredentialsException ex) {
        ErrorDTO error = ErrorDTO.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.UNAUTHORIZED.value())
                .error("Unauthorized")
                .message(ex.getMessage())
                .build();

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    /**
     * Maneja ResourceNotFoundException (404 Not Found).
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorDTO> handleResourceNotFound(ResourceNotFoundException ex) {
        ErrorDTO error = ErrorDTO.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.NOT_FOUND.value())
                .error("Not Found")
                .message(ex.getMessage())
                .build();

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    // ========================================================================
    // NUEVOS HANDLERS PARA FASE 3: Registrar Progreso
    // ========================================================================

    /**
     * Maneja LessonNotFoundException (404 Not Found).
     * Se lanza cuando se intenta completar una lección que no existe.
     */
    @ExceptionHandler(LessonNotFoundException.class)
    public ResponseEntity<ErrorDTO> handleLessonNotFound(LessonNotFoundException ex) {
        ErrorDTO error = ErrorDTO.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.NOT_FOUND.value())
                .error("Not Found")
                .message(ex.getMessage())
                .build();

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    /**
     * Maneja LessonAlreadyCompletedException (409 Conflict).
     * Se lanza cuando un usuario intenta completar una lección que ya completó previamente.
     */
    @ExceptionHandler(LessonAlreadyCompletedException.class)
    public ResponseEntity<ErrorDTO> handleLessonAlreadyCompleted(LessonAlreadyCompletedException ex) {
        ErrorDTO error = ErrorDTO.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.CONFLICT.value())
                .error("Conflict")
                .message(ex.getMessage())
                .build();

        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }


    /**
     * Maneja errores de validación de Spring (400 Bad Request).
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDTO> handleValidationErrors(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining(", "));

        ErrorDTO error = ErrorDTO.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .error("Validation Error")
                .message(message)
                .build();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    /**
     * Maneja CUALQUIER otra excepción no capturada (500 Internal Server Error).
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDTO> handleGenericException(Exception ex) {


        log.error("Error 500 no controlado: {}", ex.getMessage(), ex);

        ErrorDTO error = ErrorDTO.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .error("Internal Server Error")
                .message("Ha ocurrido un error inesperado: " + ex.getMessage())
                .build();

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}