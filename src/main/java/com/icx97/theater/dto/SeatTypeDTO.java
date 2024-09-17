package com.icx97.theater.dto;

import lombok.Data;

@Data
public class SeatTypeDTO {
    private Long seatTypeId;
    private String seatTypeName;
    private Integer numRows;
    private Integer seatsPerRow;
    private Long hallId;
}