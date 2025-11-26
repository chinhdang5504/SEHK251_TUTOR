package com.example.tutor_demo.repository;

import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import com.example.tutor_demo.entity.Session;

@Repository
public interface SessionRepo extends JpaRepository<Session, String> {

    public List<Session> findByTutorId(String tutorId);
    Page<Session> findByDate(java.time.LocalDate date, Pageable pageable);
    Page<Session> findByDateBetween(LocalDate startDate, LocalDate endDate, Pageable pageable);

}
