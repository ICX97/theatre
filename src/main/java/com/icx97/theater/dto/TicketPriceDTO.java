package com.icx97.theater.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class TicketPriceDTO {
    private String seatType; // Naziv tipa sedišta
    private BigDecimal price; // Cena
}