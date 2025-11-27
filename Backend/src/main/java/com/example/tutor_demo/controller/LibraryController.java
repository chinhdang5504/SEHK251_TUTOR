package com.example.tutor_demo.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;


import com.example.tutor_demo.dto.APIResponse;
import com.example.tutor_demo.dto.DocumentResponse;
import com.example.tutor_demo.dto.ErrorResponse;
import com.example.tutor_demo.dto.PaginatedData;
import com.example.tutor_demo.service.LibraryService;


import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class LibraryController {
    private final LibraryService libraryService;

    @GetMapping("/library/documents")
   public ResponseEntity<APIResponse<PaginatedData<?>>> getDocuments(
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int limit) {
            PaginatedData<DocumentResponse> allDocuments = libraryService.getAllDocuments(page, limit);
            return ResponseEntity.ok(new APIResponse<>(true, 200, "Success", allDocuments));
    }

    @GetMapping("/library/download/{documentId}")
    public ResponseEntity downloadDocument(@PathVariable int documentId){
         try {
            Resource file = libraryService.getDocumentFile(documentId);

            String contentDisposition = "attachment; filename=\"" + file.getFilename() + "\"";

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(file);
        } catch (RuntimeException e) {
            // Trả về 404 JSON nếu không tìm thấy document
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse<>(404, "Validation Error", "string", "string", null));
        }
    }

    @PostMapping("/library/upload")
    public ResponseEntity<APIResponse<Object>> uploadDocument(@RequestParam("file") MultipartFile file,
        @RequestParam("title") String title,
        @RequestParam("author") String author){
        return ResponseEntity.status(400).body(new APIResponse<Object>(false, 300, "Error Occured", null));
    }
}
