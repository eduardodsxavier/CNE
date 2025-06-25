package com.uniceplac.CNE.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.uniceplac.CNE.model.Tempo;
import com.uniceplac.CNE.repository.DataRepository;
import com.uniceplac.CNE.dtos.DataDto;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/data")

public class DataController {

    @Autowired
    private DataRepository dataRepository;

    @PostMapping
    public ResponseEntity<Tempo> cadastrarData(@RequestBody DataDto dto) {
        Tempo tempo = new Tempo();
        tempo.setInicioEstagio(dto.inicioEstagio());
        tempo.setTerminoEstagio(dto.terminoEstagio());
        tempo.setDiasSemana(dto.diasSemana());
        tempo.setFeriado(dto.feriado());
        Tempo salvo = dataRepository.save(tempo);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public ResponseEntity<List<Tempo>> listarTodos() {
        List<Tempo> lista = dataRepository.findAll();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/buscar")
    public ResponseEntity<Tempo> buscarPorId(@RequestParam Long id) {
        Optional<Tempo> encontrado = dataRepository.findById(id);
        if (encontrado.isPresent()) {
            return ResponseEntity.ok(encontrado.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

