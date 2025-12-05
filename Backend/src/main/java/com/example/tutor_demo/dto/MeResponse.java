package com.example.tutor_demo.dto;
import java.time.OffsetDateTime;

public class MeResponse<T> {
    private boolean success;
    private int statusCode;
    private String message;
    private T data;
    private OffsetDateTime timestamp;


    public MeResponse(boolean success, int statusCode, String message, T data) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.timestamp = OffsetDateTime.now();
    }

    // getters
    public boolean isSuccess() {
        return success;
    }
    public int getStatusCode() {
        return statusCode;
    }
    public String getMessage() {
        return message;
    }
    public T getData() {
        return data;
    }
    public OffsetDateTime getTimestamp() {
        return timestamp;
    }

}