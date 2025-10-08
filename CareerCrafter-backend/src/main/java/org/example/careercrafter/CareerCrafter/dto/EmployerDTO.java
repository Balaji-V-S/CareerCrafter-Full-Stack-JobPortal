package org.example.careercrafter.CareerCrafter.dto;

import lombok.Data;

@Data
public class EmployerDTO {
    private Long id;
    private String name;
    private String email;
    private String companyName;
    private String companyDesc;
    private String website;
}