package com.uniceplac.CNE.dtos;

import java.util.List;

public record CenarioWizardDto(
        AlunoDto aluno,
        DisciplinaDto disciplina,
        UnidadeDto unidade,
        VlrDto vlr,
        TceDto tce,
        DataDto data,
        HorarioDto horario
) {

    public record AlunoDto(String nome, String ra, String curso) {}
    public record DisciplinaDto(String nome, int cargaHoraria) {}
    public record UnidadeDto(String nome, String endereco) {}
    public record VlrDto(String nome) {}
    public record TceDto(String status) {}
    public record DataDto(String inicioEstagio, String terminoEstagio, List<String> diasSemana, Boolean feriado) {}
    public record HorarioDto(String horarioInicial, String horarioFinal, Integer qtdHoras, Integer cargaHoraria, String turno) {}
}