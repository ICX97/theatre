package com.icx97.theater.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data

public class PerformanceWithPricesDTO extends PerformanceDTO {
    private List<PerformanceTicketPriceDTO> ticketPrices;
}
