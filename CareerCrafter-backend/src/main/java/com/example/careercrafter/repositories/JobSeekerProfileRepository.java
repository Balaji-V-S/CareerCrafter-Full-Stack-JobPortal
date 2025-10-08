package com.example.careercrafter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.careercrafter.entities.JobSeekerProfile;

import java.util.Optional;

@Repository
public interface JobSeekerProfileRepository extends JpaRepository<JobSeekerProfile, Integer> {
	Optional<JobSeekerProfile> findByUserId(int userId);
	boolean existsByUserId(Integer userId);
}
