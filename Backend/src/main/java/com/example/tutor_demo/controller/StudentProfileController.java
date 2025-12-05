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

@RestController
public class StudentProfileController {

    @Autowired
    private JwtUtils authUtils;

    private final StudentProfileService studentProfileService;
    private final SessionManagementService sessionManagementService;
    
    @Autowired
    public StudentProfileController(StudentProfileService studentProfileService, SessionManagementService sessionManagementService) {
        this.studentProfileService = studentProfileService;
        this.sessionManagementService =sessionManagementService;
    }

    @GetMapping("/api/student/profile")
    public ResponseEntity<APIResponse<StudentProfileDto>> getStudentProfile( HttpServletRequest request) throws Exception {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401)
                    .body(new APIResponse<>(false, 401, "Unauthorized", null));
        }

        String token = authHeader.substring(7);
        String username = authUtils.getUsername(token);

        StudentProfileDto profile = studentProfileService.getStudentProfileByName(username);
        if (profile == null) {
            return ResponseEntity.status(404)
                    .body(new APIResponse<>(false, 404, "Student not found", null));
        }

        return ResponseEntity.ok(
                new APIResponse<>(true, 200, "Success", profile)
        );
    }

    @PutMapping("/api/student/profile/subjects")
    public ResponseEntity<APIResponse<StudentProfileDto>> updateSubjects(
            @RequestBody UpdateImprovementSubjectReq request,
            HttpServletRequest http
    )  throws Exception {
        String auth = http.getHeader("Authorization");
        if (auth == null || !auth.startsWith("Bearer ")) {
            return ResponseEntity.status(401)
                    .body(new APIResponse<>(false, 401, "Unauthorized", null));
        }

        String jwt = auth.substring(7);
        String studentId = authUtils.getUsername(jwt);

        Student updated =
                studentProfileService.updateImprovementSubjects(
                        studentId,
                        request.getSubjects()
                );

        StudentProfileDto dto = studentProfileService.toDto(updated);

        return ResponseEntity.ok(
                new APIResponse<>(true, 200, "Success", dto)
        );
    }

    @GetMapping("/api/student/sessions")
    public ResponseEntity <APIResponse<PaginatedData<StudentSessionDto>>> getRegisteredSessions( @RequestHeader("Authorization") String authHeader,
        @RequestParam(defaultValue = "1") Integer page,
        @RequestParam(defaultValue = "10") Integer limit,
        @RequestParam(required = false) String date,
        @RequestParam(required = false) String startDate,
        @RequestParam(required = false) String endDate) throws Exception {
                // Lấy JWT từ header
        String token = authHeader.replace("Bearer ", "");
        String username = authUtils.getUsername(token);

        // lấy studentid từ việc truy vấn student qua username
        StudentProfileDto profile = studentProfileService.getStudentProfileByName(username);
        String studentId = profile.getId();
         // Gọi service lấy danh sách session
        Page<StudentSessionDto> queryResult = sessionManagementService.getRegisteredSessionByStudent(studentId, page, limit, date, startDate, endDate);

        PaginatedData<StudentSessionDto> data = new PaginatedData<>(
                queryResult.getContent(),
                (int)queryResult.getTotalElements(),
                page,
                queryResult.getTotalPages(),
                limit
        );
        return ResponseEntity.ok(new APIResponse<>(
                true,
                200,
                "Success",
                data
        ));

        }
    
    @PostMapping("/api/student/sessions/{sessionId}/cancel")
    public ResponseEntity<APIResponse<String>> canccelSession(@PathVariable String sessionId){
        return ResponseEntity.status(200).body(new APIResponse<String>(true, 200, "Success", "Session canceled successfully"));     
    }

    @PostMapping("/api/student/sessions/{sessionId}/feedback")
    public ResponseEntity<APIResponse<String>> giveFeedback(@PathVariable String sessionId, @RequestBody FeedbackDataDto feedbackReq){
        return ResponseEntity.status(200).body(new APIResponse<String>(true, 200, "Success", "Feedback submitted successfully"));     
    }

    @PostMapping("/api/student/requests")
    public ResponseEntity<APIResponse<ClassPetitionResponse>> sendRequest(@RequestBody OpenSessionReq requestDto){
        ClassPetitionResponse response = new ClassPetitionResponse("REQ12345", "Request submitted successfully");
        return ResponseEntity.status(200).body(new APIResponse<ClassPetitionResponse>(true, 200, "Success", response));     
    }
}
