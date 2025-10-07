package org.example.careercrafter.CareerCrafter.entitiy;
import jakarta.persistence.*;
import org.example.careercrafter.CareerCrafter.entitiy.enums.EmploymentType;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class JobListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employer_id", nullable = false)
    private Employer employer;

    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String location;

    @Enumerated(EnumType.STRING)
    private EmploymentType employmentType; // Full-time / Part-time / Contract

    private Double salary;

    private String industry;

    @Column(columnDefinition = "json")
    private String[] skillsRequired;

    private LocalDateTime postedAt;
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "jobListing", cascade = CascadeType.ALL)
    private List<Application> applications;

    @PrePersist
    protected void onCreate() {
        postedAt = LocalDateTime.now();
        updatedAt = postedAt;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

