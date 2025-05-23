package com.uniceplac.CNE.controller;

import com.uniceplac.CNE.dtos.*;
import com.uniceplac.CNE.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
