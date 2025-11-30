package com.example.tutor_demo.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.tutor_demo.entity.Role;

@Repository
public interface RoleRepo extends JpaRepository<Role,String>  {
    
}
