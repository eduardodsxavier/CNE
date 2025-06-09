package com.uniceplac.CNE.controller.rotas;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UsuariosController{
    @GetMapping("/usuarios")
    private String Usuarios(){
        return "interfaceUsuarios"; 

    }
}
