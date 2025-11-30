package com.example.tutor_demo.repository;

import com.example.tutor_demo.entity.Tutor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorProfileRepo extends JpaRepository<Tutor, String> {

    @Query("""
        SELECT DISTINCT t FROM Tutor t 
        LEFT JOIN t.teachingSubjects s
        WHERE LOWER(t.fullName) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(s) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    Page<Tutor> searchTutors(@Param("keyword") String keyword, Pageable pageable);
    Tutor findByUsername(String username);
}
