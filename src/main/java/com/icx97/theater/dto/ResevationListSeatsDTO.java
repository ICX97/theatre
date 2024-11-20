package com.icx97.theater.dto;

import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class ResevationListSeatsDTO {
    private Long reservationId;
    private Long userId;
    private Long performanceId;
    private List<Long> seatIds;
    private Timestamp reservationDate;
}
