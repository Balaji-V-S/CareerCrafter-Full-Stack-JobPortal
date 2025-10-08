package com.example.careercrafter.dto;

import com.example.careercrafter.entities.enums.ProficiencyLevel;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SkillDTO 
{

    @NotBlank(message = "Skill name is required")
    private String name;

    private ProficiencyLevel proficiencyLevel;

    @NotNull(message = "Job Seeker ID is required")
    private Integer jobSeekerId;
}

