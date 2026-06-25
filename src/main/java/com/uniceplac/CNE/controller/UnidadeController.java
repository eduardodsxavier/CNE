package com.uniceplac.CNE.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.uniceplac.CNE.model.Unidade;
import com.uniceplac.CNE.service.UnidadeService;
import com.uniceplac.CNE.repository.UnidadeRepository;

@RestController
@RequestMapping("/unidade")
public class UnidadeController {
    
    @Autowired
    private UnidadeRepository unidadeRepository;

    @Autowired
    private UnidadeService unidadeService;

    @PostMapping
    public ResponseEntity<Unidade> salvarUnidade(@RequestBody Unidade unidade) {
        Unidade salvo = unidadeService.CadastrarUnidade(unidade);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public ResponseEntity<List<Unidade>> listarTodas() {
        List<Unidade> unidades = unidadeService.listarTodas();
        return ResponseEntity.ok(unidades);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Unidade> atualizarUnidade(@PathVariable Long id, @RequestBody Unidade unidade) {
        Unidade atualizado = unidadeService.atualizar(id, unidade);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUnidade(@PathVariable Long id) {
        unidadeService.toggleDeleted(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/destroy/{id}")
    public ResponseEntity<String> permanentDelete(@PathVariable Long id) {
        try {
            if (!unidadeRepository.existsById(id)) {
                return ResponseEntity.status(404).body("Unidade não encontrada.");
            }
            unidadeService.deletar(id);
            return ResponseEntity.ok().build();
        } catch (org.springframework.dao.DataIntegrityViolationException e) {
            return ResponseEntity.status(409).body("Não é possível excluir a unidade pois ela está vinculada a cenários ou outras informações do sistema.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao excluir unidade: " + e.getMessage());
        }
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
