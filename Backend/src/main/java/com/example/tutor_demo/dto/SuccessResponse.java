package com.example.tutor_demo.dto;

import lombok.Getter;

@Getter
public class SuccessResponse {
    private final String message;
    SuccessResponse(String message){
        this.message = message;
    }
}
