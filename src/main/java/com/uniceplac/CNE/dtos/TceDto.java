package com.uniceplac.CNE.dtos;

public record TceDto(
    String nome,
    String responsavel,
    String cargo,
    String email,
    String telefone,
    TermoCompromisso termoCompromisso
) {}

enum TermoCompromisso {
    FINALIZADO,
    ANDAMENTO, 
    PENDENTE
}
