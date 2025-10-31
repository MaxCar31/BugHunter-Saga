package com.bughuntersaga.api.domain.model;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.UUID;

/**
 * Representa el concepto de negocio de un Usuario.
 * (Versión Anémica - Contenedor de datos)
 */
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    /**
     * Identificador único de negocio.
     * Asignado por la capa de aplicación.
     */
    private UUID id;

    /**
     * Nombre de usuario para login.
     */
    private String name;

    /**
     * Nombre de usuario para login.
     */
    private String username;

    /**
     * Email del usuario, usado para login y notificaciones.
     */
    private String email;

    /**
     * Contraseña del usuario.
     */
    private String password;

}