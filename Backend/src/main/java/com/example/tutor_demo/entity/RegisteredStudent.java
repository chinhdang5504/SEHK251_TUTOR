package com.example.tutor_demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "registered_students")
@Getter
@Setter
public class RegisteredStudent {

    @Id
    @Column(name = "id", length = 50)
    private String id; // ID riêng của bản ghi đăng ký

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private Session session; // Tham chiếu tới Session.id

    @Column(name = "student_id", nullable = false, length = 50)
    private String studentId;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "faculty", length = 100)
    private String faculty;

    @Column(name = "enrolled_at", nullable = false)
    private LocalDateTime enrolledAt;

    // Constructors
    public RegisteredStudent() {}

    public RegisteredStudent(String id, Session session, String studentId,
                             String fullName, String email, String faculty,
                             LocalDateTime enrolledAt) {
        this.id = id;
        this.session = session;
        this.studentId = studentId;
        this.fullName = fullName;
        this.email = email;
        this.faculty = faculty;
        this.enrolledAt = enrolledAt;
    }
}
