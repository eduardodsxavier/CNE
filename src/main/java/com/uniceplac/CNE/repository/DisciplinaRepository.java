package com.uniceplac.CNE.repository;


import org.springframework.stereotype.Repository;
import com.uniceplac.CNE.model.Disciplina;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


@Repository
public interface DisciplinaRepository extends JpaRepository<Disciplina, String> {
    @Query(value = "SELECT * FROM Disciplina WHERE unaccent(nome) ILIKE unaccent(CONCAT('%', :nome, '%'))", nativeQuery = true)
    List<Disciplina> searchNameIgnoringAccent(@Param("nome")String nome);

    Optional<Disciplina> findById(Long Id);
}
