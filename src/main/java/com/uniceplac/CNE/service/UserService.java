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

        if (!userRepository.findByRA(createUserDto.RA()).isEmpty()) {
            throw new java.lang.RuntimeException("this RA is alread in use");
        }

        if (!userRepository.findByName(createUserDto.nome()).isEmpty()) {
            throw new java.lang.RuntimeException("a user with this name alread exist");
        }

        if (!userRepository.findByEmail(createUserDto.email()).isEmpty()) {
            throw new java.lang.RuntimeException("a user with this email alread exist");
        }

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
        if (!changePassword.password().equals(changePassword.confirmPassword())) {
            throw new java.lang.RuntimeException("passwords are not the same");
        }

        Long ra = jwtTokenService.recoveryRA(request);
        User user = userRepository.findByRA(ra).get();
        user.setPassword(securityConfiguration.passwordEncoder().encode(changePassword.password()));

        userRepository.save(user);
    }

    public boolean isAdmin(HttpServletRequest request) {
        return userRepository.findByRA(jwtTokenService.recoveryRA(request)).get().getAdmin();
    }

    public User recoverByToken(String token) {
        return userRepository.findByRA(Long.parseLong(jwtTokenService.getSubjectFromToken(token))).get();
    }
}
