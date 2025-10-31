
    package com.bughuntersaga.api.infrastructure.security.config;

    import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


    @Configuration
@EnableWebSecurity
@RequiredArgsConstructor
    public class SecurityConfiguration {

        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
                    .csrf(csrf -> csrf.disable()) // Deshabilita CSRF para API sin estado
                    .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Sesiones sin estado
                    .authorizeHttpRequests(auth -> auth
                            // === INICIO: Permitir Rutas de Swagger UI ===
                            .requestMatchers(
                                    "/",                  // Permite acceso a la raíz para la redirección
                                    "/swagger-ui.html",   // La página principal de Swagger UI
                                    "/swagger-ui/**",     // Recursos estáticos (CSS, JS) para Swagger UI
                                    "/v3/api-docs/**"     // Los endpoints de la especificación OpenAPI
                            ).permitAll()
                            // === FIN: Permitir Rutas de Swagger UI ===

                            // Tus endpoints públicos existentes
                            .requestMatchers("/api/auth/**").permitAll()
                            .requestMatchers("/api/content/modules/**").permitAll()

                            // Todas las demás solicitudes deben estar autenticadas
                            .anyRequest().authenticated()
                    );

            // TODO: Añadir la configuración del filtro JWT aquí después

            return http.build();
        }
    }