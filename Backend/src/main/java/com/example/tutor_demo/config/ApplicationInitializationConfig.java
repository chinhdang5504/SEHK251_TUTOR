package com.example.tutor_demo.config;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import com.example.tutor_demo.entity.*;
import com.example.tutor_demo.repository.*;

import java.time.LocalDate;
import java.util.*;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitializationConfig {

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    static final String ADMIN_USER_NAME = "admin";
    static final String ADMIN_PASSWORD = "admin";

    @Bean
    @ConditionalOnProperty(name="app.init-admin-user", havingValue="true", matchIfMissing=true)
    @Transactional
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepo roleRepository) {
        return args -> {

            // Kiểm tra nếu admin đã tồn tại thì skip
            if (userRepository.findByUsername(ADMIN_USER_NAME).isPresent()) {
                log.info("Admin user already exists. Skipping initialization.");
                return;
            }

            log.info("Initializing roles and users...");

            // Tạo tất cả roles nếu chưa có
            Map<String, Role> rolesMap = new HashMap<>();
            String[] roleNames = {"ADMIN", "USER", "STUDENT", "TUTOR", "HEADER", "MANAGER", "COORDINATOR"};
            for (String roleName : roleNames) {
                Role role = roleRepository.findById(roleName)
                        .orElseGet(() -> roleRepository.save(
                                Role.builder()
                                        .name(roleName)
                                        .description(roleName + " role")
                                        .build()
                        ));
                rolesMap.put(roleName, role);
            }

            // --- Tạo Admin ---
            User adminUser = User.builder()
                    .username(ADMIN_USER_NAME)
                    .password(passwordEncoder.encode(ADMIN_PASSWORD))
                    .fullName("Administrator")
                    .email("admin@hcmut.edu.vn")
                    .role("ADMIN")
                    .build();
            userRepository.save(adminUser);
            log.warn("Admin user created with default password 'admin'. Please change it!");

            // --- Tạo 5 Students ---
            for (int i = 1; i <= 5; i++) {
                String username = "student" + i;
                User student = User.builder()
                        .username(username)
                        .password(passwordEncoder.encode("password"))
                        .fullName(username)
                        .email(username + "@hcmut.edu.vn")
                        .role("student")
                        .build();
                userRepository.save(student);
            }

            // --- Tạo 5 Tutors ---
            for (int i = 1; i <= 5; i++) {
                String username = "tutor" + i;
                User tutor = User.builder()
                        .username(username)
                        .password(passwordEncoder.encode("password"))
                        .fullName(username)
                        .email(username + "@hcmut.edu.vn")
                        .role("tutor")
                        .build();
                userRepository.save(tutor);
            }

            // --- Header, Manager, Coordinator ---
            User header = User.builder()
                    .username("header")
                    .password(passwordEncoder.encode("password"))
                    .fullName("Header User")
                    .email("header@hcmut.edu.vn")
                    .role("header")
                    .build();
            userRepository.save(header);

            User manager = User.builder()
                    .username("manager")
                    .password(passwordEncoder.encode("password"))
                    .fullName("Manager User")
                    .email("manager@hcmut.edu.vn")
                    .role("manager")
                    .build();
            userRepository.save(manager);

            User coordinator = User.builder()
                    .username("coordinator")
                    .password(passwordEncoder.encode("password"))
                    .fullName("Coordinator User")
                    .email("coordinator@hcmut.edu.vn")
                    .role("coordinator")
                    .build();
            userRepository.save(coordinator);

            log.info("Application initialization completed successfully.");
        };
    }

     @Bean
    @Transactional
    public ApplicationRunner generateSampleData(
            StudentProfileRepo studentRepo,
            TutorProfileRepo tutorRepo
    ) {
        return args -> {
            // Tạo 5 Student
            for (int i = 1; i <= 5; i++) {
                Student student = new Student(
                        "student" + i,
                        "Student " + i,
                        "student" + i + "@example.com",
                        null,
                        "090000000" + i,
                        "District " + i,
                        LocalDate.of(2005, 5, i), // bạn có thể viết method này trả LocalDate
                        i % 2 == 0 ? "Male" : "Female",
                        "Computer Science and Engineering",
                        List.of("Math", "Physics", "English")
                );
                studentRepo.save(student);
            }

            // Tạo 5 Tutor
            for (int i = 1; i <= 5; i++) {
                Tutor tutor = new Tutor(
                        "Tutor " + i,
                        "tutor" + i,
                        "tutor" + i + "@example.com",
                        null,
                        "090000000" + i,
                        "District " + i,
                        LocalDate.of(2005, 5, i),
                        i % 2 == 0 ? "Male" : "Female",
                        "Bio for tutor " + i,
                        List.of("Math", "Physics", "Computer Science"),
                        4.0f + i * 0.1f
                );
                tutorRepo.save(tutor);
            }
        };
    }
}
