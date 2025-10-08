package org.example.careercrafter.CareerCrafter.entity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class JobSeeker extends UserData {

    private String phone;
    private String address;

    @Column(columnDefinition = "json")
    private String[] skills;

    @Column(columnDefinition = "json")
    private String education;

    @Column(columnDefinition = "json")
    private String workExperience;

    @Column(columnDefinition = "json")
    private String CoCurricularDetails;

    @Lob
    private byte[] resume;

    @OneToMany(mappedBy = "jobSeeker", cascade = CascadeType.ALL)
    private List<Application> applications;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Notification> notifications;
}

