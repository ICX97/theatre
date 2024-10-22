package com.icx97.theater.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}