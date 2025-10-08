package com.example.careercrafter.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "job_seeker_id")
    private JobSeekerProfile jobSeekerProfile;

    @ManyToOne(optional = false)
    @JoinColumn(name = "job_posting_id")
    private JobPosting jobPosting;

    @Column(name = "application_date", nullable = false)
    private LocalDate applicationDate;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "resume_file_name")
    private String resumeFileName;
}
