package com.uniceplac.CNE.controller;

import com.uniceplac.CNE.dtos.TempoDto;
import com.uniceplac.CNE.model.Tempo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.uniceplac.CNE.repository.TempoRepository;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tempo")

public class TempoController {

    @Autowired
    private TempoRepository TempoRepository;

    @PostMapping
    public ResponseEntity<Tempo> cadastrarData(@RequestBody TempoDto dto) {
        Tempo tempo = new Tempo();
        tempo.setInicioEstagio(dto.inicioEstagio());
        tempo.setTerminoEstagio(dto.terminoEstagio());
        tempo.setDiasSemana(dto.diasSemana());
        tempo.setFeriado(dto.feriado());
        tempo.setHorarioInicial(dto.horarioInicial());
        tempo.setHorarioFinal(dto.horarioFinal());
        tempo.setQtdDias(dto.qtdDias());
        tempo.setQtdHoras(dto.qtdHoras());
        tempo.setCargaDiaria(dto.cargaDiaria());
        tempo.setCargaTotal(dto.cargaTotal());
        tempo.setTurno(dto.turno());
        Tempo salvo = TempoRepository.save(tempo);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public ResponseEntity<List<Tempo>> listarTodos() {
        List<Tempo> lista = TempoRepository.findAll();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/buscar")
    public ResponseEntity<Tempo> buscarPorId(@RequestParam Long id) {
        Optional<Tempo> encontrado = TempoRepository.findById(id);
        if (encontrado.isPresent()) {
            return ResponseEntity.ok(encontrado.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
