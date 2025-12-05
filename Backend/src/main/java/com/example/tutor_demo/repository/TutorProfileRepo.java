package com.example.tutor_demo.repository;

import com.example.tutor_demo.entity.Tutor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import com.example.tutor_demo.config.*;
import java.util.List;

@Repository
public class TutorProfileRepo {

    private final List<Tutor> tutors = ApplicationInitializationConfig.generatesTutors();
    // Tìm theo username
    public Tutor findByUsername(String username) {
        return tutors.stream()
                .filter(t -> t.getUsername().equalsIgnoreCase(username))
                .findFirst()
                .orElse(null);
    }

    public java.util.Optional<Tutor> findById(String tutorId) {
        for (Tutor t : tutors) {
            if (t.getId().equals(tutorId)) {
                return java.util.Optional.of(t);
            }
        }
        return java.util.Optional.empty();
    }
    
    // Search giống logic @Query cũ nhưng chạy trên List
    public Page<Tutor> searchTutors(String keyword, Pageable pageable) {
        String kw = keyword.toLowerCase();

        List<Tutor> filtered = tutors.stream()
                .filter(t ->
                        t.getFullName().toLowerCase().contains(kw)
                                || t.getTeachingSubjects().stream()
                                       .anyMatch(s -> s.toLowerCase().contains(kw))
                )
                .distinct()
                .toList();

        int total = filtered.size();
        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), total);

        List<Tutor> pageContent =
                start >= total ? List.of() : filtered.subList(start, end);

        return new PageImpl<>(pageContent, pageable, total);
    }

    // Lấy toàn bộ tutor
    public List<Tutor> findAll() {
        return tutors;
    }
}
