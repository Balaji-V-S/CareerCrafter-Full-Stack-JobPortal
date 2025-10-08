package org.example.careercrafter.CareerCrafter.repository;

import org.example.careercrafter.CareerCrafter.entity.JobListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobListingRepository extends JpaRepository<JobListing,Long> {
}
