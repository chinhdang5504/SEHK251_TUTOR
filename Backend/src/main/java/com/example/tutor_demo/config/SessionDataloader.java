package com.example.tutor_demo.config;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.tutor_demo.entity.enums.*;
import com.example.tutor_demo.entity.*;
import com.example.tutor_demo.repository.*;

import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Configuration
@Transactional
public class SessionDataloader {

    private static final Random RANDOM = new Random();

    @Bean
    public ApplicationRunner seedSessions(SessionRepo sessionRepo) {
        return args -> {
            List<Session> sessions = new ArrayList<>();

            for (int i = 1; i <= 10; i++) {
                String id = "SES" + String.format("%03d", i);
                String title = "Session " + i;
                String description = "Description for session " + i;

                String tutorId = "T000" + ((i % 5) + 1);
                String tutorName = "Tutor " + ((i % 5) + 1);

                LocalDate date = LocalDate.now().plusDays(i);
                LocalTime start = LocalTime.of(8 + (i % 4), 0);
                LocalTime end = start.plusHours(2);

                String room = "Room-" + (100 + i);

                int maxCapacity = 20 + (i % 5) * 5;
                int currentEnrollment = RANDOM.nextInt(maxCapacity + 1);

                SessionStatus status = SessionStatus.values()[RANDOM.nextInt(SessionStatus.values().length)];

                Session session = new Session(
                        id,
                        title,
                        description,
                        tutorId,
                        tutorName,
                        date,
                        start,
                        end,
                        room,
                        currentEnrollment,
                        maxCapacity,
                        status
                );

                sessions.add(session);
            }

            sessionRepo.saveAll(sessions);

            System.out.println("Seeded " + sessions.size() + " sessions into DB.");
        };
    }
}