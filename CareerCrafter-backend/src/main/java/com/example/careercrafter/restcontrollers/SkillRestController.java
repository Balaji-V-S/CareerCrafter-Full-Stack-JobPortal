package com.example.careercrafter.restcontrollers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.careercrafter.dto.SkillDTO;
import com.example.careercrafter.dto.UpdateProficiencyDTO;
import com.example.careercrafter.entities.Skill;
import com.example.careercrafter.services.ISkillService;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*")
public class SkillRestController {

    @Autowired
    private ISkillService skillService;

    @GetMapping //done
    public ResponseEntity<List<Skill>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @GetMapping("/name/{name}") //done
    public ResponseEntity<List<Skill>> getSkillsByName(@PathVariable String name) {
        return ResponseEntity.ok(skillService.getSkillsByName(name));
    }
    
    @PutMapping("/{id}/proficiency") //done
    public ResponseEntity<String> updateProficiencyLevel(
            @PathVariable int id,
            @Valid @RequestBody UpdateProficiencyDTO dto) {
        skillService.updateProficiencyLevel(id, dto.getProficiencyLevel());
        return ResponseEntity.ok("Proficiency level updated to " + dto.getProficiencyLevel());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSkill(@PathVariable int id) {
        return ResponseEntity.ok(skillService.deleteById(id));
    }
}
