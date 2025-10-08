package org.example.careercrafter.CareerCrafter.repository;

import org.example.careercrafter.CareerCrafter.entity.UserData;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDataRepository extends JpaRepositoryImplementation<UserData,Long> {
    Optional<Object> findByEmail(String email);
    boolean existsByEmail(String email);
}
