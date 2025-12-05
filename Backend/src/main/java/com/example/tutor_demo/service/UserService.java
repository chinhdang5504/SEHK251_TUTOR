package com.example.tutor_demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.tutor_demo.dto.UserInfoDto;
import com.example.tutor_demo.repository.UserRepository;
import com.example.tutor_demo.entity.*;


@Service
public class UserService {
     private final UserRepository userRepo; // repository User

    @Autowired
    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public UserInfoDto getUserInfoById(String userId) {
        User user= userRepo.findById(userId). orElse(null);

        if (user == null) throw new RuntimeException("User not found");
        UserInfoDto response = new UserInfoDto(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getRole(),
                user.getAvatar()
        );
        return response;
    }

    public UserInfoDto getUserInfoByUsername(String username) {
        User user= userRepo.findByUsername(username). orElse(null);

        if (user == null) throw new RuntimeException("User not found");
        UserInfoDto response = new UserInfoDto(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getRole(),
                user.getAvatar()
        );
        return response;
    }

}
