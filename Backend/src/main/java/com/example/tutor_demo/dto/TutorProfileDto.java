package com.example.tutor_demo.dto;

import java.time.LocalDate;
import java.util.List;

import com.example.tutor_demo.entity.TutorProfile;
public class TutorProfileDto {
    private String id;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String avatar;
    private String bio;
    private List<String> teachingSubjects;
    private String sex;
    private Float rating;
    private LocalDate dateOfBirth;

    public TutorProfileDto(){}
    public TutorProfileDto(TutorProfile profile) {
        this.id = profile.getId();
        this.fullName = profile.getFullName();
        this.email = profile.getEmail();
        this.phone = profile.getPhone();
        this.address = profile.getAddress();
        this.avatar = profile.getAvatar();
        this.bio = profile.getBio();
        this.teachingSubjects = profile.getTeachingSubjects();
        this.sex = profile.getSex();
        this.rating = profile.getRating();
        this.dateOfBirth = profile.getDateOfBirth();
    }
    // just getters only
    public String getId() {
        return id;
    }
    public String getFullName() {
        return fullName;
    }
    public String getEmail() {
        return email;
    }
    public String getPhone() {
        return phone;
    }
    public String getAddress() {
        return address;
    }
    public String getAvatar() {
        return avatar;
    }
    public String getBio() {
        return bio;
    }
    public List<String> getTeachingSubjects() {
        return teachingSubjects;
    }
    public String getSex() {
        return sex;
    }
    public Float getRating() {
        return rating;
    }
    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    // setters
    public void setId(String id) {
        this.id = id;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
    public void setBio(String bio) {
        this.bio = bio;
    }
    public void setTeachingSubjects(List<String> teachingSubjects) {
        this.teachingSubjects = teachingSubjects;
    }
    
    public void setSex(String sex) {
        this.sex = sex;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    
}
