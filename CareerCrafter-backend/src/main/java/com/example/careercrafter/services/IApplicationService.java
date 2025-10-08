package com.example.careercrafter.services;

import java.util.List;

import com.example.careercrafter.dto.ApplicationRequestDTO;
import com.example.careercrafter.dto.ApplicationResponseDTO;

public interface IApplicationService {

    ApplicationResponseDTO applyForJob(ApplicationRequestDTO applicationRequest);

    List<ApplicationResponseDTO> getApplicationsByJobSeeker(Integer seekerId);

    List<ApplicationResponseDTO> getApplicationsByJobId(Integer jobId);

    void updateApplicationStatus(Integer applicationId, String newStatus);

    void deleteApplication(Integer applicationId);
}
