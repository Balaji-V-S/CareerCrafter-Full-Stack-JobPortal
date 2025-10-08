package com.example.careercrafter.services;

import java.util.List;

import com.example.careercrafter.dto.JobSeekerProfileDTO;
import com.example.careercrafter.entities.JobSeekerProfile;

public interface IJobSeekerProfileService {
    JobSeekerProfile updateProfile(int id, JobSeekerProfileDTO dto);
    JobSeekerProfileDTO getProfileByUserId(int userId);
    List<JobSeekerProfile> getAllProfiles();
    String deleteProfile(int id);
}
