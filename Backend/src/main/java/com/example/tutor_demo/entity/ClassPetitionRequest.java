package com.example.tutor_demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "class_petition_requests")
@Getter
@Setter
public class ClassPetitionRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id; // ID tự sinh cho mỗi yêu cầu

    @Column(name = "tutor_id", nullable = false, length = 50)
    private String tutorId;

    @Column(name = "subject_name", nullable = false, length = 100)
    private String subjectName;

    @Column(name = "desired_date", nullable = false)
    private LocalDate desiredDate;

    @Column(name = "note", length = 500)
    private String note;

    // Constructors
    public ClassPetitionRequest() {}

    public ClassPetitionRequest(String tutorId, String subjectName, LocalDate desiredDate, String note) {
        this.tutorId = tutorId;
        this.subjectName = subjectName;
        this.desiredDate = desiredDate;
        this.note = note;
    }
}
