package org.example.careercrafter.CareerCrafter.entitiy;
import jakarta.persistence.*;
import lombok.*;
import org.example.careercrafter.CareerCrafter.entitiy.enums.ApplicationStatus;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "job_seeker_id", nullable = false)
    private JobSeeker jobSeeker;

    @ManyToOne
    @JoinColumn(name = "job_listing_id", nullable = false)
    private JobListing jobListing;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status; // APPLIED, REVIEWED, REJECTED, HIRED

    private LocalDateTime appliedAt;

    @PrePersist
    protected void onApply() {
        appliedAt = LocalDateTime.now();
        status = ApplicationStatus.APPLIED;
    }
}
