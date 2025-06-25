package com.uniceplac.CNE.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uniceplac.CNE.dtos.CenarioDto;
import com.uniceplac.CNE.model.Cenario;
import com.uniceplac.CNE.model.Tempo;
import com.uniceplac.CNE.repository.AlunoRepository;
import com.uniceplac.CNE.repository.CenarioRepository;
import com.uniceplac.CNE.repository.DisciplinaRepository;
import com.uniceplac.CNE.repository.ResponsavelRepository;
import com.uniceplac.CNE.repository.ResponsavelTCERepository;
import com.uniceplac.CNE.repository.UnidadeRepository;
import com.uniceplac.CNE.repository.VlrRepository;

@Service

public class CenarioService {

    @Autowired private CenarioRepository cenarioRepository;
    @Autowired private AlunoRepository alunoRepository;
    @Autowired private DisciplinaRepository disciplinaRepository;
    @Autowired private UnidadeRepository unidadeRepository;
    @Autowired private VlrRepository vlrRepository;
    @Autowired private ResponsavelTCERepository responsavelTCERepository;
    @Autowired private ResponsavelRepository responsavelRepository;

    public List<Cenario> listCenarios(String anoSemestre, String status){
        if((anoSemestre ==null || anoSemestre.equals("null")) && (status==null || status.equals("null"))){
            return cenarioRepository.findAll();
        }else if (anoSemestre != null && !anoSemestre.equals("null") && (status== null || status.equals("null"))) {
            return cenarioRepository.findByAnoSemestre(anoSemestre);
        }else if (status !=null && !status.equals("null") && (anoSemestre == null || anoSemestre.equals("null"))) {
            return cenarioRepository.findByStatus(status);
        }else{
            return cenarioRepository.findByAnoSemestreAndStatus(anoSemestre, status);
        }

    }
    public Cenario criarCenario(CenarioDto dto) {
        Cenario cenario = new Cenario();
        cenario.setAnoSemestre(dto.anoSemestre());
        cenario.setCenario(dto.cenario());
        cenario.setStatus(dto.status());

        cenario.setAluno(alunoRepository.findByRa(dto.alunoRa()).orElseThrow());
        cenario.setDisciplina(disciplinaRepository.findById(dto.disciplinaId()).orElseThrow());
        cenario.setUnidade(unidadeRepository.findById(dto.unidadeId()).orElseThrow());
        cenario.setVlr(vlrRepository.findById(dto.vlrId()).orElse(null)); 
        cenario.setResponsavelTCE(responsavelTCERepository.findById(dto.responsavelTceId()).orElseThrow());
        cenario.setResponsavelIES(responsavelRepository.findById(dto.responsavelIesId()).orElseThrow());
        cenario.setAluno(alunoRepository.findByRa(dto.alunoRa()).orElseThrow());
        cenario.setDisciplina(disciplinaRepository.findById(dto.disciplinaId()).orElseThrow());
        cenario.setUnidade(unidadeRepository.findById(dto.unidadeId()).orElseThrow());
        cenario.setVlr(vlrRepository.findById(dto.vlrId()).orElse(null));
        cenario.setResponsavelTCE(responsavelTCERepository.findById(dto.responsavelTceId()).orElseThrow());
        cenario.setResponsavelIES(responsavelRepository.findById(dto.responsavelIesId()).orElseThrow());

    Tempo tempo = dto.tempo();
    tempo.setCenario(cenario);  
    cenario.setTempo(tempo);

        return cenarioRepository.save(cenario); 
    }
    public Optional<Cenario> buscarPorId(Long id) {
    return cenarioRepository.findById(id);
}

    public Optional<Cenario> atualizarCenario(Long id, CenarioDto dto) {
    return cenarioRepository.findById(id).map(cenario -> {
        cenario.setAnoSemestre(dto.anoSemestre());
        cenario.setCenario(dto.cenario());
        cenario.setStatus(dto.status());
        return cenarioRepository.save(cenario);
    });
}

public boolean deletarCenario(Long id) {
    if (cenarioRepository.existsById(id)) {
        cenarioRepository.deleteById(id);
        return true;
    }
    return false;
}
}
