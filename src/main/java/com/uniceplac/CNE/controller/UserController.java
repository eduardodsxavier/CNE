package com.uniceplac.CNE.controller;

import com.uniceplac.CNE.dtos.userdto.*;
import com.uniceplac.CNE.dtos.*;
import com.uniceplac.CNE.service.UserService;
import com.uniceplac.CNE.exception.UserException;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<RecoveryJwtDto> authenticateUser(@RequestBody LoginUserDto loginUserDto) {
        RecoveryJwtDto token;

        try {
            token = userService.authenticateUser(loginUserDto);
        } catch (Exception e) {
            throw new UserException(e);
        }


        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @PostMapping("/changePassword")
    public ResponseEntity<Void> changePassword(HttpServletRequest request, @RequestBody ChangePasswordDto changePassword) {
        try {
            userService.changePassword(changePassword, request);
        } catch (Exception e) {
            throw new UserException(e);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/listRequestsToChangePassword")
    public ResponseEntity<List<UserDto>> listResquestsToChangePassword() {
        List<UserDto> users;

        try {
            users = userService.getListChangePasswordRequests();
        } catch (Exception e) {
            throw new UserException(e);
        }

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/requestToChangePassword/{ra}")
    public ResponseEntity<Void> resquestToChangePassword(@PathVariable String ra) {
        try {
            userService.requestChangePassword(ra);
        } catch (Exception e) {
            throw new UserException(e);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/resetUserPassword/{ra}")
    public ResponseEntity<Void> resetUserPassword(@PathVariable String ra) {
        try {
            userService.resetUserPassword(ra);
        } catch (Exception e) {
            throw new UserException(e);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createUser(@RequestBody CreateUserDto createUserDto) {
        try {
            userService.createUser(createUserDto);
        } catch (Exception e) {
            throw new UserException(e);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/update")
    public ResponseEntity<Void> UpdateUser(@RequestBody CreateUserDto updateUserDto) {
        try {
            userService.updateUser(updateUserDto);
        } catch (Exception e) {
            throw new UserException(e);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path = "/changeStatus/{ra}")
    public ResponseEntity<Void> changeStatus(@PathVariable String ra) {
        try {
            userService.changeStatus(ra);
        } catch (Exception e) {
            throw new UserException(e);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<UserDto>> getUsers(@RequestParam(defaultValue = "false") boolean disabled) {
        List<UserDto> users;

        try {
            users = userService.getUsers(disabled);
        } catch (Exception e) {
            throw new UserException(e);
        }

        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
