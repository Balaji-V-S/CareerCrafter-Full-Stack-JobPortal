package org.example.careercrafter.CareerCrafter.repository;

import org.example.careercrafter.CareerCrafter.entity.Employer;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployerRepository extends JpaRepositoryImplementation<Employer,Long> {
    Optional<Object> findByEmail(String employerEmail);
}
