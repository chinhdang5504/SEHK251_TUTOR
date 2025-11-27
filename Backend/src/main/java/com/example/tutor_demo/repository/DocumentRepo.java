package com.example.tutor_demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.tutor_demo.entity.Document;

public interface DocumentRepo extends JpaRepository<Document, Integer> {
    
}
