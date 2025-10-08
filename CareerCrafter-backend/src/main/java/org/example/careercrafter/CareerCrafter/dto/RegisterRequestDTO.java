package org.example.careercrafter.CareerCrafter.dto;

import lombok.Data;

@Data
public class RegisterRequestDTO {
    private String name;
    private String email;
    private String password;
    private String role; // "JOB_SEEKER" or "EMPLOYER"
    private String companyName; // Optional, only for employers
}
