package com.uniceplac.CNE.service;

import com.uniceplac.CNE.dtos.*;
import com.uniceplac.CNE.model.User;
import com.uniceplac.CNE.repository.UserRepository;
import com.uniceplac.CNE.security.JwtTokenService;
import com.uniceplac.CNE.security.SecurityConfig;
import com.uniceplac.CNE.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SecurityConfig securityConfiguration;

    public RecoveryJwtDto authenticateUser(LoginUserDto loginUserDto) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(loginUserDto.RA(), loginUserDto.password());

        Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

       return new RecoveryJwtDto(jwtTokenService.generateToken(userDetails));
    }

    public void createUser(CreateUserDto createUserDto) {

        User newUser = new User(
                createUserDto.RA(),
                createUserDto.nome(),
                createUserDto.email(),
                securityConfiguration.passwordEncoder().encode(createUserDto.password()),
                createUserDto.admin()
        );

        userRepository.save(newUser);
    }
}



