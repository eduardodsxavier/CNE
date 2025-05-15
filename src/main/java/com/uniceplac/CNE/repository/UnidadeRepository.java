package com.uniceplac.CNE.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uniceplac.CNE.model.Unidade;

@Repository
public interface UnidadeRepository extends JpaRepository<Unidade, Long> {
    Optional<Unidade> findById(Long id);
}
