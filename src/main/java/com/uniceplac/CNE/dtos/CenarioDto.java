package com.uniceplac.CNE.dtos;

import com.uniceplac.CNE.enums.Tce;

public record CenarioDto(
        String anoSemestre,
        String cenario,
        Tce status,
        String alunoRa,
        Long tempoId,
        Long disciplinaId,
        Long unidadeId,
        Long vlrId,
        Long responsavelTceId,
        Long responsavelIesId) {
}
