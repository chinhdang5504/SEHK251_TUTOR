package com.example.tutor_demo.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tutor")
public class Tutor {

    @Id
    @Column(name = "tutor_id", length = 50)
    private String id;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name= "username", nullable = false, length = 50, unique = true)
    private String username;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "avatar", nullable = true, length = 255)
    private String avatar;

    @Column(name = "phone", length = 20)
    private String phone;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "sex", length = 10)
    private String sex;

    @Column(name = "bio", length = 100)
    private String bio;

    @ElementCollection
    @CollectionTable(
        name = "teachingSubjects",
        joinColumns = @JoinColumn(name = "id")
    )
    @Column(name = "subject")
    private List<String> teachingSubjects;

    @Column(name = "rating")
    private Float rating;

    // Constructor thủ công
    public Tutor() {}
    public Tutor(String tutor_id, String fullName, String username, String email,
                        String avatar, String phone, String address,
                        LocalDate dateOfBirth, String sex, String bio,
                        List<String> teachingSubjects, Float rating) {
        this.id = tutor_id;
        this.fullName = fullName;
        this.username = username;
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

    // Getter/Setter thủ công hoặc dùng Lombok nếu muốn
    public String getId() { return id; }
    public String getFullName() { return fullName; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getAvatar() { return avatar; }
    public String getPhone() { return phone; }
    public String getAddress() { return address; }
    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public String getSex() { return sex; }
    public String getBio() { return bio; }
    public List<String> getTeachingSubjects() { return teachingSubjects; }
    public Float getRating() { return rating; }

    public void setFullName(String fullName) { this.fullName = fullName; }
    public void setUsername(String username) { this.username = username; }
    public void setEmail(String email) { this.email = email; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setAddress(String address) { this.address = address; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    public void setSex(String sex) { this.sex = sex; }
    public void setBio(String bio) { this.bio = bio; }
    public void setTeachingSubjects(List<String> teachingSubjects) { this.teachingSubjects = teachingSubjects; }
    public void setRating(Float rating) { this.rating = rating; }
}
