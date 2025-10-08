package com.example.careercrafter.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "employer_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EmployerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "industry", nullable = false)
    private String industry;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "contact_info", nullable = false)
    private String contactInfo;

    @Column(name = "description")
    private String description;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @OneToMany(mappedBy = "employerProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<JobPosting> jobPostings;
}
