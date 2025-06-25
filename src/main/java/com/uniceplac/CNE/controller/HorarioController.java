package com.uniceplac.CNE.controller;

import com.uniceplac.CNE.dtos.HorariosDto;
import com.uniceplac.CNE.model.Tempo;
import com.uniceplac.CNE.repository.DataRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/horario")
public class HorarioController {

    @Autowired
    private DataRepository dataRepository;

    @PostMapping
    public ResponseEntity<Tempo> cadastrarHorario(@RequestBody HorariosDto dto) {
        Tempo tempo = new Tempo();
        tempo.setHorarioInicial(dto.horarioInicial());
        tempo.setHorarioFinal(dto.horarioFinal());
        tempo.setQtdHoras(dto.qtdHoras());
        tempo.setCargaDiaria(dto.cargaHoraria());
        tempo.setTurno(dto.turno());

        Tempo salvo = dataRepository.save(tempo);
        return ResponseEntity.ok(salvo);
    }
}
