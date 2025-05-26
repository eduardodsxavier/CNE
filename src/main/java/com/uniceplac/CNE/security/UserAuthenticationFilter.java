package com.uniceplac.CNE.security;

import com.uniceplac.CNE.repository.UserRepository;
import com.uniceplac.CNE.model.User;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.io.IOException;

@Component
public class UserAuthenticationFilter extends OncePerRequestFilter {

    @Autowired 
    private JwtTokenService jwtTokenService;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (checkIfEndpointIsNotPublic(request)) {
            String token = jwtTokenService.recoveryToken(request);
            if (token != null) {
                String subject = jwtTokenService.getSubjectFromToken(token); 
                User user = userRepository.findByRA(Long.parseLong(subject)).get(); 
                UserDetailsImpl userDetails = new UserDetailsImpl(user); 

                Authentication authentication =
                    new UsernamePasswordAuthenticationToken(userDetails.getUsername(), null, userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                throw new RuntimeException("O token está ausente.");
            }
        }
        filterChain.doFilter(request, response); 
    }

    private boolean checkIfEndpointIsNotPublic(HttpServletRequest request) {
        String url = request.getRequestURI();
        List <String> endpoints_to_ignore = Arrays.asList(SecurityConfig.ENDPOINTS_TO_IGNORE); 
        for (String endpoint : endpoints_to_ignore) {
            endpoint.replace("*", "");
        }
        return false;
        //return !Arrays.asList(SecurityConfig.ENDPOINTS_WITH_AUTHENTICATION_NOT_REQUIRED).contains(url) || !endpoints_to_ignore.contains(url);
    }
}
