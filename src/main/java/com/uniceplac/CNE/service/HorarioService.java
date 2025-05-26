package com.uniceplac.CNE.service;

import com.uniceplac.CNE.dtos.HorariosDto;
import com.uniceplac.CNE.model.Tempo;
import com.uniceplac.CNE.repository.TempoRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HorarioService {

    private final TempoRepository tempoRepository;

    public HorarioService(TempoRepository tempoRepository) {
        this.tempoRepository = tempoRepository;
    }

    public Tempo createHorario(HorariosDto dto) {
        Tempo tempo = new Tempo();
        tempo.setHorarioInicial(dto.horarioInicial());
        tempo.setHorarioFinal(dto.horarioFinal());
        tempo.setQtdHoras(dto.qtdHoras());
        tempo.setCargaDiaria(dto.cargaHoraria());
   
        return tempoRepository.save(tempo);
    }

    public Optional<Tempo> updateHorario(Long id, HorariosDto dto) {
        return tempoRepository.findById(id).map(tempo -> {
            tempo.setHorarioInicial(dto.horarioInicial());
            tempo.setHorarioFinal(dto.horarioFinal());
            tempo.setQtdHoras(dto.qtdHoras());
            tempo.setCargaDiaria(dto.cargaHoraria());
       
            return tempoRepository.save(tempo);
        });
    }

    public void deleteHorario(Long id) {
        tempoRepository.deleteById(id);
    }
}
