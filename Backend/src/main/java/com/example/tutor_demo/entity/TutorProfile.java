package com.example.tutor_demo.entity;

import java.time.LocalDate;
import java.util.List;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tutor_profile")
@Getter
@Setter
public class TutorProfile {
    @Id
    @Column(name = "tutor_id", length = 50)
    private String id;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "avatar", length = 255)
    private String avatar;

    @Column(name = "phone", length = 20)
    private String phone;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "sex", length = 10)
    private String sex;

    // Trường riêng của Tutor
    @Column(name = "bio", length = 100)
    private String bio;

    @ElementCollection
    @CollectionTable(
        name = "teachingSubjects",
        joinColumns = @JoinColumn(name = "tutor_id")
    )
    @Column(name = "subject")
    private List<String> teachingSubjects;

    @Column(name = "rating")
    private Float rating;

    // Constructors
    public TutorProfile() {}
    public TutorProfile(
            String id,
            String fullName,
            String email,
            String avatar,
            String phone,
            String address,
            LocalDate dateOfBirth,
            String sex,
            String bio,
            List<String> teachingSubjects,
            Float rating
    ) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.avatar = avatar;
        this.phone = phone;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
        this.sex = sex;
        this.bio = bio;
        this.teachingSubjects = teachingSubjects;
        this.rating = rating;
    }

}
