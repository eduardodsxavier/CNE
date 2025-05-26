package com.uniceplac.CNE.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;


import com.uniceplac.CNE.model.Responsavel;


@Repository

public interface ResponsavelRepository extends JpaRepository<Responsavel, String> {
    @Query(value = "SELECT * FROM Responsavel_ies WHERE unaccent(nome) ILIKE unaccent(CONCAT('%', :nome, '%'))", nativeQuery = true)
    List<Responsavel> searchNameIgnoringAccent(@Param("nome")String nome);

    Optional<Responsavel> findById(Long id);
}
