package org.example.careercrafter.CareerCrafter.dto;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String email;
    private String password;
}