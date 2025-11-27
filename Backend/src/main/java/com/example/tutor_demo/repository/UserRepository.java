package com.example.tutor_demo.repository;

import com.example.tutor_demo.entity.User;
public interface UserRepository {
    public User findById(String id);
}