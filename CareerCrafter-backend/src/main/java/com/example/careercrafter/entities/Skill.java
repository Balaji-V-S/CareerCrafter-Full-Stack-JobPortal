package com.example.careercrafter.entities;
import com.example.careercrafter.entities.enums.ProficiencyLevel;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "skills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", nullable = false)
    private String name;


    @Enumerated(EnumType.STRING)
    @Column(name = "proficiency_level", nullable = false)
    private ProficiencyLevel proficiencyLevel;


    @ManyToOne(optional = false)
    @JoinColumn(name = "job_seeker_id")
    @JsonIgnore
    private JobSeekerProfile jobSeekerProfile;

    public Skill(String name, ProficiencyLevel proficiencyLevel, JobSeekerProfile jobSeekerProfile) {
        this.name = name;
        this.proficiencyLevel = proficiencyLevel;
        this.jobSeekerProfile = jobSeekerProfile;
    }
}