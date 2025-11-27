package com.example.tutor_demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;

import com.example.tutor_demo.dto.*;
import com.example.tutor_demo.service.TutorProfileService;
import com.example.tutor_demo.util.JwtUtils;

import jakarta.servlet.http.HttpServletRequest;

import com.example.tutor_demo.service.MinutesService;
import com.example.tutor_demo.service.SessionManagementService;

import java.util.*;


@RestController
public class TutorProfileController {
    
    private final TutorProfileService tutorProfileService;
    private final SessionManagementService sessionManagementService;
    private final MinutesService minutesService;
    public TutorProfileController(TutorProfileService tutorProfileService, SessionManagementService sessionManagementService, MinutesService minutesService) {
        this.tutorProfileService = tutorProfileService;
        this.sessionManagementService = sessionManagementService;
        this.minutesService = minutesService;
    }

    @GetMapping("/tutor/profile/{tutorId}")
    public ResponseEntity<APIResponse<TutorProfileDto>> getTutorProfile(@PathVariable String tutorId) {
        TutorProfileDto profile = tutorProfileService.getTutorProfile(tutorId);
        return ResponseEntity.ok(
                new APIResponse<>(true, 200, "Success", profile)
        );
    }

    @GetMapping("/tutor/{tutorId}/session")
    public ResponseEntity<APIResponse<List<SessionDataDto>>> getTutorSessions(@PathVariable String tutorId) {
       var queryRes = sessionManagementService.getSession(tutorId);
       return ResponseEntity.ok(new APIResponse<>(true, 200, "Success", queryRes));
    }

    @GetMapping("/tutor/sessions/{sessionId}")
    public ResponseEntity<APIResponse<SessionDataDto>> getInfoSession(@PathVariable String sesionId) {
       SessionDataDto queryRes = sessionManagementService.getSessionDetailedInfo(sesionId);
       return ResponseEntity.ok(new APIResponse<>(true, 200, "Success", queryRes));
    }

    @GetMapping("/tutor/sessions/{sessionId}/students")
    public ResponseEntity<APIResponse<PaginatedData<RegisteredStudentDto>>> getRegisteredStudents(
            @PathVariable String sessionId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {

        PaginatedData<RegisteredStudentDto> data = sessionManagementService.getRegisteredStudents(sessionId, page, limit);
        return ResponseEntity.ok(new APIResponse<>(true, 200, "Success", data));
    }
    
    @PostMapping(value = "/tutor/sessions/{sessionId}/minutes", consumes = "multipart/form-data")
    public ResponseEntity<APIResponse<SessionMinutesDto>> uploadSessionMinutes( @PathVariable String sessionId,
        @RequestParam("file") MultipartFile file,
        HttpServletRequest request){
            String minutesUrl= minutesService.uploadMinutes(sessionId, file);
            String message = "Minutes uploaded successfully";
            SessionMinutesDto response = new SessionMinutesDto(minutesUrl, message);
            return ResponseEntity.ok(new APIResponse<SessionMinutesDto>(true, 200, "Success", response));
            
    }

    @GetMapping("api/tutor/profile")
    public ResponseEntity<Object> getCurrrentTutorProfile(HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            ErrorResponse<Object> errResponse = new ErrorResponse<>(401, "Validation error", "string", "string", null);
            return ResponseEntity.status(401)
                    .body(errResponse);
        }

        String token = authHeader.substring(7);
        String tutorId = JwtUtils.extractUserId(token);
        TutorProfileDto profile = tutorProfileService.getTutorProfile(tutorId);
        return ResponseEntity.ok(
                new APIResponse<>(true, 200, "Success", profile)
        );
    }
     @PutMapping("/api/tutor/profile/subjects")
    public ResponseEntity<?> updateTeachingSubjects(@RequestBody UpdateImprovementSubjectReq request, @RequestHeader("Authorization") String authHeader){
        ErrorResponse<Object> errResponse = new ErrorResponse<>(400, "Validation error", "string", "string", null);
        return ResponseEntity.status(400).body(errResponse);
    }
}
