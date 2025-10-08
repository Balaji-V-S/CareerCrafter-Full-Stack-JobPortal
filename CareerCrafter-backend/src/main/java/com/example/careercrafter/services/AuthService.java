package com.example.careercrafter.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.careercrafter.dto.AuthRequestDTO;
import com.example.careercrafter.dto.AuthResponseDTO;
import com.example.careercrafter.dto.UserRegistrationDTO;
import com.example.careercrafter.entities.EmployerProfile;
import com.example.careercrafter.entities.JobSeekerProfile;
import com.example.careercrafter.entities.enums.UserProfile;
import com.example.careercrafter.entities.Users;
import com.example.careercrafter.exception.EmailAlreadyExistsException;
import com.example.careercrafter.exception.UserNotFoundException;
import com.example.careercrafter.repositories.EmployerProfileRepository;
import com.example.careercrafter.repositories.JobSeekerProfileRepository;
import com.example.careercrafter.repositories.UserRepository;
import com.example.careercrafter.security.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployerProfileRepository employerProfileRepository;

    @Autowired
    private JobSeekerProfileRepository jobSeekerProfileRepository;

    public AuthResponseDTO login(AuthRequestDTO request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        Users user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User with email '" + request.getEmail() + "' not found"));

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name(), user.getId());

        return new AuthResponseDTO(token, user.getRole().name(), user.getId());
    }

    public String register(UserRegistrationDTO request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already registered. Please log in.");
        }

        Users user = new Users();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        user.setRole(request.getUserProfile());
        Users savedUser = userRepository.save(user);

        // Create empty profile based on role with default values to satisfy NOT NULL constraints
        if (request.getUserProfile() == UserProfile.EMPLOYER) {
            EmployerProfile profile = new EmployerProfile();
            profile.setUser(savedUser);
            profile.setCompanyName("Not Provided");
            profile.setIndustry("Not Provided");
            profile.setLocation("Not Provided");
            profile.setContactInfo("Not provided");
            employerProfileRepository.save(profile);
        } else if (request.getUserProfile() == UserProfile.JOB_SEEKER) {
            JobSeekerProfile profile = new JobSeekerProfile();
            profile.setUser(savedUser);
            profile.setFullName(savedUser.getFullName());
            profile.setEducation("Not provided");
            profile.setExperience("Not provided");
            profile.setPhoneNumber("Not provided");
            profile.setResume("Not provided"); 
            jobSeekerProfileRepository.save(profile);
        }

        return "User registered successfully.";
    }

}
