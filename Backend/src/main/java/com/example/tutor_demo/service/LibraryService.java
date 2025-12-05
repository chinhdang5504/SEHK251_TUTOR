package com.example.tutor_demo.service;

import java.net.MalformedURLException;
import java.nio.file.Paths;
import java.nio.file.Path;
import java.nio.file.*;
import java.util.List;

import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.core.io.Resource;




import com.example.tutor_demo.dto.DocumentResponse;
import com.example.tutor_demo.dto.PaginatedData;
import com.example.tutor_demo.entity.Document;
import com.example.tutor_demo.repository.DocumentRepo;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LibraryService {
    private final DocumentRepo documentRepo;
    private final Path uploadDir = Paths.get("uploads/documents"); // nơi lưu file trên server
    
    private DocumentResponse mapToResponse(Document document){
        return new DocumentResponse(document.getId(), document.getDocumentTitle(), 
        document.getAuthor(), document.getFileUrl(), 
        document.getUploadedAt(), 
        document.getUploadedBy());
    }

    public PaginatedData<DocumentResponse> getAllDocuments(int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        var queryResult =  documentRepo.findAll(pageable);
        List<DocumentResponse> documentResponseList  = queryResult.getContent().stream().map(r -> mapToResponse(r)).toList();

        return new PaginatedData<DocumentResponse>(documentResponseList,(int)queryResult.getTotalElements(), 
                                                    page, queryResult.getTotalPages(), limit);
    }

     public Resource getDocumentFile(Integer documentId) {
        Document document = documentRepo.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        Path filePath = uploadDir.resolve(Paths.get(document.getFileUrl()).getFileName());
        if (!Files.exists(filePath)) {
            throw new RuntimeException("File not found on server");
        }

        try {
            return new UrlResource(filePath.toUri());
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error reading file", e);
        }
    }

}
