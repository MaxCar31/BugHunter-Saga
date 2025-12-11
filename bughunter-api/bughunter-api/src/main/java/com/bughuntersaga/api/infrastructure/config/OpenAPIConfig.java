package com.bughuntersaga.api.infrastructure.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.Components;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI bugHunterOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("BugHunter Saga API")
                        .description("""
                            API (Contrato Primero) para la plataforma gamificada BugHunter Saga.
                            Diseñada para soportar la implementación del frontend en Next.js
                            y el backend en Spring Boot para el proyecto de tesis de Max Carrión.
                            """)
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Max Carrión")
                                .email("max.carrion@epn.edu.ec")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Servidor de desarrollo"),
                        new Server()
                                .url("/api")
                                .description("Prefijo base de la API")))
                .components(new Components()
                        .addSecuritySchemes("bearerAuth", new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Ingresa tu token JWT aquí")))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
    }
}