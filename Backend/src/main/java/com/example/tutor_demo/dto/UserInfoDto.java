package com.example.tutor_demo.dto;

public class UserInfoDto {
    private String id;
    private String email;
    private String fullName;
    private String role;
    private String avatar;

    // constructors, getters & setters
    public UserInfoDto() {}
    public UserInfoDto(String id, String email, String fullName, String role, String avatar) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.avatar = avatar;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public String getAvatar() {
        return avatar;
    }
    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
