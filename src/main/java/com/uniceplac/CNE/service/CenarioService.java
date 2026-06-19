package com.uniceplac.CNE.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uniceplac.CNE.dtos.CenarioDto;
import com.uniceplac.CNE.dtos.CenarioWizardPayload;
import com.uniceplac.CNE.model.*;
import com.uniceplac.CNE.repository.*;
import com.uniceplac.CNE.enums.Tce;

@Service

public class CenarioService {

    @Autowired private CenarioRepository cenarioRepository;
    @Autowired private AlunoRepository alunoRepository;
    @Autowired private DisciplinaRepository disciplinaRepository;
    @Autowired private UnidadeRepository unidadeRepository;
    @Autowired private VlrRepository vlrRepository;
    @Autowired private ResponsavelTCERepository responsavelTCERepository;
    @Autowired private ResponsavelRepository responsavelRepository;
    @Autowired private TempoRepository tempoRepository;

    public List<Cenario> listCenarios(String anoSemestre, String status){
        Tce tceStatus = null;
        if (status != null && !status.equals("null") && !status.isEmpty()) {
            try {
                tceStatus = Tce.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                return java.util.Collections.emptyList();
            }
        }

        if((anoSemestre == null || anoSemestre.equals("null")) && tceStatus == null){
            return cenarioRepository.findAll();
        }else if (anoSemestre != null && !anoSemestre.equals("null") && tceStatus == null) {
            return cenarioRepository.findByAnoSemestre(anoSemestre);
        }else if (tceStatus != null && (anoSemestre == null || anoSemestre.equals("null"))) {
            return cenarioRepository.findByStatus(tceStatus);
        }else{
            return cenarioRepository.findByAnoSemestreAndStatus(anoSemestre, tceStatus);
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
        cenario.setTempo(tempoRepository.findById(dto.tempoId()).orElseThrow());

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

    public Cenario salvarCenarioWizard(CenarioWizardPayload payload) {
        // 1. Aluno
        Aluno aluno = alunoRepository.findByRa(payload.aluno().ra()).orElseGet(() -> new Aluno());
        aluno.setRa(payload.aluno().ra());
        aluno.setNome(payload.aluno().nome());
        aluno.setEmail(payload.aluno().email());
        aluno.setCurso(payload.aluno().curso());
        aluno.setSemestre(payload.aluno().semestre());
        aluno.setTurma(payload.aluno().turma());
        aluno.setStatus("Ativo");
        aluno.setDeleted(false);
        aluno = alunoRepository.save(aluno);

        // 2. Disciplina
        Disciplina disciplina = disciplinaRepository.findByNome(payload.disciplina().nomeDisciplina()).orElseGet(() -> new Disciplina());
        disciplina.setNome(payload.disciplina().nomeDisciplina());
        disciplina.setCargaHoraria(payload.disciplina().cargaHoraria());
        disciplina = disciplinaRepository.save(disciplina);

        // 3. Unidade
        Unidade unidade = unidadeRepository.findByNomeContainingIgnoreCase(payload.unidade().nomeUnidade())
                .orElseGet(() -> unidadeRepository.findBySigla(payload.unidade().sigla()).orElseGet(() -> new Unidade()));
        unidade.setNome(payload.unidade().nomeUnidade());
        unidade.setSigla(payload.unidade().sigla());
        unidade.setInterno(payload.unidade().interno());
        unidade.setConvenioPublico(payload.unidade().convenioPublico());
        unidade.setDeleted(false);
        unidade = unidadeRepository.save(unidade);

        // 4. Vlr
        Vlr vlr = new Vlr();
        vlr.setPreceptor(payload.vlr().preceptor());
        vlr.setGerenciamento(payload.vlr().gerenciamento());
        vlr.setTotal(payload.vlr().total());
        vlr.setTotalAluno(payload.vlr().totalAluno());
        vlr = vlrRepository.save(vlr);

        // 5. ResponsavelTCE
        ResponsavelTCE responsavelTCE = responsavelTCERepository.findByEmail(payload.tce().email())
                .orElseGet(() -> responsavelTCERepository.findByTelefone(payload.tce().telefone()).orElseGet(() -> new ResponsavelTCE()));
        responsavelTCE.setNome(payload.tce().nome());
        responsavelTCE.setCargo(payload.tce().cargo());
        responsavelTCE.setEmail(payload.tce().email());
        responsavelTCE.setTelefone(payload.tce().telefone());
        responsavelTCE = responsavelTCERepository.save(responsavelTCE);

        // 6. ResponsavelIES
        Responsavel responsavelIES = responsavelRepository.findByEmail(payload.disciplina().responsavelEmail()).orElseGet(() -> new Responsavel());
        responsavelIES.setNome(payload.disciplina().responsavelNome());
        responsavelIES.setEmail(payload.disciplina().responsavelEmail());
        responsavelIES.setDeleted(false);
        responsavelIES = responsavelRepository.save(responsavelIES);

        // 7. Tempo
        Tempo tempo = new Tempo();
        tempo.setInicioEstagio(java.time.LocalDate.parse(payload.tempo().inicioEstagio()));
        tempo.setTerminoEstagio(java.time.LocalDate.parse(payload.tempo().terminoEstagio()));
        tempo.setDiasSemana(payload.tempo().diasSemana());
        tempo.setFeriado(payload.tempo().feriado());
        tempo.setHorarioInicial(payload.tempo().horarioInicial());
        tempo.setHorarioFinal(payload.tempo().horarioFinal());
        tempo.setQtdHoras(payload.tempo().qtdHoras());
        tempo.setCargaDiaria(payload.tempo().cargaDiaria());
        tempo.setTurno(payload.tempo().turno());
        tempo = tempoRepository.save(tempo);

        // 8. Cenario
        Cenario cenario = new Cenario();
        java.time.LocalDate inicio = java.time.LocalDate.parse(payload.tempo().inicioEstagio());
        int year = inicio.getYear();
        int semester = inicio.getMonthValue() <= 6 ? 1 : 2;
        cenario.setAnoSemestre(year + "/" + semester);
        cenario.setCenario(payload.disciplina().nomeDisciplina() + " - " + payload.unidade().nomeUnidade());
        cenario.setStatus(com.uniceplac.CNE.enums.Tce.ANDAMENTO);

        cenario.setAluno(aluno);
        cenario.setDisciplina(disciplina);
        cenario.setUnidade(unidade);
        cenario.setVlr(vlr);
        cenario.setResponsavelTCE(responsavelTCE);
        cenario.setResponsavelIES(responsavelIES);
        cenario.setTempo(tempo);

        return cenarioRepository.save(cenario);
    }

    public Optional<Cenario> atualizarCenarioWizard(Long id, CenarioWizardPayload payload) {
        return cenarioRepository.findById(id).map(cenario -> {
            // Update Aluno
            Aluno aluno = cenario.getAluno();
            if (aluno != null) {
                aluno.setNome(payload.aluno().nome());
                aluno.setEmail(payload.aluno().email());
                aluno.setCurso(payload.aluno().curso());
                aluno.setSemestre(payload.aluno().semestre());
                aluno.setTurma(payload.aluno().turma());
                alunoRepository.save(aluno);
            }

            // Update Disciplina
            Disciplina disciplina = cenario.getDisciplina();
            if (disciplina != null) {
                disciplina.setNome(payload.disciplina().nomeDisciplina());
                disciplina.setCargaHoraria(payload.disciplina().cargaHoraria());
                disciplinaRepository.save(disciplina);
            }

            // Update Unidade
            Unidade unidade = cenario.getUnidade();
            if (unidade != null) {
                unidade.setNome(payload.unidade().nomeUnidade());
                unidade.setSigla(payload.unidade().sigla());
                unidade.setInterno(payload.unidade().interno());
                unidade.setConvenioPublico(payload.unidade().convenioPublico());
                unidadeRepository.save(unidade);
            }

            // Update Vlr
            Vlr vlr = cenario.getVlr();
            if (vlr != null) {
                vlr.setPreceptor(payload.vlr().preceptor());
                vlr.setGerenciamento(payload.vlr().gerenciamento());
                vlr.setTotal(payload.vlr().total());
                vlr.setTotalAluno(payload.vlr().totalAluno());
                vlrRepository.save(vlr);
            }

            // Update ResponsavelTCE
            ResponsavelTCE responsavelTCE = cenario.getResponsavelTCE();
            if (responsavelTCE != null) {
                responsavelTCE.setNome(payload.tce().nome());
                responsavelTCE.setCargo(payload.tce().cargo());
                responsavelTCE.setEmail(payload.tce().email());
                responsavelTCE.setTelefone(payload.tce().telefone());
                responsavelTCERepository.save(responsavelTCE);
            }

            // Update ResponsavelIES
            Responsavel responsavelIES = cenario.getResponsavelIES();
            if (responsavelIES != null) {
                responsavelIES.setNome(payload.disciplina().responsavelNome());
                responsavelIES.setEmail(payload.disciplina().responsavelEmail());
                responsavelRepository.save(responsavelIES);
            }

            // Update Tempo
            Tempo tempo = cenario.getTempo();
            if (tempo != null) {
                tempo.setInicioEstagio(java.time.LocalDate.parse(payload.tempo().inicioEstagio()));
                tempo.setTerminoEstagio(java.time.LocalDate.parse(payload.tempo().terminoEstagio()));
                tempo.setDiasSemana(payload.tempo().diasSemana());
                tempo.setFeriado(payload.tempo().feriado());
                tempo.setHorarioInicial(payload.tempo().horarioInicial());
                tempo.setHorarioFinal(payload.tempo().horarioFinal());
                tempo.setQtdHoras(payload.tempo().qtdHoras());
                tempo.setCargaDiaria(payload.tempo().cargaDiaria());
                tempo.setTurno(payload.tempo().turno());
                tempoRepository.save(tempo);
            }

            // Update simple fields
            java.time.LocalDate inicio = java.time.LocalDate.parse(payload.tempo().inicioEstagio());
            int year = inicio.getYear();
            int semester = inicio.getMonthValue() <= 6 ? 1 : 2;
            cenario.setAnoSemestre(year + "/" + semester);
            cenario.setCenario(payload.disciplina().nomeDisciplina() + " - " + payload.unidade().nomeUnidade());

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
