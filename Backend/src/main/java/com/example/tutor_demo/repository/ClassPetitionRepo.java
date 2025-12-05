package com.example.tutor_demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.tutor_demo.entity.ClassPetitionRequest;

@Repository
public interface ClassPetitionRepo extends JpaRepository<ClassPetitionRequest, String> {
    
}
