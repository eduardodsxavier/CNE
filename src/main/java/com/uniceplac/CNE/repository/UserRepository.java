package com.uniceplac.CNE.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uniceplac.CNE.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByRA(Long RA);
    
    Optional<User> findByName(String name);

    Optional<User> findByEmail(String email);
}
