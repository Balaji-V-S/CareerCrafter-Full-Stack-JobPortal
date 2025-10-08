package org.example.careercrafter.CareerCrafter.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ApplicationResponseDTO {
    private Long id;
    private String status;
    private LocalDateTime appliedAt;

    private JobSeekerInfo jobSeeker;
    private JobListingInfo jobListing;

    @Data
    public static class JobSeekerInfo {
        private Long id;
        private String name;
        private String email;
    }

    @Data
    public static class JobListingInfo {
        private Long id;
        private String title;
        private String companyName;
    }
}