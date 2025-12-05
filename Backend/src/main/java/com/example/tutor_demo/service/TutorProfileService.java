package com.example.tutor_demo.service;

import org.springframework.stereotype.Service;

import com.example.tutor_demo.dto.TutorProfileDto;
import com.example.tutor_demo.repository.TutorProfileRepo;
import com.example.tutor_demo.entity.Tutor;

@Service
public class TutorProfileService {
    private final TutorProfileRepo tutorProfileRepo;

    public TutorProfileService(TutorProfileRepo tutorProfileRepo) {
        this.tutorProfileRepo = tutorProfileRepo;
    }

    public TutorProfileDto getTutorProfile(String tutorId) {
        // Logic to get tutor profile by tutorId
        Tutor profile = tutorProfileRepo.findById(tutorId).orElse(null);
        if (profile == null) throw new RuntimeException("Tutor profile not found");

        TutorProfileDto dto = new TutorProfileDto();
        dto.setId(tutorId);
        dto.setFullName(profile.getFullName());
        dto.setEmail(profile.getEmail());
        dto.setPhone(profile.getPhone());
        dto.setAddress(profile.getAddress());
        dto.setAvatar(profile.getAvatar());
        dto.setTeachingSubjects(profile.getTeachingSubjects());
        dto.setBio(profile.getBio());
        dto.setRating(profile.getRating());
        dto.setSex(profile.getSex());
        dto.setDateOfBirth(profile.getDateOfBirth());
        return dto;
    }

    public TutorProfileDto getTutorProfileByName(String username) {
        Tutor profile = tutorProfileRepo.findByUsername(username);
        if (profile == null) throw new RuntimeException("Tutor profile not found");

        TutorProfileDto dto = new TutorProfileDto();
        dto.setId(profile.getId());
        dto.setFullName(profile.getFullName());
        dto.setEmail(profile.getEmail());
        dto.setPhone(profile.getPhone());
        dto.setAddress(profile.getAddress());
        dto.setAvatar(profile.getAvatar());
        dto.setTeachingSubjects(profile.getTeachingSubjects());
        dto.setBio(profile.getBio());
        dto.setRating(profile.getRating());
        dto.setSex(profile.getSex());
        dto.setDateOfBirth(profile.getDateOfBirth());
        return dto;
    }
}
