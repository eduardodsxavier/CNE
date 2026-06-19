package com.uniceplac.CNE.dtos;

import com.uniceplac.CNE.enums.Tce;
import com.uniceplac.CNE.enums.Turno;

public record CenarioWizardPayload(
    Long id,
    AlunoPayload aluno,
    DisciplinaPayload disciplina,
    UnidadePayload unidade,
    VlrPayload vlr,
    TcePayload tce,
    TempoPayload tempo
) {
    public record AlunoPayload(String ra, String nome, String email, String curso, String semestre, String turma) {}
    public record DisciplinaPayload(String nomeDisciplina, int cargaHoraria, String responsavelNome, String responsavelEmail) {}
    public record UnidadePayload(String nomeUnidade, String sigla, boolean interno, boolean convenioPublico) {}
    public record VlrPayload(java.math.BigDecimal preceptor, java.math.BigDecimal gerenciamento, java.math.BigDecimal total, java.math.BigDecimal totalAluno) {}
    public record TcePayload(String nome, String cargo, String email, String telefone) {}
    public record TempoPayload(
        String inicioEstagio, 
        String terminoEstagio, 
        String diasSemana, 
        boolean feriado, 
        String horarioInicial, 
        String horarioFinal, 
        String qtdHoras, 
        int cargaDiaria, 
        Turno turno
    ) {}
}
