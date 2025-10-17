package com.icx97.theater.dto;

import lombok.Data;
import lombok.Setter;

@Data
public class PerformanceTicketPriceDTO {
    private Long performanceTicketPriceId;
    private Long performanceId;
    private Long seatTypeId;
    @Setter
    private String seatTypeName;
    private Double price;
}