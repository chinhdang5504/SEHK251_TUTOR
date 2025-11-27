package com.example.tutor_demo.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "student_profile")
public class StudentProfile {

    @Id
    @Column(name = "student_id", length = 50)
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

    // Trường riêng của Student
    @Column(name = "faculty", length = 100)
    private String faculty;

    @ElementCollection
    @CollectionTable(
        name = "improvement_subjects",
        joinColumns = @JoinColumn(name = "student_id")
    )
    @Column(name = "subject")
    private List<String> improvementSubjects;

    // Constructors
    public StudentProfile() {}

    public StudentProfile(
            String id,
            String fullName,
            String email,
            String avatar,
            String phone,
            String address,
            LocalDate dateOfBirth,
            String sex,
            String faculty,
            List<String> improvementSubjects
    ) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.avatar = avatar;
        this.phone = phone;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
        this.sex = sex;
        this.faculty = faculty;
        this.improvementSubjects = improvementSubjects;
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getSex() { return sex; }
    public void setSex(String sex) { this.sex = sex; }

    public String getFaculty() { return faculty; }
    public void setFaculty(String faculty) { this.faculty = faculty; }

    public List<String> getImprovementSubjects() { return improvementSubjects; }
    public void setImprovementSubjects(List<String> improvementSubjects) {
        this.improvementSubjects = improvementSubjects;
    }
}
