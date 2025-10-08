package org.example.careercrafter.CareerCrafter.repository;
import org.example.careercrafter.CareerCrafter.entity.JobSeeker;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JobSeekerRepository extends JpaRepositoryImplementation<JobSeeker,Long> {
    Optional<String> findByEmail(String jobSeekerEmail);
}
