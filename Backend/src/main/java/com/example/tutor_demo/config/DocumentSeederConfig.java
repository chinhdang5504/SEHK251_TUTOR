package com.example.tutor_demo.config;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.tutor_demo.entity.Document;
import com.example.tutor_demo.repository.DocumentRepo;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class DocumentSeederConfig {

    @Bean
    public ApplicationRunner seedDocuments(DocumentRepo documentRepository) {
        return args -> {
            // Kiểm tra DB có dữ liệu chưa, tránh insert trùng
            if (documentRepository.count() == 0) {
                List<Document> documents = List.of(
                        new Document(
                                "Java Basics",
                                "Nguyen Van A",
                                "https://example.com/docs/java_basics.pdf",
                                LocalDateTime.now().minusDays(5),
                                "T001"
                        ),
                        new Document(
                                "Spring Boot Guide",
                                "Tran Thi B",
                                "https://example.com/docs/spring_boot_guide.pdf",
                                LocalDateTime.now().minusDays(3),
                                "T002"
                        ),
                        new Document(
                                "Data Structures",
                                "Le Van C",
                                "https://example.com/docs/data_structures.pdf",
                                LocalDateTime.now().minusDays(1),
                                "T003"
                        )
                );

                documentRepository.saveAll(documents);
                System.out.println("3 sample documents seeded successfully!");
            }
        };
    }
}
