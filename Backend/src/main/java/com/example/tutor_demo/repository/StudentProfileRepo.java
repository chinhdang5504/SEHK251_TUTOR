package com.example.tutor_demo.repository;


import org.springframework.stereotype.Repository;

import com.example.tutor_demo.entity.Student;
import com.example.tutor_demo.config.*;
import java.util.List;
@Repository
// This is a placeholder for the repository interface/class for StudentProfile entity
public class StudentProfileRepo  { 
    private static List<Student> students = ApplicationInitializationConfig.generatesStudents();
    public Student findByUsername(String username){
        for(Student s : students){
            if(s.getUsername().equals(username)){
                return s;
            }
        }
        return null;
    }

    public java.util.Optional<Student> findById(String studentId){
        for(Student s : students){
            if(s.getId().equals(studentId)){
                return java.util.Optional.of(s);
            }
        }
        return java.util.Optional.empty();
    }
}
