package com.uniceplac.CNE.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/cadastro")
    public String cadastro() {
        return "test user";
    }

    @GetMapping("/test")
    public String test() {
        return "test user";
    }

    @GetMapping("/admtest")
    public String adm() {
        return "test admin";
    }
}
