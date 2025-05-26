package com.uniceplac.CNE.service;

import com.uniceplac.CNE.dtos.DataDto;
import com.uniceplac.CNE.model.Tempo;
import com.uniceplac.CNE.repository.TempoRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DataService {

    private final TempoRepository tempoRepository;

    public DataService(TempoRepository tempoRepository) {
        this.tempoRepository = tempoRepository;
    }

    public Tempo createTempo(DataDto dto) {
        Tempo tempo = new Tempo();
        tempo.setInicioEstagio(dto.inicioEstagio());
        tempo.setTerminoEstagio(dto.terminoEstagio());
        tempo.setDiasSemana(dto.diasSemana());
        tempo.setFeriado(dto.feriado());
        return tempoRepository.save(tempo);
    }

    public Optional<Tempo> updateTempo(Long id, DataDto dto) {
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
}
