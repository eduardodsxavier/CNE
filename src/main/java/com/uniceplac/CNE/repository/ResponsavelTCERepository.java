package com.uniceplac.CNE.repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uniceplac.CNE.model.ResponsavelTCE;

@Repository
public interface ResponsavelTCERepository extends JpaRepository<ResponsavelTCE, Long> {
    Optional<ResponsavelTCE> findByEmail(String email);

    Optional<ResponsavelTCE> findByTelefone(String telefone);

    List<ResponsavelTCE> findByNomeResponsavelContainingIgnoreCase(String nomeResponsavel);
}
