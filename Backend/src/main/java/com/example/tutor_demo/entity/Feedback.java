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

    @OneToOne
    @JoinColumn(name = "session_id", nullable = false)
    private Session sessionId; // Khóa ngoại tham chiếu tới Session

    @OneToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student studentId; // Ai feedback
     
    // Constructors
    public Feedback() {}

    public Feedback(Integer rating, String comment, Session sessionId, Student studentId) {
        this.rating = rating;
        this.comment = comment;
        this.sessionId = sessionId;
        this.studentId = studentId;
    }
}
