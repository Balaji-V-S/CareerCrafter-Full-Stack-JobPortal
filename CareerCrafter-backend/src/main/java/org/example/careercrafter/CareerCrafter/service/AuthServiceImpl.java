package org.example.careercrafter.CareerCrafter.service;

import org.example.careercrafter.CareerCrafter.config.JwtTokenProvider;
import org.example.careercrafter.CareerCrafter.dto.AuthResponseDTO;
import org.example.careercrafter.CareerCrafter.dto.LoginRequestDTO;
import org.example.careercrafter.CareerCrafter.dto.RegisterRequestDTO;
import org.example.careercrafter.CareerCrafter.entity.Employer;
import org.example.careercrafter.CareerCrafter.entity.JobSeeker;
import org.example.careercrafter.CareerCrafter.entity.UserData;
import org.example.careercrafter.CareerCrafter.entity.enums.Role;
import org.example.careercrafter.CareerCrafter.repository.EmployerRepository;
import org.example.careercrafter.CareerCrafter.repository.JobSeekerRepository;
import org.example.careercrafter.CareerCrafter.repository.UserDataRepository;
import org.example.careercrafter.CareerCrafter.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired private UserDataRepository userDataRepository;
    @Autowired private JobSeekerRepository jobSeekerRepository;
    @Autowired private EmployerRepository employerRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtTokenProvider jwtTokenProvider;

    @Override
    public String registerUser(RegisterRequestDTO registerRequestDTO) {
        if (userDataRepository.existsByEmail(registerRequestDTO.getEmail())) {
            throw new RuntimeException("Email is already registered!");
        }

        if (Role.JOB_SEEKER.name().equalsIgnoreCase(registerRequestDTO.getRole())) {
            JobSeeker jobSeeker = new JobSeeker();
            jobSeeker.setName(registerRequestDTO.getName());
            jobSeeker.setEmail(registerRequestDTO.getEmail());
            jobSeeker.setPassword(passwordEncoder.encode(registerRequestDTO.getPassword()));
            jobSeeker.setRole(Role.JOB_SEEKER);
            jobSeekerRepository.save(jobSeeker);
        } else if (Role.EMPLOYER.name().equalsIgnoreCase(registerRequestDTO.getRole())) {
            Employer employer = new Employer();
            employer.setName(registerRequestDTO.getName());
            employer.setEmail(registerRequestDTO.getEmail());
            employer.setPassword(passwordEncoder.encode(registerRequestDTO.getPassword()));
            employer.setRole(Role.EMPLOYER);
            employer.setCompanyName(registerRequestDTO.getCompanyName());
            employerRepository.save(employer);
        } else {
            throw new RuntimeException("Invalid role specified!");
        }
        return "User registered successfully!";
    }

    @Override
    public AuthResponseDTO loginUser(LoginRequestDTO loginRequestDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDTO.getEmail(),
                        loginRequestDTO.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserData user = (UserData) userDataRepository.findByEmail(loginRequestDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found!"));

        String token = jwtTokenProvider.generateToken(authentication);

        return new AuthResponseDTO(token, user.getId(), user.getEmail(), user.getRole().name());
    }
}