package com.uniceplac.CNE.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uniceplac.CNE.model.Cenario;

@Repository
public interface CenarioRepository extends JpaRepository<Cenario, Long> {
    Optional<Cenario> findById(Long id);
}
