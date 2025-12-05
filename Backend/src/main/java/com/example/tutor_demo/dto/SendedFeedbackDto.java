package com.example.tutor_demo.dto;

import com.example.tutor_demo.entity.Feedback;

public class SendedFeedbackDto {
    private int rating;
    private String comment;

    public SendedFeedbackDto(Feedback feedback){
        this.rating = feedback.getRating();
        this.comment = feedback.getComment();
    }

    public int getRating() {return rating;}
    public String getComment(){return comment;}
}
