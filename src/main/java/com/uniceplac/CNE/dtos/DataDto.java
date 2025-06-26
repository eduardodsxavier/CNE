package com.uniceplac.CNE.dtos;

import java.util.List;
import java.time.LocalDate;

public record DataDto(
        LocalDate inicioEstagio,
        LocalDate terminoEstagio,
        List<String> diasSemana,
        boolean feriado) {

}
