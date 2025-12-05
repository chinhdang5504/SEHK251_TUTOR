package com.example.tutor_demo.dto;

import lombok.*;
class Error{
    private  String field;
    private String message;
    public Error(String field, String message){
        this.field = field;
        this.message = message;
    }

    public String getField() {return this.field;}
    public String getMessage(){return this.message;}
}

@Getter
@Setter
public class ErrorResponse<T>{
    private final boolean success = false;
    private int statusCode;
    private String message;
    private T data;
    private Error errors;

    public ErrorResponse(int code, String message, String errField, String Errmessage, T data){
        statusCode= code;
        this.message = message;
        this.errors = new Error(errField, Errmessage);
        this.data = data;
    }
    
}
