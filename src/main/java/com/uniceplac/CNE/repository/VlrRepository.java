package com.uniceplac.CNE.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uniceplac.CNE.model.Vlr;

@Repository
public interface VlrRepository extends JpaRepository<Vlr, Long> {
    @Override
    Optional<Vlr> findById(Long id);
}
