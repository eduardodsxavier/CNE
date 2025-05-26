package com.uniceplac.CNE.repository;


import com.uniceplac.CNE.model.Disciplina;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface DisciplinaRepository extends JpaRepository<Disciplina, Long> {
    List<Disciplina> findByNome(String nome);
}