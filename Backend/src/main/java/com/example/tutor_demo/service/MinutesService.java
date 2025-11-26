package com.example.tutor_demo.service;

import java.nio.file.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.config.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.tutor_demo.repository.SessionRepo;
import com.example.tutor_demo.entity.*;

@Service
public class MinutesService {
    @Autowired
    private SessionRepo sessionRepo;

    private final Path uploadDir = Paths.get("uploads/minutes");

    public String uploadMinutes(String sessionId, MultipartFile file) {

        // 1. Validate session
        Session session = sessionRepo.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        // 2. Validate file
        if (file.isEmpty()) {
            throw new RuntimeException("File cannot be empty");
        }

        if (!file.getOriginalFilename().toLowerCase().endsWith(".pdf")) {
            throw new RuntimeException("Only PDF files are allowed");
        }

        try {
            Files.createDirectories(uploadDir);

            // 3. Đặt tên file: minutes_<sessionId>.pdf
            String fileName = "minutes_" + sessionId + ".pdf";
            Path filePath = uploadDir.resolve(fileName);

            // 4. Lưu file
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // 5. Build URL trả về (local)
            String fileUrl = "/files/minutes/" + fileName;

            return fileUrl;

        } catch (Exception e) {
            throw new RuntimeException("Failed to upload file", e);
        }
    }
}
