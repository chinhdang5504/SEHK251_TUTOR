package com.example.tutor_demo.service;

import com.example.tutor_demo.dto.UserInfoDto;
import com.example.tutor_demo.repository.UserRepository;

public class UserService {
     private final UserRepository userRepo; // repository User

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public UserInfoDto getUserInfoById(String userId) {
        return java.util.Optional.ofNullable(userRepo.findById(userId)).map(user -> new UserInfoDto(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getRole(),
                user.getAvatar()
        )).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
