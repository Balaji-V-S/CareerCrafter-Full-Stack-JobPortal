package com.example.careercrafter.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.careercrafter.entities.EmployerProfile;

@Repository
public interface EmployerProfileRepository extends JpaRepository<EmployerProfile, Integer> {
	Optional<EmployerProfile> findByUserId(Integer userId);

}
