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
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

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

    public List<UserDto> getUsers(boolean desabled) {
        List<UserDto> listUsers = new ArrayList<UserDto>();
        for (User user : userRepository.findByChangePassword(true).get()) {
            listUsers.add(
                new UserDto(
                    user.getRA(),
                    user.getName(),
                    user.getEmail(),
                    user.getAdmin(),
                    user.getChangePassword()
                )
            );
        }
        return listUsers;
    }

    public RecoveryJwtDto authenticateUser(LoginUserDto loginUserDto) {
        boolean changePassword = false;
        if (loginUserDto.RA().toString().equals(loginUserDto.password())) {
            changePassword = true;
        }

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(loginUserDto.RA(), loginUserDto.password());

        Authentication authentication;

        try {
             authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        } catch (BadCredentialsException e) {
            throw new java.lang.RuntimeException("invalid credencials");
        }

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return new RecoveryJwtDto(jwtTokenService.generateToken(userDetails), changePassword);
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
                securityConfiguration.passwordEncoder().encode(createUserDto.RA().toString()),
                createUserDto.admin(),
                false,
                true
        );

        userRepository.save(newUser);
    }

    public void updateUser(CreateUserDto updateUserDto) {
        if (userRepository.findByRA(updateUserDto.RA()).isEmpty()) {
            throw new java.lang.RuntimeException("this RA is not in use");
        }

        if (!userRepository.findByName(updateUserDto.nome()).isEmpty()) {
            throw new java.lang.RuntimeException("a user with this name alread exist");
        }

        if (!userRepository.findByEmail(updateUserDto.email()).isEmpty()) {
            throw new java.lang.RuntimeException("a user with this email alread exist");
        }

        User user = userRepository.findByRA(updateUserDto.RA()).get();

        user.setName(updateUserDto.nome());
        user.setEmail(updateUserDto.email());
        user.setAdmin(updateUserDto.admin());

        userRepository.save(user);
    }

    public void changePassword(ChangePasswordDto changePassword, HttpServletRequest request) {
        if (!changePassword.password().equals(changePassword.confirmPassword())) {
            throw new java.lang.RuntimeException("passwords are not the same");
        }

        Long ra = jwtTokenService.recoveryRA(request);
        User user = userRepository.findByRA(ra).get();
        user.setPassword(securityConfiguration.passwordEncoder().encode(changePassword.password()));
        user.setChangePassword(false);

        userRepository.save(user);
    }

    public  List<UserDto> getChangePasswordRequests() {
        List<UserDto> listUsers = new ArrayList<UserDto>();
        for (User user : userRepository.findByChangePassword(true).get()) {
                listUsers.add(
                    new UserDto(
                        user.getRA(),
                        user.getName(),
                        user.getEmail(),
                        user.getAdmin(),
                        user.getChangePassword()
                    )
                );
        }
        return listUsers;
    }

    public void changeStatus(Long ra) {
        if (userRepository.findByRA(ra).isEmpty()) {
            throw new java.lang.RuntimeException("this RA is not in use");
        }

        User user = userRepository.findByRA(ra).get();
        user.setEnabled(!user.getEnabled());

        userRepository.save(user);
    }

    public boolean isAdmin(HttpServletRequest request) {
        return userRepository.findByRA(jwtTokenService.recoveryRA(request)).get().getAdmin();
    }
}
