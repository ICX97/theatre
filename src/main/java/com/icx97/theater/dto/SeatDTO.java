package com.icx97.theater.dto;

import lombok.Data;

@Data
public class SeatDTO {
    private Long seatId;
    private Long hallId;
    private String seatNumber;
    private Long seatTypeId;  // Reference to seat type
    private String side;  // LEFT or RIGHT
    private Integer rowNum;  // Red u kojem se sedište nalazi
    private Boolean isReserved;
}
