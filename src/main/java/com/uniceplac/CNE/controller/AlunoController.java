package com.uniceplac.CNE.controller;

import com.uniceplac.CNE.repository.AlunoRepository;
import com.uniceplac.CNE.dtos.AlunoDto;
import com.uniceplac.CNE.model.Aluno;
import com.uniceplac.CNE.service.AlunoService;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/aluno")
public class AlunoController {
    
    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private AlunoService alunoService;

    @PostMapping
    public ResponseEntity<Aluno> salvarAluno(@RequestBody AlunoDto alunoDto){
        Aluno salvo = alunoService.cadastrarAluno(alunoDto);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public ResponseEntity<List<Aluno>> listarTodos(){
        List<Aluno> alunos = alunoService.listarTodos();
        return ResponseEntity.ok(alunos);
    }

    @PutMapping("/{ra}")
    public ResponseEntity<Aluno> atualizarAluno(@PathVariable String ra, @RequestBody AlunoDto alunoDto){
        Aluno atualizado = alunoService.atualizarAluno(ra, alunoDto);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{ra}")
    public ResponseEntity<Void> deletarAluno(@PathVariable String ra){
        alunoService.toggleDeletedById(ra);
        return ResponseEntity.ok().build();
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
