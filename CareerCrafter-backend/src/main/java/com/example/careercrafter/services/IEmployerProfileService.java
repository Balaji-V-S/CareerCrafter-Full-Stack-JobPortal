package com.example.careercrafter.services;

import java.util.Optional;

import com.example.careercrafter.dto.EmployerProfileDTO;
import com.example.careercrafter.entities.EmployerProfile;

public interface IEmployerProfileService {

	EmployerProfile updateEmployerProfileByUserId(Integer userId, EmployerProfileDTO dto);

    Optional<EmployerProfile> getEmployerProfileByUserId(Integer userId);

}
