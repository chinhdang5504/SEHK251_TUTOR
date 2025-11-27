package com.example.tutor_demo.dto;

import java.time.LocalTime;
import java.time.LocalDate;

import com.example.tutor_demo.entity.Session;
import com.example.tutor_demo.entity.enums.*;
public class SessionDataDto {

    private String id;
    private LocalTime startTime;
    private LocalTime endTime;
    private int capacity;
    private int currentEnrollment;
    private String title;
    private String tutorId;
    private String tutorName;
    private LocalDate date;
    private String room;
    private SessionStatus status;
    private boolean enrolled;
    private String description;

    public SessionDataDto() {}

    // GETTERS

    public String getId() {
        return id;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public int getCapacity() {
        return capacity;
    }

    public int getCurrentEnrollment() {
        return currentEnrollment;
    }

    public String getTitle() {
        return title;
    }

    public String getTutorId() {
        return tutorId;
    }

    public String getTutorName() {
        return tutorName;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getRoom() {
        return room;
    }

    public SessionStatus getStatus() {
        return status;
    }

    public boolean isEnrolled() {
        return enrolled;
    }

    public String getDescription() {
        return description;
    }

    // SETTERS

    public void setId(String id) {
        this.id = id;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public void setCurrentEnrollment(int currentEnrollment) {
        this.currentEnrollment = currentEnrollment;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setTutorId(String tutorId) {
        this.tutorId = tutorId;
    }

    public void setTutorName(String tutorName) {
        this.tutorName = tutorName;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public void setStatus(SessionStatus status) {
        this.status = status;
    }

    public void setEnrolled(boolean enrolled) {
        this.enrolled = enrolled;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
