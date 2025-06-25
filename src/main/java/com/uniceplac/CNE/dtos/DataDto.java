package com.uniceplac.CNE.dtos;
import java.time.LocalDate;
public record DataDto(
  LocalDate inicioEstagio,
  LocalDate terminoEstagio,
  String diasSemana,
  boolean feriado
){

}
