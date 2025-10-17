package com.icx97.theater.dto;

import lombok.Data;
import lombok.Setter;

@Data
public class SeatDTO {
    private Long seatId;
    private Long hallId;
    private String seatNumber;
    private Long seatTypeId;
    @Setter
    private String seatTypeName;
    private Integer rowNum; 
    private Boolean isReserved;

}
