package com.icx97.theater.model;

import jakarta.persistence.*;
import lombok.Data;



@Entity
@Data
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "user_password", nullable = false)
    private String password;

    @Column(name = "user_email", nullable = false, unique = true)
    private String email;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
}