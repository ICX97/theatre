package com.icx97.theater.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
public class PerformanceDTO {
    private Long performanceId;
    private String performanceTitle;
    private String performanceDescription;
    private Timestamp performanceDate;
    private Long hallId;
    private BigDecimal revenue;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
