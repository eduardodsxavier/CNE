package com.uniceplac.CNE.dtos;


import java.sql.Time;
import com.uniceplac.CNE.enums.Turno;
public record HorariosDto(
    Time horarioInicial,
    Time horarioFinal,
    Time qtdHoras,
    int cargaHoraria,
    Turno turno
) {}
 