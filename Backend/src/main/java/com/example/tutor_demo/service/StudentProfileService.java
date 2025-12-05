package com.example.tutor_demo.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.tutor_demo.dto.StudentProfileDto;
import com.example.tutor_demo.entity.Student;
import com.example.tutor_demo.repository.StudentProfileRepo;



import java.util.List;
@Service
public class StudentProfileService {

    private final StudentProfileRepo profileRepo;

    public StudentProfileService(StudentProfileRepo profileRepo) {
        this.profileRepo = profileRepo;
    }

    public StudentProfileDto getStudentProfile(String studentId) {

        // Lấy phần data from DB (improvementSubjects + faculty)
        Student profile = profileRepo.findById(studentId).orElse(null);
        if (profile == null) return null;

        // Lấy thông tin cá nhân từ SSO trong token
        // (ví dụ token chứa các claim email, name,…)
        // Nếu token KHÔNG chứa => bạn phải gọi SSO server
        String fullName = profile.getFullName(); // sync từ SSO
        String email = profile.getEmail();
        String phone = profile.getPhone();
        String address = profile.getAddress();
        String avatar = profile.getAvatar();

        StudentProfileDto dto = new StudentProfileDto();
        dto.setId(studentId);
        dto.setFullName(fullName);
        dto.setEmail(email);
        dto.setPhone(phone);
        dto.setAddress(address);
        dto.setDateOfBirth(profile.getDateOfBirth());
        dto.setSex(profile.getSex());
        dto.setFaculty(profile.getFaculty());

        dto.setImprovementSubjects(
                profile.getImprovementSubjects()   // List<String>
        );

        dto.setAvatar(avatar);

        return dto;
    }

     public StudentProfileDto getStudentProfileByName(String studentName) {

        // Lấy phần data from DB (improvementSubjects + faculty)
        Student profile = profileRepo.findByUsername(studentName);
        if (profile == null) return null;

        // Lấy thông tin cá nhân từ SSO trong token
        // (ví dụ token chứa các claim email, name,…)
        // Nếu token KHÔNG chứa => bạn phải gọi SSO server
        String fullName = profile.getFullName(); // sync từ SSO
        String email = profile.getEmail();
        String phone = profile.getPhone();
        String address = profile.getAddress();
        String avatar = profile.getAvatar();

        StudentProfileDto dto = new StudentProfileDto();
        dto.setId(profile.getId());
        dto.setFullName(fullName);
        dto.setEmail(email);
        dto.setPhone(phone);
        dto.setAddress(address);
        dto.setDateOfBirth(profile.getDateOfBirth());
        dto.setSex(profile.getSex());
        dto.setFaculty(profile.getFaculty());

        dto.setImprovementSubjects(
                profile.getImprovementSubjects()   // List<String>
        );

        dto.setAvatar(avatar);

        return dto;
    }
    @Transactional
    public Student updateImprovementSubjects(String studentId, List<String> subjects) {
        return null;
    }

    public StudentProfileDto toDto(Student profile) {
        StudentProfileDto dto = new StudentProfileDto();
        dto.setId(profile.getId());
        dto.setFullName(profile.getFullName());
        dto.setEmail(profile.getEmail());
        dto.setPhone(profile.getPhone());
        dto.setAddress(profile.getAddress());
        dto.setDateOfBirth(profile.getDateOfBirth());
        dto.setSex(profile.getSex());
        dto.setFaculty(profile.getFaculty());
        dto.setImprovementSubjects(profile.getImprovementSubjects());
        dto.setAvatar(profile.getAvatar());
        return dto;
    }
}
