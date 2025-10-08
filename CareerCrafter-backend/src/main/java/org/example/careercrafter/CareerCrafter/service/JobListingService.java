package org.example.careercrafter.CareerCrafter.service;

import org.example.careercrafter.CareerCrafter.dto.JobListingRequestDTO;
import org.example.careercrafter.CareerCrafter.dto.JobListingResponseDTO;

import java.util.List;

public interface JobListingService {
    JobListingResponseDTO createJobListing(JobListingRequestDTO requestDTO, String employerEmail);
    JobListingResponseDTO getJobListingById(Long id);
    List<JobListingResponseDTO> getAllJobListings();
    JobListingResponseDTO updateJobListing(Long id, JobListingRequestDTO requestDTO, String employerEmail);
    void deleteJobListing(Long id, String employerEmail);
}