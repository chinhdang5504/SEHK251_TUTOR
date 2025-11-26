package com.example.tutor_demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.tutor_demo.entity.StudentProfile;

@Repository
// This is a placeholder for the repository interface/class for StudentProfile entity
public interface StudentProfileRepo extends JpaRepository<StudentProfile, String> { 

}
