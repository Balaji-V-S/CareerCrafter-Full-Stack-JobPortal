package org.example.careercrafter.CareerCrafter.dto;

import lombok.Data;

@Data
public class JobSeekerProfileDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String[] skills;
    private String education; // JSON string
    private String workExperience; // JSON string
    private String coCurricularDetails; // JSON string
}