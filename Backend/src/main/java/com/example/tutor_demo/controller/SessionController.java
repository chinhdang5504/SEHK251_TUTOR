package com.example.tutor_demo.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import com.example.tutor_demo.service.*;

import lombok.RequiredArgsConstructor;

import com.example.tutor_demo.dto.*;

@RestController
@RequiredArgsConstructor
public class SessionController {
   private final SessionManagementService sessionManagementService;
   @GetMapping("/sessions/public")
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
}
