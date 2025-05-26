package com.uniceplac.CNE.dtos;


import java.sql.Time;

public record HorariosDto(
    Time horarioInicial,
    Time horarioFinal,
    Time qtdHoras,
    int cargaHoraria,
    Turno turno
) {}

enum Turno {
    MATUTINO,
    VESPERTINO,
    NOTURNO,
    DIURNO
}
