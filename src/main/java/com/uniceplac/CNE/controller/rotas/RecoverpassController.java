package com.uniceplac.CNE.controller.rotas;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RecoverpassController {
    @GetMapping("/recoverpass")
    private String Recoverpass(){
        return "Recuperarsenha"; 

    }
}
