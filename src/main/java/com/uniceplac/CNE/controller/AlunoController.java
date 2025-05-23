package com.uniceplac.CNE.controller;

import com.uniceplac.CNE.repository.AlunoRepository;

import com.uniceplac.CNE.model.Aluno;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/alunos")
public class AlunoController {
    
    @Autowired
    private AlunoRepository alunoRepository;

    @PostMapping
    public ResponseEntity<Aluno> salvarAluno(@RequestBody Aluno aluno){
        Aluno salvo = alunoRepository.save(aluno);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping("ra/{ra}")
    public ResponseEntity<Aluno> buscarPorRa(@PathVariable String ra){
        Optional<Aluno> aluno = alunoRepository.findByRa(ra);
        return aluno.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Aluno>> buscarPorNome(@RequestParam String nome){
        List<Aluno> alunos = alunoRepository.searchNameIgnoringAccent(nome);
        return ResponseEntity.ok(alunos);
    }
}
