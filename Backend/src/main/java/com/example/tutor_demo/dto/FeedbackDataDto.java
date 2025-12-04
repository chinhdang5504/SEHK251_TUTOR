package com.example.tutor_demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
public class FeedbackDataDto {
    int rating;
    String comment;
}
