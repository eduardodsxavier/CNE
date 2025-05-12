package com.uniceplac.CNE.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {
    @GetMapping("/login")
    private String Login(){
        return "Tela-login"; 

    }
}
