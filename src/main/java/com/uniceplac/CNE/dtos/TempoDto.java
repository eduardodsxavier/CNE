package com.uniceplac.CNE.dtos;

import java.time.LocalDate;

import com.uniceplac.CNE.enums.Turno;
public record TempoDto(
    String horarioInicial,
    String horarioFinal,
    String qtdHoras,
    int qtdDias,
    int cargaDiaria,
    int cargaTotal,
    Turno turno,
    LocalDate inicioEstagio,
    LocalDate terminoEstagio,
    String diasSemana,
    boolean feriado
) {}
 
