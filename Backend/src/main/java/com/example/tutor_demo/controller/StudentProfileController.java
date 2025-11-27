package com.example.tutor_demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import com.example.tutor_demo.entity.*;
import com.example.tutor_demo.dto.*;
import com.example.tutor_demo.service.SessionManagementService;
import com.example.tutor_demo.service.StudentProfileService;
import com.example.tutor_demo.util.JwtUtils;

import jakarta.servlet.http.HttpServletRequest;

import com.example.tutor_demo.dto.UpdateImprovementSubjectReq;
import com.example.tutor_demo.dto.APIResponse;
import com.example.tutor_demo.dto.StudentProfileDto;

@RestController
public class StudentProfileController {

    private final StudentProfileService studentProfileService;
    private final SessionManagementService sessionManagementService;
    
    @Autowired
    public StudentProfileController(StudentProfileService studentProfileService, SessionManagementService sessionManagementService) {
        this.studentProfileService = studentProfileService;
        this.sessionManagementService =sessionManagementService;
    }

    @GetMapping("/api/student/profile")
    public ResponseEntity<APIResponse<StudentProfileDto>> getStudentProfile( HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401)
                    .body(new APIResponse<>(false, 401, "Unauthorized", null));
        }

        String token = authHeader.substring(7);
        String studentId = JwtUtils.extractUserId(token);

        StudentProfileDto profile = studentProfileService.getStudentProfile(studentId);
        if (profile == null) {
            return ResponseEntity.status(404)
                    .body(new APIResponse<>(false, 404, "Student not found", null));
        }

        return ResponseEntity.ok(
                new APIResponse<>(true, 200, "Success", profile)
        );
    }

    @PutMapping("api/student/profile/subjects")
    public ResponseEntity<APIResponse<StudentProfileDto>> updateSubjects(
            @RequestBody UpdateImprovementSubjectReq request,
            HttpServletRequest http
    ) {
        String auth = http.getHeader("Authorization");
        if (auth == null || !auth.startsWith("Bearer ")) {
            return ResponseEntity.status(401)
                    .body(new APIResponse<>(false, 401, "Unauthorized", null));
        }

        String jwt = auth.substring(7);
        String studentId = JwtUtils.extractUserId(jwt);

        StudentProfile updated =
                studentProfileService.updateImprovementSubjects(
                        studentId,
                        request.getSubjects()
                );

        StudentProfileDto dto = studentProfileService.toDto(updated);

        return ResponseEntity.ok(
                new APIResponse<>(true, 200, "Success", dto)
        );
    }

    @GetMapping("/student/sessions")
    public ResponseEntity <APIResponse<Page<StudentSessionDto>>> getRegisteredSessions( @RequestHeader("Authorization") String authHeader,
        @RequestParam(defaultValue = "1") Integer page,
        @RequestParam(defaultValue = "10") Integer limit,
        @RequestParam(required = false) String date,
        @RequestParam(required = false) String startDate,
        @RequestParam(required = false) String endDate){
                // Lấy JWT từ header
        String token = authHeader.replace("Bearer ", "");
        String studentId = JwtUtils.extractUserId(token);
         // Gọi service lấy danh sách session
        Page<StudentSessionDto> data = sessionManagementService.getRegisteredSessionByStudent(studentId, page, limit, date, startDate, endDate);

        return ResponseEntity.ok(new APIResponse<>(
                true,
                200,
                "Success",
                data
        ));

        }
    

    public ResponseEntity<APIResponse<String>> canccelSession(){
        return ResponseEntity.status(400).body(new APIResponse<String>(false, 400, "Error occured", null));
    }
}
