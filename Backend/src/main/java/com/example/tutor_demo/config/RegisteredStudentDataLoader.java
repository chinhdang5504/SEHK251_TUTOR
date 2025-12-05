package com.example.tutor_demo.config;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.tutor_demo.entity.RegisteredStudent;
import com.example.tutor_demo.entity.Session;
import com.example.tutor_demo.repository.RegisteredStudentRepo;
import com.example.tutor_demo.repository.SessionRepo;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Configuration
public class RegisteredStudentDataLoader {

    private static final Random RANDOM = new Random();

    @Bean
    public ApplicationRunner seedRegisteredStudents(
            RegisteredStudentRepo registeredStudentRepo,
            SessionRepo sessionRepo // dùng để lấy session có sẵn
    ) {
        return args -> {

            List<Session> sessions = sessionRepo.findAll();
            List<RegisteredStudent> registrations = new ArrayList<>();

            for (Session session : sessions) {
                // Giả sử mỗi session có 5 sinh viên đăng ký
                for (int i = 1; i <= 5; i++) {
                    String id = session.getId() + "-STU" + i;
                    String studentId = "S000" + i;
                    String fullName = "Student " + i;
                    String email = "student" + i + "@example.com";
                    String faculty = "Computer Science";

                    LocalDateTime enrolledAt = session.getDate()
                            .atTime(session.getStartTime().minusHours(RANDOM.nextInt(2)))
                            .plusMinutes(RANDOM.nextInt(60));

                    RegisteredStudent reg = new RegisteredStudent(
                            id,
                            session,
                            studentId,
                            fullName,
                            email,
                            faculty,
                            enrolledAt
                    );

                    registrations.add(reg);
                }
            }

            registeredStudentRepo.saveAll(registrations);
            System.out.println("Seeded " + registrations.size() + " registered students into DB.");
        };
    }
}
