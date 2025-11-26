package com.example.tutor_demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

import com.example.tutor_demo.entity.enums.SessionStatus;

@Entity
@Table(name = "sessions")
@Getter
@Setter
public class Session {

    @Id
    @Column(name = "session_id", length = 50)
    private String id;

    @Column(name = "title", nullable = false, length = 150)
    private String title;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "tutor_id", nullable = false, length = 50)
    private String tutorId;

    // Swagger yêu cầu có tutorName => phải lưu
    @Column(name = "tutor_name", nullable = false, length = 100)
    private String tutorName;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "room", nullable = false, length = 50)
    private String room;

    @Column(name = "current_enrollment", nullable = false)
    private Integer currentEnrollment = 0;

    @Column(name = "max_capacity", nullable = false)
    private Integer maxCapacity;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private SessionStatus status;

    // Constructors
    public Session() {}

    public Session(
            String id,
            String title,
            String description,
            String tutorId,
            String tutorName,
            LocalDate date,
            LocalTime startTime,
            LocalTime endTime,
            String room,
            Integer currentEnrollment,
            Integer maxCapacity,
            SessionStatus status
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.tutorId = tutorId;
        this.tutorName = tutorName;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.room = room;
        this.currentEnrollment = currentEnrollment != null ? currentEnrollment : 0;
        this.maxCapacity = maxCapacity;
        this.status = status;
    }
}
