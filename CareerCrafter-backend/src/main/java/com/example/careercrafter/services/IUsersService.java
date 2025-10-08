package com.example.careercrafter.services;

import com.example.careercrafter.dto.UserRegistrationDTO;
import com.example.careercrafter.entities.Users;

public interface IUsersService {
    Users getUserByEmail(String email);
}
