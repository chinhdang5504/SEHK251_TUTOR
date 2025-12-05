package com.example.tutor_demo.dto;

public class SessionMinutesDto {
    String fileUrl;
    String message;

    public SessionMinutesDto(String url, String message){
        fileUrl =url;
        this.message = message;
    }

    public String getMessage(){
        return message;
    }

    public String getUrl(){
        return fileUrl;
    }
}
