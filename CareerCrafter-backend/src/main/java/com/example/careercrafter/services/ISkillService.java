package com.example.careercrafter.services;

import java.util.List;

import com.example.careercrafter.entities.enums.ProficiencyLevel;
import com.example.careercrafter.entities.Skill;

public interface ISkillService {
    List<Skill> getAllSkills();
    List<Skill> getSkillsByName(String name);
    String deleteById(int id);
    void updateProficiencyLevel(int skillId, ProficiencyLevel level);

}
