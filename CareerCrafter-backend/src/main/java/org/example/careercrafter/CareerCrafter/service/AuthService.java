package org.example.careercrafter.CareerCrafter.service;

import org.example.careercrafter.CareerCrafter.dto.AuthResponseDTO;
import org.example.careercrafter.CareerCrafter.dto.LoginRequestDTO;
import org.example.careercrafter.CareerCrafter.dto.RegisterRequestDTO;

public interface AuthService {
    String registerUser(RegisterRequestDTO registerRequestDTO);
    AuthResponseDTO loginUser(LoginRequestDTO loginRequestDTO);
}