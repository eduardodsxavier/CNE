package com.uniceplac.CNE.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserAuthenticationFilter userAuthenticationFilter;

    // remenber to change the endpoint back 
    public static final String [] ENDPOINTS_WITH_AUTHENTICATION_NOT_REQUIRED = {
        "/user/login",
        "/user/requestToChangePassword/**",
    };

    public static final String [] ENDPOINTS_WITH_AUTHENTICATION_REQUIRED = {
        "/user/changePassword",
        "/alunos/ra/**",
        "/alunos/buscar",
        "/cenario/**",
        "/data/",
        "/data/buscar",
        "/disciplina/buscarDisciplina",
        "/disciplina/buscarResponsavel",
        "/tce/email/**",
        "/tce/telefone/**",
        "/tce/nome/**",
        "/unidades/nome/**",
        "/unidades/sigla/**",
        "/vlr/**",
    };

    public static final String[] ENDPOINTS_ADMIN = {
        "/user/**",
        "/cenario/**",
        "/data/**",
        "/horario/**",
        "/disciplina/**",
        "/tce/**",
        "/unidades/**",
    };

    public static final String[] ENDPOINTS_TO_IGNORE = {
        "/login",
        "/cenarios",
        "/calendario",
        "/recoverpass",
        "/register",
        "/usuarios",
        "/styles/**", 
        "/components/**", 
        "/assets/**",
        "/scripts/**",
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .authorizeHttpRequests((request) -> request
                    .requestMatchers(ENDPOINTS_WITH_AUTHENTICATION_NOT_REQUIRED).permitAll()
                    .requestMatchers(ENDPOINTS_WITH_AUTHENTICATION_REQUIRED).authenticated()
                    .requestMatchers(ENDPOINTS_ADMIN).hasRole("ADMIN")
                    .requestMatchers(ENDPOINTS_TO_IGNORE).permitAll()
                    .anyRequest().permitAll()
                    )
            .csrf(csrf -> csrf.disable())
            .formLogin(form ->  form
                 .loginPage("/login")
             )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .httpBasic(httpBasic -> httpBasic.disable())
            .addFilterBefore(userAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
