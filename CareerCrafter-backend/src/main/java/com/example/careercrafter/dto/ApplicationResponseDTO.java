package com.example.careercrafter.dto;

import lombok.Data;

@Data
public class ApplicationResponseDTO 
{

    private Integer applicationId;
    private String jobTitle;
    private String seekerEmail;
    private String status;

    public ApplicationResponseDTO() {}

    public ApplicationResponseDTO(Integer applicationId, String jobTitle, String seekerEmail, String status) 
    {
        this.applicationId = applicationId;
        this.jobTitle = jobTitle;
        this.seekerEmail = seekerEmail;
        this.status = status;
    }
}