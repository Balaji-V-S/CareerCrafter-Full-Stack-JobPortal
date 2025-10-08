package com.example.careercrafter.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ApplicationRequestDTO
{

    @NotNull(message = "Job ID is required")
    private Integer jobId;

    @NotNull(message = "Seeker ID is required")
    private Integer seekerId;

    private String resumePath;
}
