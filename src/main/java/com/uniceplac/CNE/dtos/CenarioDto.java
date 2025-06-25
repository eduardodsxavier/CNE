package com.uniceplac.CNE.dtos;
import com.uniceplac.CNE.enums.Tce;
import com.uniceplac.CNE.model.Tempo;
public record CenarioDto(
    Tempo tempo,
    String anoSemestre,
    String cenario,
    Tce status,
    String alunoRa,
    Long disciplinaId,
    Long unidadeId,
    Long vlrId,
    Long responsavelTceId,
    Long responsavelIesId
){}
