package com.uniceplac.CNE.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
        responsavel.setDeleted(dto.deleted);
        
        responsavel = responsavelRepository.save(responsavel);

        Disciplina disciplina = new Disciplina();
        disciplina.setNome(dto.nome);
        disciplina.setCargaHoraria(dto.cargaHoraria);
        disciplina.setDeleted(dto.deleted);
        disciplina.setResponsavel(responsavel);

        Disciplina salvo = disciplinaRepository.save(disciplina);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public ResponseEntity<List<Disciplina>> listarTodas() {
        List<Disciplina> disciplinas = disciplinaRepository.findAll();
        return ResponseEntity.ok(disciplinas);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Disciplina> atualizarDisciplina(@PathVariable Long id, @RequestBody DisciplinaDTO dto) {
        Disciplina disciplina = disciplinaRepository.findById(id).orElseThrow(() -> new RuntimeException("Disciplina não encontrada"));
        
        Responsavel responsavel = disciplina.getResponsavel();
        if (responsavel == null) {
            responsavel = new Responsavel();
        }
        responsavel.setNome(dto.responsavelNome);
        responsavel.setEmail(dto.responsavelEmail);
        responsavel.setDeleted(dto.deleted);
        responsavel = responsavelRepository.save(responsavel);
        
        disciplina.setNome(dto.nome);
        disciplina.setCargaHoraria(dto.cargaHoraria);
        disciplina.setDeleted(dto.deleted);
        disciplina.setResponsavel(responsavel);
        
        Disciplina atualizada = disciplinaRepository.save(disciplina);
        return ResponseEntity.ok(atualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarDisciplina(@PathVariable Long id) {
        Disciplina disciplina = disciplinaRepository.findById(id).orElseThrow(() -> new RuntimeException("Disciplina não encontrada"));
        disciplina.setDeleted(!disciplina.getDeleted());
        disciplinaRepository.save(disciplina);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/destroy/{id}")
    public ResponseEntity<String> permanentDelete(@PathVariable Long id) {
        try {
            java.util.Optional<Disciplina> optional = disciplinaRepository.findById(id);
            if (optional.isEmpty()) {
                return ResponseEntity.status(404).body("Disciplina não encontrada.");
            }
            disciplinaRepository.delete(optional.get());
            return ResponseEntity.ok().build();
        } catch (org.springframework.dao.DataIntegrityViolationException e) {
            return ResponseEntity.status(409).body("Não é possível excluir a disciplina pois ela está vinculada a cenários ou outras informações do sistema.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao excluir disciplina: " + e.getMessage());
        }
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
