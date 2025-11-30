package com.example.tutor_demo.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "student")
public class Student {

    @Id
    @Column(name = "student_id", length = 50)
    private String student_id;

    @Column(name= "username", nullable = false, length = 50, unique = true)
    private String username;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

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

    @Column(name = "faculty", length = 100)
    private String faculty;

    @ElementCollection
    @CollectionTable(
        name = "improvement_subjects",
        joinColumns = @JoinColumn(name = "student_id")
    )
    @Column(name = "subject")
    private List<String> improvementSubjects;

    @Column(name = "used_page")// trường này do hilbernate không sửa được schema trong db nên tạo tạm để tránh lỗi (do student có trước đó và không xoá được)
    private Integer usedPage = 0;

    // Constructor thủ công
    public Student() {}
    public Student(String student_id, String username, String fullName, String email,
                          String avatar, String phone, String address,
                          LocalDate dateOfBirth, String sex, String faculty,
                          List<String> improvementSubjects) {
        this.student_id = student_id;
        this.username = username;
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

    // Getter/Setter
    public String getId() { return student_id; }
    public String getUsername() { return username; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getAvatar() { return avatar; }
    public String getPhone() { return phone; }
    public String getAddress() { return address; }
    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public String getSex() { return sex; }
    public String getFaculty() { return faculty; }
    public List<String> getImprovementSubjects() { return improvementSubjects; }

    public void setUsername(String username) { this.username = username; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public void setEmail(String email) { this.email = email; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setAddress(String address) { this.address = address; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    public void setSex(String sex) { this.sex = sex; }
    public void setFaculty(String faculty) { this.faculty = faculty; }
    public void setImprovementSubjects(List<String> improvementSubjects) { this.improvementSubjects = improvementSubjects; }

}
