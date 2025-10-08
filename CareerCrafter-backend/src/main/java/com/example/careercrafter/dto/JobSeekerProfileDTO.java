package com.example.careercrafter.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class JobSeekerProfileDTO 
{

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid phone number")
    private String phoneNumber;

    @NotBlank(message = "Education is required")
    private String education;

    @NotBlank(message = "Experience is required")
    private String experience;

    @NotNull(message = "Skills are required")
    @Size(min = 1, message = "At least one skill is required")
    private List<@NotBlank String> skills;
    
    @NotBlank(message = "Resume is required")
    private String resume;

    private Integer userId;
    
    private Integer id;
}
