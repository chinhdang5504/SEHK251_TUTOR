package com.example.tutor_demo.dto;

import java.time.LocalDateTime;
import com.example.tutor_demo.entity.*;

public class RegisteredStudentDto {
    private String id;
    private String studentId;
    private String fullName;
    private String email;
    private String faculty;
    private LocalDateTime enrolledAt;

    public RegisteredStudentDto() {}

    public RegisteredStudentDto(RegisteredStudent rs) {
        this.id = rs.getId();
        this.studentId = rs.getStudentId();
        this.fullName = rs.getFullName();
        this.email = rs.getEmail();
        this.faculty = rs.getFaculty();
        this.enrolledAt = rs.getEnrolledAt();
    }

    // getters only
    public String getId() { return id; }
    public String getStudentId() { return studentId; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getFaculty() { return faculty; }
    public LocalDateTime getEnrolledAt() { return enrolledAt; }
}
