package com.uniceplac.CNE.service;


import  com.uniceplac.CNE.model.Disciplina;
import com.uniceplac.CNE.repository.DisciplinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DisciplinaService {

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    public Disciplina salvar(Disciplina disciplina) {
        return disciplinaRepository.save(disciplina);
    }

    public List<Disciplina> listarTodas() {
        return disciplinaRepository.findAll();
    }

    public Optional<Disciplina> buscarPorId(Long id) {
        return disciplinaRepository.findById(id);
    }

    public Disciplina atualizar(Long id, Disciplina novaDisciplina) {
        return disciplinaRepository.findById(id).map(d -> {
            d.setNome(novaDisciplina.getNome());
            d.setCargaHoraria(novaDisciplina.getCargaHoraria());
            return disciplinaRepository.save(d);
        }).orElseThrow(() -> new RuntimeException("Disciplina não encontrada"));
    }

    public void deletar(Long id) {
        disciplinaRepository.deleteById(id);
    }
}


    