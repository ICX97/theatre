package com.icx97.theater.dto;

import lombok.Data;

@Data
public class RegisterReqDTO {
    private String username;
    private String user_password;
    private String user_email;
}
