package org.example.careercrafter.CareerCrafter.service;

import org.example.careercrafter.CareerCrafter.dto.JobSeekerProfileDTO;
import org.example.careercrafter.CareerCrafter.entity.JobSeeker;
import org.example.careercrafter.CareerCrafter.utility.UserMapper;
import org.example.careercrafter.CareerCrafter.repository.JobSeekerRepository;
import org.example.careercrafter.CareerCrafter.service.JobSeekerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class JobSeekerServiceImpl implements JobSeekerService {

    @Autowired private JobSeekerRepository jobSeekerRepository;
    @Autowired private UserMapper userMapper;

    @Override
    public JobSeekerProfileDTO getProfile(String jobSeekerEmail) {
        JobSeeker jobSeeker = jobSeekerRepository.findByEmail(jobSeekerEmail)
                .orElseThrow(() -> new RuntimeException("Job Seeker not found!"));
        return userMapper.toJobSeekerProfileDTO(jobSeeker);
    }

    @Override
    public JobSeekerProfileDTO updateProfile(String jobSeekerEmail, JobSeekerProfileDTO profileDTO) {
        JobSeeker jobSeeker = jobSeekerRepository.findByEmail(jobSeekerEmail)
                .orElseThrow(() -> new RuntimeException("Job Seeker not found!"));

        jobSeeker.setName(profileDTO.getName());
        jobSeeker.setPhone(profileDTO.getPhone());
        jobSeeker.setAddress(profileDTO.getAddress());
        jobSeeker.setSkills(profileDTO.getSkills());
        jobSeeker.setEducation(profileDTO.getEducation());
        jobSeeker.setWorkExperience(profileDTO.getWorkExperience());
        jobSeeker.setCoCurricularDetails(profileDTO.getCoCurricularDetails());

        JobSeeker updatedSeeker = jobSeekerRepository.save(jobSeeker);
        return userMapper.toJobSeekerProfileDTO(updatedSeeker);
    }

    @Override
    public String updateResume(String jobSeekerEmail, MultipartFile resumeFile) {
        JobSeeker jobSeeker = jobSeekerRepository.findByEmail(jobSeekerEmail)
                .orElseThrow(() -> new RuntimeException("Job Seeker not found!"));
        try {
            jobSeeker.setResume(resumeFile.getBytes());
            jobSeekerRepository.save(jobSeeker);
            return "Resume uploaded successfully.";
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload resume.", e);
        }
    }
}