package com.uniceplac.CNE.repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uniceplac.CNE.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByRA(String RA);
    
    Optional<User> findByName(String name);

    Optional<User> findByEmail(String email);

    Optional<List<User>> findByChangePassword(boolean changePassword);
}
