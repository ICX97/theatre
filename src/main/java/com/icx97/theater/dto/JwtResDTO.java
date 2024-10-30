package com.icx97.theater.dto;

import lombok.Data;
@Data
public class JwtResDTO {

    private String token;

    public JwtResDTO(String token) {
        this.token = token;
    }
}