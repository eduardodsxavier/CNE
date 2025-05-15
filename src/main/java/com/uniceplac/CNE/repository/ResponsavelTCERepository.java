package com.uniceplac.CNE.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uniceplac.CNE.model.ResponsavelTCE;

@Repository
public interface ResponsavelTCERepository extends JpaRepository<ResponsavelTCE, Long> {
    Optional<ResponsavelTCE> findById(Long id);
}
