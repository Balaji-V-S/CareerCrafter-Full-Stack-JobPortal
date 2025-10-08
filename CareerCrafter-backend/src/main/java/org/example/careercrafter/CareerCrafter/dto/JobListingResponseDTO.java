package org.example.careercrafter.CareerCrafter.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class JobListingResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String location;
    private String employmentType;
    private Double salary;
    private String industry;
    private String[] skillsRequired;
    private LocalDateTime postedAt;

    private EmployerInfo employer;

    @Data
    public static class EmployerInfo {
        private Long id;
        private String companyName;
    }
}