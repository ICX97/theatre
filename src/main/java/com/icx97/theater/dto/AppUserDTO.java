package com.icx97.theater.dto;

import lombok.Data;

@Data
public class AppUserDTO {
    private Long userId;
    private String username;
    private String password;
    private String email;
    private Long roleId;
}