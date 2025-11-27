package com.example.tutor_demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "feedbacks")
@Getter
@Setter
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "rating", nullable = false)
    private Integer rating; // 1..5

    @Column(name = "comment", nullable = false, length = 1000)
    private String comment;

    @Column(name = "session_id", nullable = false, length = 50)
    private String sessionId; // Khóa ngoại tham chiếu tới Session

    @Column(name = "student_id", nullable = false, length = 50)
    private String studentId; // Ai feedback
     
    // Constructors
    public Feedback() {}

    public Feedback(Integer rating, String comment, String sessionId, String studentId) {
        this.rating = rating;
        this.comment = comment;
        this.sessionId = sessionId;
        this.studentId = studentId;
    }
}
