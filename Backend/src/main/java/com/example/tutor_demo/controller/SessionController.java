package com.example.tutor_demo.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import com.example.tutor_demo.service.*;

import com.example.tutor_demo.dto.*;

@RestController

public class SessionController {
   private final SessionManagementService sessionManagementService;

   @Autowired
   public SessionController(SessionManagementService service){
        this.sessionManagementService = service;
   }
   @GetMapping("/api/sessions/public")
    public ResponseEntity<APIResponse<PaginatedData<SessionDataDto>>> getPublicSessions(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer limit,
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {

        Page<SessionDataDto> sessionPage = sessionManagementService.getPublicSessions(page, limit, date, startDate, endDate);

        PaginatedData<SessionDataDto> data = new PaginatedData<>(
                sessionPage.getContent(),
                (int)sessionPage.getTotalElements(),
                page,
                sessionPage.getTotalPages(),
                limit
        );

        return ResponseEntity.ok(new APIResponse<>(true, 200, "Success", data));
    }
    
     @GetMapping("/api/session/search")
    public ResponseEntity<APIResponse<PaginatedData<SessionDataDto>>> searchSessions(
            @RequestParam(name = "q") String keyword,
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer limit) {

        Page<SessionDataDto> dtoPage = sessionManagementService.searchSessions(keyword, page, limit);

        PaginatedData<SessionDataDto> data = new PaginatedData<>(
                dtoPage.getContent(),
               (int)dtoPage.getTotalElements(),
                dtoPage.getNumber() + 1,
                dtoPage.getTotalPages(),
                dtoPage.getSize()
        );

        APIResponse<PaginatedData<SessionDataDto>> response =
                new APIResponse<>(true, 200, "Success", data);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/sessions/{sessionId}/enroll")
    public ResponseEntity<APIResponse<Object>> enrollSession(@PathVariable String sessionId){
        return ResponseEntity.status(400).body(new APIResponse<>(false, 400, "Error Occured", null));
    }
}
