package org.example.careercrafter.CareerCrafter.service;

import org.example.careercrafter.CareerCrafter.dto.ApplicationRequestDTO;
import org.example.careercrafter.CareerCrafter.dto.ApplicationResponseDTO;

import java.util.List;

public interface ApplicationService {
    ApplicationResponseDTO createApplication(ApplicationRequestDTO requestDTO, String jobSeekerEmail);
    List<ApplicationResponseDTO> getApplicationsForJobSeeker(String jobSeekerEmail);
    List<ApplicationResponseDTO> getApplicationsForJobListing(Long jobListingId, String employerEmail);
    ApplicationResponseDTO updateApplicationStatus(Long applicationId, String status, String employerEmail);
}