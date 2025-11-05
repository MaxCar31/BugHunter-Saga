package com.bughuntersaga.api.application.port.in;

import com.bughuntersaga.api.application.dto.ForgotPasswordCommand;

/**
 * Caso de uso para iniciar el flujo de reseteo de contraseña.
 */
public interface ForgotPasswordUseCase {
    /**
     * Maneja la lógica de negocio para el reseteo de contraseña.
     *
     * @param command El comando que contiene el email.
     * @return void - Este caso de uso no devuelve datos.
     */
    void handle(ForgotPasswordCommand command);
}