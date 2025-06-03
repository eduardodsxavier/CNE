package com.uniceplac.CNE.controller;

import com.uniceplac.CNE.dtos.*;
import com.uniceplac.CNE.service.UserService;
import com.uniceplac.CNE.model.User;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<RecoveryJwtDto> authenticateUser(@RequestBody LoginUserDto loginUserDto) {
        RecoveryJwtDto token = userService.authenticateUser(loginUserDto);

        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @PostMapping("/changePassword")
    public ResponseEntity<Void> changePassword(HttpServletRequest request, @RequestBody ChangePasswordDto changePassword) {
        userService.changePassword(changePassword, request);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Void> createUser(@RequestBody CreateUserDto createUserDto) {
        userService.createUser(createUserDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public List<UserDto> getUsers() {
        List<UserDto> listUsers = new ArrayList<UserDto>();
        List<User> users = userService.getUsers(); 
        for (User user : users) {
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
}
