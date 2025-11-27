package com.example.tutor_demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.tutor_demo.entity.RegisteredStudent;
import com.example.tutor_demo.entity.Session;

@Repository
public interface RegisteredStudentRepo extends JpaRepository<RegisteredStudent, String> {
    // Lấy danh sách session mà student đã đăng ký
    Page<RegisteredStudent> findByStudentId(String studentId, Pageable pageable);

    // lấy danh sách theo session
    Page<RegisteredStudent> findBySession(Session session, Pageable pageable);
    // Filter theo ngày
    Page<RegisteredStudent> findByStudentIdAndSessionDate(String studentId, java.time.LocalDate date, Pageable pageable);

    Page<RegisteredStudent> findByStudentIdAndSessionDateBetween(String studentId, java.time.LocalDate startDate,
                                                                 java.time.LocalDate endDate, Pageable pageable);
}
