package com.example.tutor_demo.controller;

import com.example.tutor_demo.dto.APIResponse;
import com.example.tutor_demo.dto.ErrorResponse;
import com.example.tutor_demo.dto.UserInfoDto;
import com.example.tutor_demo.service.UserService;
import com.example.tutor_demo.util.JwtUtils;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class AuthController {

    private final UserService userService;
    private final JwtUtils jwtUtils;
    @Autowired
    public AuthController(UserService userService, JwtUtils jwtUtils) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/api/token")
    public ResponseEntity getToken(HttpServletRequest request) {
        return ResponseEntity.ok(APIResponse.success("Token is valid"));
    }
    
    @GetMapping("/api/me")
    public ResponseEntity getMe(HttpServletRequest request) throws Exception {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.error("Authorization header missing");
            return ResponseEntity.status(401).body(new ErrorResponse<>(401, "Validation error", "string", "string", null));
           
        }
        String token = authHeader.substring(7); // bỏ "Bearer "

        String username = jwtUtils.getUsername(token);
        if (username == null) {
            log.error("Invalid token: username not found");
            return ResponseEntity.status(401).body(new ErrorResponse<>(401, "Validation error", "string", "string", null));
        }

        UserInfoDto user = userService.getUserInfoByUsername(username);

        return ResponseEntity.ok(APIResponse.success(user));
    }
}
