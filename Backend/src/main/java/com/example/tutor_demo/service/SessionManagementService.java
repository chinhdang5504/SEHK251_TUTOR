package com.example.tutor_demo.service;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.tutor_demo.repository.RegisteredStudentRepo;
import com.example.tutor_demo.repository.SessionRepo;
import lombok.RequiredArgsConstructor;
import java.util.*;
import java.util.stream.Collectors;
import java.time.*;


import javax.management.RuntimeErrorException;

import com.example.tutor_demo.dto.PaginatedData;
import com.example.tutor_demo.dto.RegisteredStudentDto;
import com.example.tutor_demo.dto.SessionDataDto;
import com.example.tutor_demo.dto.StudentSessionDto;
import com.example.tutor_demo.entity.RegisteredStudent;
import com.example.tutor_demo.entity.Session;

@Service
@RequiredArgsConstructor
public class SessionManagementService {
    private final SessionRepo sessionRepo;
    private final RegisteredStudentRepo registeredStudentRepo;
    private SessionDataDto mapToDto(Session s) {
        SessionDataDto dto = new SessionDataDto();
        dto.setId(s.getId());
        dto.setTitle(s.getTitle());
        dto.setDescription(s.getDescription());
        dto.setTutorId(s.getTutorId());
        dto.setTutorName(s.getTutorName());
        dto.setDate(s.getDate());
        dto.setStartTime(s.getStartTime());
        dto.setEndTime(s.getEndTime());
        dto.setRoom(s.getRoom());
        dto.setCurrentEnrollment(s.getCurrentEnrollment());
        dto.setCapacity(s.getMaxCapacity());
        dto.setStatus(s.getStatus());
        // enrolled sẽ set sau tùy student
        return dto;
    }

    public List<SessionDataDto> getSession(String tutorId){
        List<Session> session = sessionRepo.findByTutorId(tutorId);
        return session.stream().map(this::mapToDto).toList();
    }
    
    public SessionDataDto getSessionDetailedInfo(String sessionID){
        var queryResult = sessionRepo.findById(sessionID).orElseThrow(() ->new RuntimeErrorException(null, sessionID));
        return mapToDto(queryResult);
    }

    public PaginatedData<RegisteredStudentDto> getRegisteredStudents(String sessionId, int page, int limit) {
        Session session = sessionRepo.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<RegisteredStudent> rsPage = registeredStudentRepo.findBySession(session, pageable);

        List<RegisteredStudentDto> dtoList = rsPage.getContent()
                .stream()
                .map(RegisteredStudentDto::new)
                .collect(Collectors.toList());

        return new PaginatedData<RegisteredStudentDto>(dtoList,(int)rsPage.getTotalElements(), page, rsPage.getTotalPages(), limit);
    }

    public Page<StudentSessionDto> getRegisteredSessionByStudent(
        String studentId, int page, int limit, String date, String startDate, String endDate) {

        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<RegisteredStudent> rsPage;

        if ((startDate == null || startDate.isBlank()) && (endDate == null || endDate.isBlank())) {
            rsPage = registeredStudentRepo.findByStudentId(studentId, pageable);
        } else if (date != null && !date.isBlank()) {
            LocalDate sessionDate = LocalDate.parse(date);
            rsPage = registeredStudentRepo.findByStudentIdAndSessionDate(studentId, sessionDate, pageable);
        } else {
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);
            rsPage = registeredStudentRepo.findByStudentIdAndSessionDateBetween(studentId, start, end, pageable);
        }

        return rsPage.map(rs -> {
            Session s = rs.getSession();
            return new StudentSessionDto(s, true);
        });
    }

    public Page<SessionDataDto> getPublicSessions(int page, int limit, 
                                                    String dateStr, String startDateStr, String endDateStr) {
        Pageable pageable = PageRequest.of(page - 1, limit);

        Page<Session> sessions;

        if (dateStr != null) {
            LocalDate date = LocalDate.parse(dateStr);
            sessions = sessionRepo.findByDate(date, pageable);
        } else if (startDateStr != null && endDateStr != null) {
            LocalDate startDate = LocalDate.parse(startDateStr);
            LocalDate endDate = LocalDate.parse(endDateStr);
            sessions = sessionRepo.findByDateBetween(startDate, endDate, pageable);
        } else {
            sessions = sessionRepo.findAll(pageable);
        }

        return sessions.map(rs -> {
            return mapToDto(rs);
        });
    }

    public Page<SessionDataDto> searchSessions(String keyword, int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);

        Page<Session> result = sessionRepo.searchSessions(keyword, pageable);

        return result.map(s -> mapToDto(s));
    }
}