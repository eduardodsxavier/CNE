package com.uniceplac.CNE.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

import com.uniceplac.CNE.model.Aluno;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, String> {
    @Query(value = "SELECT * FROM Aluno WHERE unaccent(nome) ILIKE unaccent(CONCAT('%', :nome, '%'))", nativeQuery = true)
    List<Aluno> searchNameIgnoringAccent(@Param("nome") String nome);

    Optional<Aluno> findByRa(String ra);
}
