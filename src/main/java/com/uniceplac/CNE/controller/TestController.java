package com.uniceplac.CNE.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uniceplac.CNE.service.UserService;
import jakarta.servlet.http.HttpServletRequest;


@RestController
public class TestController {
    @Autowired
    UserService userService;

    @GetMapping("/test")
    public String login() {
        return "test geral";
    }

    @GetMapping("/usertest")
    public String test(HttpServletRequest request) {

        if (userService.userIsAdmin(request)){ 
            return "user is admin";
        }

        return "test user";
    }

    @GetMapping("/admtest")
    public String adm() {
        return "test admin";
    }
}
