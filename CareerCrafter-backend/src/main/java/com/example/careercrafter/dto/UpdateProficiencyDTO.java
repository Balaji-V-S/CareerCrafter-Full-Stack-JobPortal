package com.example.careercrafter.dto;
import com.example.careercrafter.entities.enums.ProficiencyLevel;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateProficiencyDTO
{
    @NotNull(message = "Proficiency level is required")
    private ProficiencyLevel proficiencyLevel;
}
