package org.example.careercrafter.CareerCrafter.dto;

import lombok.Data;

@Data
public class JobListingRequestDTO {
    private String title;
    private String description;
    private String location;
    private String employmentType; // e.g., "FULL_TIME"
    private Double salary;
    private String industry;
    private String[] skillsRequired;
}