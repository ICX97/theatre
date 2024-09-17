package com.icx97.theater.dto;

import lombok.Data;

@Data
public class HallDTO {
    private Long hallId;
    private String hallName;
    private String hallDescription;
    private Integer numRows;
    private Integer numColumns;
    private Integer totalSeats;
}
