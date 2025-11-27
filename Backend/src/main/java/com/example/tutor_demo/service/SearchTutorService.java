package com.example.tutor_demo.service;

import com.example.tutor_demo.dto.PaginatedData;
import com.example.tutor_demo.dto.TutorProfileDto;
import com.example.tutor_demo.entity.TutorProfile;
import com.example.tutor_demo.repository.TutorProfileRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SearchTutorService {

    private final TutorProfileRepo tutorProfileRepo;

    public SearchTutorService(TutorProfileRepo tutorProfileRepo) {
        this.tutorProfileRepo = tutorProfileRepo;
    }

   public PaginatedData<TutorProfileDto> searchTutors(String query, int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);

        Page<TutorProfile> resultPage = tutorProfileRepo.searchTutors(query, pageable);

        var dtoList = resultPage.getContent()
                .stream()
                .map(TutorProfileDto::new)
                .toList();

        return new PaginatedData<TutorProfileDto>(
                dtoList, (int)resultPage.getTotalElements(), page, resultPage.getTotalPages(), limit
            );
    }
    

}
