package com.uniceplac.CNE.repository;

import com.uniceplac.CNE.model.Tempo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DataRepository extends JpaRepository<Tempo, Long> {
}
