package com.example.careercrafter.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.Data;

@Data
public class JobPostingDTO {

    private Integer id;

    @NotBlank(message = "Job title is required")
    private String title;

    @NotBlank(message = "Job description is required")
    private String description;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Job type is required")
    private String jobType; // values: FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP

    private String salaryRange;

    @Future(message = "Deadline must be in the future")
    private LocalDate applicationDeadline;

    private String qualifications;

    private Integer employerId;
}