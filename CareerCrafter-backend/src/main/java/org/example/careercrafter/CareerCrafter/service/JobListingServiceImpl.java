package org.example.careercrafter.CareerCrafter.service;

import org.example.careercrafter.CareerCrafter.dto.JobListingRequestDTO;
import org.example.careercrafter.CareerCrafter.dto.JobListingResponseDTO;
import org.example.careercrafter.CareerCrafter.entity.Employer;
import org.example.careercrafter.CareerCrafter.entity.JobListing;
import org.example.careercrafter.CareerCrafter.entity.enums.EmploymentType;
import org.example.careercrafter.CareerCrafter.utility.UserMapper;
import org.example.careercrafter.CareerCrafter.repository.EmployerRepository;
import org.example.careercrafter.CareerCrafter.repository.JobListingRepository;
import org.example.careercrafter.CareerCrafter.service.JobListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobListingServiceImpl implements JobListingService {

    @Autowired private JobListingRepository jobListingRepository;
    @Autowired private EmployerRepository employerRepository;
    @Autowired private UserMapper userMapper;

    @Override
    public JobListingResponseDTO createJobListing(JobListingRequestDTO requestDTO, String employerEmail) {
        Employer employer = employerRepository.findByEmail(employerEmail)
                .orElseThrow(() -> new RuntimeException("Employer not found!"));

        JobListing jobListing = userMapper.toJobListing(requestDTO);
        jobListing.setEmployer(employer);

        JobListing savedJobListing = jobListingRepository.save(jobListing);
        return userMapper.toJobListingResponseDTO(savedJobListing);
    }

    @Override
    public JobListingResponseDTO getJobListingById(Long id) {
        JobListing jobListing = jobListingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job Listing not found!"));
        return userMapper.toJobListingResponseDTO(jobListing);
    }

    @Override
    public List<JobListingResponseDTO> getAllJobListings() {
        return jobListingRepository.findAll()
                .stream()
                .map(userMapper::toJobListingResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public JobListingResponseDTO updateJobListing(Long id, JobListingRequestDTO requestDTO, String employerEmail) {
        JobListing jobListing = jobListingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job Listing not found!"));

        if (!jobListing.getEmployer().getEmail().equals(employerEmail)) {
            throw new SecurityException("You are not authorized to update this job listing.");
        }

        // Update fields from DTO
        jobListing.setTitle(requestDTO.getTitle());
        jobListing.setDescription(requestDTO.getDescription());
        jobListing.setLocation(requestDTO.getLocation());
        jobListing.setSalary(requestDTO.getSalary());
        jobListing.setIndustry(requestDTO.getIndustry());
        jobListing.setSkillsRequired(EmploymentType.valueOf(requestDTO.getEmploymentType().toUpperCase()));

        JobListing updatedJobListing = jobListingRepository.save(jobListing);
        return userMapper.toJobListingResponseDTO(updatedJobListing);
    }

    @Override
    public void deleteJobListing(Long id, String employerEmail) {
        JobListing jobListing = jobListingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job Listing not found!"));

        if (!jobListing.getEmployer().getEmail().equals(employerEmail)) {
            throw new SecurityException("You are not authorized to delete this job listing.");
        }
        jobListingRepository.delete(jobListing);
    }
}