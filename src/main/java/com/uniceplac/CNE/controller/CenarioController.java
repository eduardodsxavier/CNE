package com.uniceplac.CNE.controller;

import com.uniceplac.CNE.service.CenarioService;

import com.uniceplac.CNE.model.Cenario;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cenario")
public class CenarioController {

    @Autowired
    private CenarioService cenarioService;

    @GetMapping("/list")
    public ResponseEntity<List<Cenario>> listarCenarios(@RequestParam(defaultValue = "null") String anoSemestre, @RequestParam(defaultValue = "null") String status){
        List<Cenario> cenarios;

        try {
            cenarios = cenarioService.getCenarios(anoSemestre, status);
        } catch (Exception e) {
            cenarios = null;
        }

        if (cenarios == null) {
            return new ResponseEntity<>(cenarios, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(cenarios, HttpStatus.OK);
    }
}
