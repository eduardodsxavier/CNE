package com.uniceplac.CNE.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.uniceplac.CNE.model.Cenario;

@Repository
public interface CenarioRepository extends JpaRepository<Cenario, Long> {
    
    @Override
    Optional<Cenario> findById(Long id);

    List<Cenario> findByAnoSemestre(String anoSemestre);

    List<Cenario> findByStatus(String status);

    List<Cenario> findByAnoSemestreAndStatus(String anoSemestre, String status);
}
