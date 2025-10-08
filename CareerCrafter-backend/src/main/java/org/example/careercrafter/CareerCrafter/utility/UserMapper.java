package org.example.careercrafter.CareerCrafter.utility;

import org.example.careercrafter.CareerCrafter.dto.*;
import org.example.careercrafter.CareerCrafter.entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring") // Creates a Spring Bean for the mapper
public interface UserMapper {

    // =================================================================
    //  Entity to DTO (For Reading Data / Sending Responses)
    // =================================================================

    JobSeekerProfileDTO toJobSeekerProfileDTO(JobSeeker jobSeeker);

    EmployerDTO toEmployerProfileDTO(Employer employer);

    NotificationDTO toNotificationDTO(Notification notification);

    @Mapping(source = "employer.companyName", target = "employer.companyName")
    JobListingResponseDTO toJobListingResponseDTO(JobListing jobListing);

    @Mapping(source = "jobSeeker.id", target = "jobSeeker.id")
    @Mapping(source = "jobSeeker.name", target = "jobSeeker.name")
    @Mapping(source = "jobSeeker.email", target = "jobSeeker.email")
    @Mapping(source = "jobListing.id", target = "jobListing.id")
    @Mapping(source = "jobListing.title", target = "jobListing.title")
    @Mapping(source = "jobListing.employer.companyName", target = "jobListing.companyName")
    ApplicationResponseDTO toApplicationResponseDTO(Application application);


    // =================================================================
    //  DTO to Entity (For Writing Data / Handling Requests)
    // =================================================================

    // Converts a request DTO to a new entity before saving
    JobListing toJobListing(JobListingRequestDTO dto);

    EmployerDTO toEmployerDTO(Employer updatedEmployer);

    // Note: Registration (RegisterRequestDTO -> Entity) is handled directly
    // in the AuthService to accommodate business logic like password hashing and roles.
}