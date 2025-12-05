package com.example.tutor_demo.dto;

import com.example.tutor_demo.entity.Session;
import java.time.LocalDate;
import java.time.LocalTime;

public class StudentSessionDto {
    private String id;
    private String title;
    private String description;
    private String tutorId;
    private String tutorName;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private String room;
    private int currentEnrollment;
    private int maxCapacity;
    private String status;
    private boolean enrolled;

    public StudentSessionDto(Session session, boolean enrolled) {
        this.id = session.getId();
        this.title = session.getTitle();
        this.description = session.getDescription();
        this.tutorId = session.getTutorId();
        this.tutorName = session.getTutorName();
        this.date = session.getDate();
        this.startTime = session.getStartTime();
        this.endTime = session.getEndTime();
        this.room = session.getRoom();
        this.currentEnrollment = session.getCurrentEnrollment();
        this.maxCapacity = session.getMaxCapacity();
        this.status = session.getStatus().name();
        this.enrolled = enrolled;
    }

    // getters only
    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getTutorId() { return tutorId; }
    public String getTutorName() { return tutorName; }
    public LocalDate getDate() { return date; }
    public LocalTime getStartTime() { return startTime; }
    public LocalTime getEndTime() { return endTime; }
    public String getRoom() { return room; }
    public int getCurrentEnrollment() { return currentEnrollment; }
    public int getMaxCapacity() { return maxCapacity; }
    public String getStatus() { return status; }
    public boolean isEnrolled() { return enrolled; }
}
