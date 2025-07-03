package com.uniceplac.CNE.dtos;

import com.uniceplac.CNE.enums.Turno;
public record HorariosDto(
    String horarioInicial,
    String horarioFinal,
    String qtdHoras,
    int cargaHoraria,
    Turno turno
) {}
 
