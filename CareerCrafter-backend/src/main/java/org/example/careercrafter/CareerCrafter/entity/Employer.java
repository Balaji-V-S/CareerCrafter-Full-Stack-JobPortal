package org.example.careercrafter.CareerCrafter.entity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Employer extends UserData {

    private String companyName;
    private String companyDesc;
    private String website;

    @OneToMany(mappedBy = "employer", cascade = CascadeType.ALL)
    private List<JobListing> jobListings;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Notification> notifications;
}
