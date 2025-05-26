package com.uniceplac.CNE.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uniceplac.CNE.model.Tempo;

@Repository
public interface TempoRepository extends JpaRepository<Tempo, Long> {
    @Override
    Optional<Tempo> findById(Long id);
}
