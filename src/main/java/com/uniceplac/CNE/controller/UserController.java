package com.uniceplac.CNE.controller;

import com.uniceplac.CNE.dtos.userdto.*;
import com.uniceplac.CNE.dtos.*;
import com.uniceplac.CNE.service.UserService;

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
        RecoveryJwtDto token = userService.authenticateUser(loginUserDto);

        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @PostMapping("/changePassword")
    public ResponseEntity<Void> changePassword(HttpServletRequest request, @RequestBody ChangePasswordDto changePassword) {
        userService.changePassword(changePassword, request);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/listRequestsToChangePassword")
    public ResponseEntity<List<UserDto>> listResquestsToChangePassword() {
        List<UserDto> users = userService.getListChangePasswordRequests();

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/requestToChangePassword/{ra}")
    public ResponseEntity<Void> ResquestToChangePassword(@PathVariable long ra) {
        userService.requestChangePassword(ra);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createUser(@RequestBody CreateUserDto createUserDto) {
        userService.createUser(createUserDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/update")
    public ResponseEntity<Void> UpdateUser(@RequestBody CreateUserDto updateUserDto) {
        userService.updateUser(updateUserDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path = "/changeStatus/{ra}")
    public ResponseEntity<Void> changeStatus(@PathVariable long ra) {
        userService.changeStatus(ra);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<UserDto>> getUsers(@RequestParam(defaultValue = "false") boolean desabled) {
        List<UserDto> users = userService.getUsers(desabled);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
