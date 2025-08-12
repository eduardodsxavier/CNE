package com.uniceplac.CNE.service;

import com.uniceplac.CNE.dtos.TempoDto;
import com.uniceplac.CNE.model.Tempo;
import com.uniceplac.CNE.repository.TempoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TempoService {

    private final TempoRepository tempoRepository;

    public TempoService(TempoRepository tempoRepository) {
        this.tempoRepository = tempoRepository;
    }

    public Tempo createTempo(TempoDto dto) {
        Tempo tempo = new Tempo();
        tempo.setInicioEstagio(dto.inicioEstagio());
        tempo.setTerminoEstagio(dto.terminoEstagio());
        tempo.setDiasSemana(dto.diasSemana());
        tempo.setFeriado(dto.feriado());
        return tempoRepository.save(tempo);
    }

    public Optional<Tempo> updateTempo(Long id, TempoDto dto) {
        return tempoRepository.findById(id).map(tempo -> {
            tempo.setInicioEstagio(dto.inicioEstagio());
            tempo.setTerminoEstagio(dto.terminoEstagio());
            tempo.setDiasSemana(dto.diasSemana());
            tempo.setFeriado(dto.feriado());
            return tempoRepository.save(tempo);
        });
    }

    public void deleteTempo(Long id) {
        tempoRepository.deleteById(id);
    }

    public Optional<Tempo> getById(Long id) {
        return tempoRepository.findById(id);
    }

    public List<Tempo> getAll() {
        return tempoRepository.findAll();
    }
}

