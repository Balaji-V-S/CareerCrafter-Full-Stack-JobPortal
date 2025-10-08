package com.example.careercrafter.entities;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@Entity
@Table(name = "job_seeker_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class JobSeekerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "education", nullable = false)
    private String education;

    @Column(name = "experience", nullable = false)
    private String experience;

    @Column(name = "resume", nullable = false)
    private String resume;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @OneToMany(mappedBy = "jobSeekerProfile", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("jobSeekerProfile")
    private List<Skill> skills;

    @OneToMany(mappedBy = "jobSeekerProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Application> applications;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;
}