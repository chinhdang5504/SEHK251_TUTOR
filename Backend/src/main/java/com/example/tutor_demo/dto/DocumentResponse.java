package com.example.tutor_demo.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DocumentResponse {
    private int id;
    private String documentTitle;
    private String author;
    private String fileUrl;
    private LocalDateTime uploadedAt;
    private String uploadedBy;

    public DocumentResponse(int id,
                            String documentTitle,
                            String author,
                            String fileUrl,
                            LocalDateTime uploadedAt,
                            String uploadedBy) {
        this.documentTitle = documentTitle;
        this.author = author;
        this.fileUrl = fileUrl;
        this.uploadedAt = uploadedAt;
        this.uploadedBy = uploadedBy;
        this.id = id;
    }
}
