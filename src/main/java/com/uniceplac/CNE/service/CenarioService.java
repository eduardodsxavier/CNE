package com.uniceplac.CNE.service;

import com.uniceplac.CNE.model.Cenario;
import com.uniceplac.CNE.repository.CenarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CenarioService{

    @Autowired
    private CenarioRepository cenarioRepository;


    public List<Cenario> getCenarios(String anoSemestre, String status) {
        if (status == null && anoSemestre == null) {
            return cenarioRepository.findAll();
        }

        if (status == null) {
            return cenarioRepository.findByAnoSemestre(anoSemestre).get();
        }

        if (anoSemestre == null) {
            return cenarioRepository.findByStatus(status).get();
        }

        return cenarioRepository.findByAnoSemestreAndStatus(anoSemestre, status).get();
    }
   
}
