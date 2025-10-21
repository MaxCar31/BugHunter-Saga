
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
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                    // Endpoints públicos de tu OpenAPI
                    .requestMatchers("/api/auth/**").permitAll() // /api/auth/register, /api/auth/login, etc.
                    .requestMatchers("/api/content/modules").permitAll() // /api/content/modules
                    // El resto requiere autenticación
                    .anyRequest().authenticated()
                );

            // TODO: Aquí se agregaría el filtro JWT

            return http.build();
        }
    }
