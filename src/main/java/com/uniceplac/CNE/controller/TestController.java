package com.uniceplac.CNE.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/test")
    public String login() {
        return "test geral";
    }

    @GetMapping("/usertest")
    public String test() {
        return "test user";
    }

    @GetMapping("/admtest")
    public String adm() {
        return "test admin";
    }
}
