package com.icx97.theater.dto;

import lombok.Data;

@Data
public class PerformanceTicketPriceDTO {
    private Long performanceTicketPriceId;
    private Long performanceId;
    private Long seatTypeId;
    private Double price;
}