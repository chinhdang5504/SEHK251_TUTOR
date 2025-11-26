package com.example.tutor_demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
@Getter
@Setter
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;  // ID tự sinh

    @Column(name = "document_title", nullable = false, length = 255)
    private String documentTitle;

    @Column(name = "author", nullable = false, length = 100)
    private String author;

    @Column(name = "file_url", nullable = false, length = 500)
    private String fileUrl;

    @Column(name = "uploaded_at", nullable = false)
    private LocalDateTime uploadedAt;

    @Column(name = "uploaded_by", nullable = false, length = 50)
    private String uploadedBy; // có thể là tutorId hoặc userId

    // Constructors
    public Document() {}

    public Document(String documentTitle, String author, String fileUrl, LocalDateTime uploadedAt, String uploadedBy) {
        this.documentTitle = documentTitle;
        this.author = author;
        this.fileUrl = fileUrl;
        this.uploadedAt = uploadedAt;
        this.uploadedBy = uploadedBy;
    }
}
