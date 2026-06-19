package com.uniceplac.CNE.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.uniceplac.CNE.model.Cenario;
import com.uniceplac.CNE.enums.Tce;

@Repository
public interface CenarioRepository extends JpaRepository<Cenario, Long> {
    
    @Override
    Optional<Cenario> findById(Long id);

    List<Cenario> findByAnoSemestre(String anoSemestre);

    List<Cenario> findByStatus(Tce status);

    List<Cenario> findByAnoSemestreAndStatus(String anoSemestre, Tce status);
}
