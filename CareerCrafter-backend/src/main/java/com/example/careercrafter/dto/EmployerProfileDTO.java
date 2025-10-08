package com.example.careercrafter.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class EmployerProfileDTO {

    private Integer id;

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Industry is required")
    private String industry;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Contact info is required")
    private String contactInfo;

    @Size(max = 1000, message = "Description should be less than 1000 characters")
    private String description;

    private Integer userId;
}
