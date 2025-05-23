package com.uniceplac.CNE.service;

import com.uniceplac.CNE.dtos.*;
import com.uniceplac.CNE.model.User;
import com.uniceplac.CNE.repository.UserRepository;
import com.uniceplac.CNE.security.JwtTokenService;
import com.uniceplac.CNE.security.SecurityConfig;
import com.uniceplac.CNE.security.UserDetailsImpl;
import jakarta.servlet.http.HttpServletRequest;
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
                createUserDto.admin(),
                true
        );

        userRepository.save(newUser);
    }

    public void changePassword(ChangePasswordDto changePassword, HttpServletRequest request) {
        if (changePassword.password() != changePassword.confirmPassword()) {
            throw new java.lang.RuntimeException("passwords are not the same");
        }


        if (changePassword.RA() != jwtTokenService.recoveryRA(request)) {
            throw new java.lang.RuntimeException("token RA and changePassword RA are not the same");
        }

        User user = userRepository.findByRA(changePassword.RA()).get();
        user.setPassword(changePassword.password());
    }

    public boolean isAdmin(HttpServletRequest request) {
        return userRepository.findByRA(jwtTokenService.recoveryRA(request)).get().getAdmin();
    }

    public User recoverByToken(String token) {
        return userRepository.findByRA(Long.parseLong(jwtTokenService.getSubjectFromToken(token))).get();
    }
}
