package com.uniceplac.CNE.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

import com.uniceplac.CNE.repository.UnidadeRepository;
import com.uniceplac.CNE.model.Unidade;

@RestController
@RequestMapping("/unidades")
public class UnidadeController {
    
    @Autowired
    private UnidadeRepository unidadeRepository;

    @PostMapping
    public ResponseEntity<Unidade> salvarUnidade(@RequestBody Unidade unidade) {
        Unidade salvo = unidadeRepository.save(unidade);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<Unidade> buscarPorNome(@PathVariable String nome) {
        Optional<Unidade> unidadeOptional = unidadeRepository.findByNomeContainingIgnoreCase(nome);
        return unidadeOptional
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/sigla/{sigla}")
    public ResponseEntity<Unidade> buscarPorSigla(@PathVariable String sigla) {
        Optional<Unidade> unidadeOptional = unidadeRepository.findBySigla(sigla);
        return unidadeOptional
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
