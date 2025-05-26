package com.uniceplac.CNE.service;

import com.uniceplac.CNE.dtos.AlunoDto;
import com.uniceplac.CNE.model.Aluno;
import com.uniceplac.CNE.repository.AlunoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlunoService {

    private final AlunoRepository alunoRepository;

    public AlunoService(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    public Aluno cadastrarAluno(AlunoDto dto) {
        Aluno aluno = new Aluno();
        aluno.setNome(dto.nome());
        aluno.setEmail(dto.email());
        aluno.setCurso(dto.curso());
        aluno.setTurma(dto.turma());
        aluno.setDeleted(false);
        return alunoRepository.save(aluno);
    }

    public List<Aluno> listarTodos() {
        return alunoRepository.findAll();
    }

    public Aluno buscarPorId(String id) {
        return alunoRepository.findByRa(id)
            .orElseThrow(() -> new RuntimeException("Aluno não encontrado com ID: " + id));
    }

    public void deletarPorId(String id) {
        if (!alunoRepository.existsById(id)) {
            throw new RuntimeException("Aluno não encontrado com ID: " + id);
        }
        alunoRepository.deleteById(id);
    }

    public Aluno atualizarAluno(String id, AlunoDto dto) {
        Aluno alunoExistente = alunoRepository.findByRa(id)
            .orElseThrow(() -> new RuntimeException("Aluno não encontrado com ID: " + id));
        alunoExistente.setNome(dto.nome());
        alunoExistente.setEmail(dto.email());
        alunoExistente.setCurso(dto.curso());
        alunoExistente.setTurma(dto.turma());
        return alunoRepository.save(alunoExistente);
    }
}
