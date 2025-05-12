package com.uniceplac.CNE.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Recoverpass {
    @GetMapping("/recoverpass")
    private String Recoverpass(){
        return "Recuperarsenha"; 

    }
}