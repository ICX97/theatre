package com.icx97.theater.dto;

import lombok.Data;

@Data
public class SeatDTO {
    private Long seatId;
    private Long hallId;
    private String seatNumber;
    private Long seatTypeId;
    private String seatTypeName;
    private Integer rowNum; 
    private Boolean isReserved;
}
