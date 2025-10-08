package org.example.careercrafter.CareerCrafter.service;

import org.example.careercrafter.CareerCrafter.dto.ApplicationRequestDTO;
import org.example.careercrafter.CareerCrafter.dto.ApplicationResponseDTO;
import org.example.careercrafter.CareerCrafter.entity.Application;
import org.example.careercrafter.CareerCrafter.entity.JobListing;
import org.example.careercrafter.CareerCrafter.entity.JobSeeker;
import org.example.careercrafter.CareerCrafter.entity.enums.ApplicationStatus;
import org.example.careercrafter.CareerCrafter.utility.UserMapper;
import org.example.careercrafter.CareerCrafter.repository.ApplicationRepository;
import org.example.careercrafter.CareerCrafter.repository.JobListingRepository;
import org.example.careercrafter.CareerCrafter.repository.JobSeekerRepository;
import org.example.careercrafter.CareerCrafter.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobSeekerRepository jobSeekerRepository;

    @Autowired
    private JobListingRepository jobListingRepository;

    @Autowired
    private UserMapper userMapper;

    @Override
    public ApplicationResponseDTO createApplication(ApplicationRequestDTO requestDTO, String jobSeekerEmail) {
        JobSeeker jobSeeker = jobSeekerRepository.findByEmail(jobSeekerEmail)
                .orElseThrow(() -> new RuntimeException("Job Seeker not found!"));

        JobListing jobListing = jobListingRepository.findById(requestDTO.getJobListingId())
                .orElseThrow(() -> new RuntimeException("Job Listing not found!"));

        Application application = new Application();
        application.setJobSeeker(jobSeeker);
        application.setJobListing(jobListing);

        Application savedApplication = applicationRepository.save(application);
        return userMapper.toApplicationResponseDTO(savedApplication);
    }

    @Override
    public List<ApplicationResponseDTO> getApplicationsForJobSeeker(String jobSeekerEmail) {
        JobSeeker jobSeeker = jobSeekerRepository.findByEmail(jobSeekerEmail)
                .orElseThrow(() -> new RuntimeException("Job Seeker not found!"));

        return applicationRepository.findByJobSeeker(jobSeeker)
                .stream()
                .map(userMapper::toApplicationResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ApplicationResponseDTO> getApplicationsForJobListing(Long jobListingId, String employerEmail) {
        JobListing jobListing = jobListingRepository.findById(jobListingId)
                .orElseThrow(() -> new RuntimeException("Job Listing not found!"));

        if (!jobListing.getEmployer().getEmail().equals(employerEmail)) {
            throw new SecurityException("You are not authorized to view applications for this job listing.");
        }

        return applicationRepository.findByJobListing(jobListing)
                .stream()
                .map(userMapper::toApplicationResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ApplicationResponseDTO updateApplicationStatus(Long applicationId, String status, String employerEmail) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found!"));

        if (!application.getJobListing().getEmployer().getEmail().equals(employerEmail)) {
            throw new SecurityException("You are not authorized to update this application's status.");
        }

        application.setStatus(ApplicationStatus.valueOf(status.toUpperCase()));
        Application updatedApplication = applicationRepository.save(application);

        // TODO: Trigger a notification to the job seeker
        // notificationService.createNotification(application.getJobSeeker(), "Your application status was updated to " + status);

        return userMapper.toApplicationResponseDTO(updatedApplication);
    }
}