package com.uniceplac.CNE.controller.rotas;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RegisterController{
    @GetMapping("/register")
    private String Register(){
        return "telacadastro"; 

    }
}
