package com.example.tutor_demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.tutor_demo.dto.APIResponse;
import com.example.tutor_demo.dto.PaginatedData;
import com.example.tutor_demo.dto.TutorProfileDto;
import com.example.tutor_demo.service.SearchTutorService;


@RestController
public class SearchingTutorController {

    private SearchTutorService tutorProfileService;
    @Autowired
    public SearchingTutorController(SearchTutorService service){
        tutorProfileService = service;
    }
    @GetMapping("/api/tutors/search")
    public ResponseEntity<APIResponse<PaginatedData<TutorProfileDto>>> searchTutors(
        @RequestParam String q,
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int limit
) {
    PaginatedData<TutorProfileDto> result = tutorProfileService.searchTutors(q, page, limit);

    return ResponseEntity.ok(
            new APIResponse<>(true, 200, "Success", result)
    );
}
}
