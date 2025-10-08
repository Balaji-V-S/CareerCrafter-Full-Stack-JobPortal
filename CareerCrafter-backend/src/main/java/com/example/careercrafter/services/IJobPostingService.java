package com.example.careercrafter.services;

import java.util.List;
import java.util.Optional;

import com.example.careercrafter.dto.JobPostingDTO;
import com.example.careercrafter.entities.JobPosting;

public interface IJobPostingService {

    JobPosting createJobPosting(JobPostingDTO jobPostingDTO);
    
    JobPosting updateJobPosting(Integer id, JobPostingDTO dto);

    Optional<JobPosting> getJobPostingById(Integer id);

    List<JobPostingDTO> getJobPostingsByEmployerId(Integer employerId);

    List<JobPosting> searchJobPostings(String title, String location);

    void deleteJobPosting(Integer id);
}
