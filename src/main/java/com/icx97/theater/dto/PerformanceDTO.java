package com.icx97.theater.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Data
public class PerformanceDTO {
    private Long performanceId;
    private String performance_title;
    private String performance_description;
    private Timestamp performance_date;
    private Long hallId;
    private BigDecimal revenue;
    private Timestamp created_at;
    private Timestamp updated_at;
    private byte[] poster_image;
    private String director;
    private String adaptation;
    private String dramaturg;
    private String scenographer;
    private String costumeDesigner;
    private String music;
    private String stageSpeech;
    private String stageManager;
    private List<Long> actors;
    private List<PerformanceTicketPriceDTO> ticketPrices;
}
