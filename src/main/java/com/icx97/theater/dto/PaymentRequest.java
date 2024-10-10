package com.icx97.theater.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private String currency;
    private Long amount;
    private String description;

}
