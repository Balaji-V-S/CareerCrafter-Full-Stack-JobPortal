package org.example.careercrafter.CareerCrafter.service;

import org.example.careercrafter.CareerCrafter.dto.EmployerDTO;
import org.example.careercrafter.CareerCrafter.entity.Employer;
import org.example.careercrafter.CareerCrafter.utility.UserMapper;
import org.example.careercrafter.CareerCrafter.repository.EmployerRepository;
import org.example.careercrafter.CareerCrafter.service.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployerServiceImpl implements EmployerService {

    @Autowired private EmployerRepository employerRepository;
    @Autowired private UserMapper userMapper;

    @Override
    public EmployerDTO getProfile(String employerEmail) {
        Employer employer = employerRepository.findByEmail(employerEmail)
                .orElseThrow(() -> new RuntimeException("Employer not found!"));
        return userMapper.toEmployerDTO(employer);
    }

    @Override
    public EmployerDTO updateProfile(String employerEmail, EmployerDTO profileDTO) {
        Employer employer = employerRepository.findByEmail(employerEmail)
                .orElseThrow(() -> new RuntimeException("Employer not found!"));

        employer.setName(profileDTO.getName());
        employer.setCompanyName(profileDTO.getCompanyName());
        employer.setCompanyDesc(profileDTO.getCompanyDesc());
        employer.setWebsite(profileDTO.getWebsite());

        Employer updatedEmployer = employerRepository.save(employer);
        return userMapper.toEmployerDTO(updatedEmployer);
    }
}