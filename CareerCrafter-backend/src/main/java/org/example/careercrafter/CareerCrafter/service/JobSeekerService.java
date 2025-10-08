package org.example.careercrafter.CareerCrafter.service;

import org.example.careercrafter.CareerCrafter.dto.JobSeekerProfileDTO;
import org.springframework.web.multipart.MultipartFile;

public interface JobSeekerService {
    JobSeekerProfileDTO getProfile(String jobSeekerEmail);
    JobSeekerProfileDTO updateProfile(String jobSeekerEmail, JobSeekerProfileDTO profileDTO);
    String updateResume(String jobSeekerEmail, MultipartFile resumeFile);
}