package org.example.careercrafter.CareerCrafter.service;

import org.example.careercrafter.CareerCrafter.dto.EmployerDTO;

public interface EmployerService {
    EmployerDTO getProfile(String employerEmail);
    EmployerDTO updateProfile(String employerEmail, EmployerDTO profileDTO);
}