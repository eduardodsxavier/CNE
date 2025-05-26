package com.uniceplac.CNE.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.uniceplac.CNE.model.Disciplina;
import com.uniceplac.CNE.model.Responsavel;
import com.uniceplac.CNE.repository.DisciplinaRepository;
import com.uniceplac.CNE.repository.ResponsavelRepository;
import com.uniceplac.CNE.dtos.DisciplinaDTO;

@RestController
@RequestMapping("/disciplina")
public class DisciplinaController {

    @Autowired
    private DisciplinaRepository disciplinaRepository;
    @Autowired
    private ResponsavelRepository responsavelRepository;

@PostMapping
public ResponseEntity<Disciplina> salvarDisciplina(@RequestBody DisciplinaDTO dto) {
    Responsavel responsavel = new Responsavel();
    responsavel.setNome(dto.responsavelNome);
    responsavel.setEmail(dto.responsavelEmail);
    responsavel.setDeleted(false);
    
    responsavel = responsavelRepository.save(responsavel);

    Disciplina disciplina = new Disciplina();
    disciplina.setNome(dto.nome);
    disciplina.setCargaHoraria(dto.cargaHoraria);
    disciplina.setDeleted(false);
    disciplina.setResponsavel(responsavel);

    Disciplina salvo = disciplinaRepository.save(disciplina);
    return ResponseEntity.ok(salvo);
}

    @GetMapping("/buscarDisciplina")
    public ResponseEntity<List<Disciplina>> buscarPorDisciplina(@RequestParam String nome) {
        List<Disciplina> disciplinas = disciplinaRepository.searchNameIgnoringAccent(nome);
        return ResponseEntity.ok(disciplinas);
    }

    @GetMapping("/buscarResponsavel")
    public ResponseEntity<List<Responsavel>> buscarPorResponsavel(@RequestParam String nome) {
        List<Responsavel> responsavels = responsavelRepository.searchNameIgnoringAccent(nome);
        return ResponseEntity.ok(responsavels);
    }
}
