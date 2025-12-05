package com.example.tutor_demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name="roles")
public class Role {
    @Id
    @Column(name = "name", nullable = false, unique = true)
    String name;

    @Column(nullable = false)
    String description;
}
