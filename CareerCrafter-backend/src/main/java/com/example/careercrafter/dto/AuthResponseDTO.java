package com.example.careercrafter.dto;
import lombok.Data;

@Data
public class AuthResponseDTO {
    private String token;
    private String role;
    private int userId;

    public AuthResponseDTO(String token, String role, int userId) {
        this.token = token;
        this.role = role;
        this.userId = userId;
    }
}