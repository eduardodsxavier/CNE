package com.uniceplac.CNE.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.uniceplac.CNE.dtos.CenarioDto;
import com.uniceplac.CNE.model.Cenario;
import com.uniceplac.CNE.service.CenarioService;

@RestController
@RequestMapping("/cenario")
public class CenarioController {

    @Autowired
    private CenarioService cenarioService;

    @PostMapping
    public ResponseEntity<Cenario> criarCenario(@RequestBody CenarioDto dto) {
        try {
            Cenario cenario = cenarioService.criarCenario(dto);
            return ResponseEntity.ok(cenario);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<Cenario>> listarCenario(
        @RequestParam(defaultValue = "null") String anoSemestre,
        @RequestParam(defaultValue = "null") String status) {
        
        List<Cenario> cenario;

        try {
            cenario = cenarioService.listCenarios(anoSemestre, status);
        } catch (Exception e) {
            cenario = null;
        }

        if (cenario == null) {
            return new ResponseEntity<>(cenario, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(cenario, HttpStatus.OK);
    }
   @GetMapping("/{id}")
    public ResponseEntity<Cenario> buscarPorId(@PathVariable Long id) {
        Optional<Cenario> cenario = cenarioService.buscarPorId(id);
        return cenario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cenario> atualizarCenario(@PathVariable Long id, @RequestBody CenarioDto dto) {
        try {
            Optional<Cenario> atualizado = cenarioService.atualizarCenario(id, dto);
            return atualizado.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCenario(@PathVariable Long id) {
        boolean removido = cenarioService.deletarCenario(id);
        if (removido) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
