package com.icx97.theater.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class LoginReqDTO {
    private String username;
    private String password;
}