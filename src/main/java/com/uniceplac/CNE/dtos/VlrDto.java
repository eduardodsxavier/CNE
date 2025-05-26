package com.uniceplac.CNE.dtos;
import java.math.BigDecimal;

public record VlrDto(
     BigDecimal preceptor,
     BigDecimal gerenciamento,
     BigDecimal total,
     BigDecimal totalAluno
 
){

}