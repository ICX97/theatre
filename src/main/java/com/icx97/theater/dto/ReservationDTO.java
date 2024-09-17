package com.icx97.theater.dto;

import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;


@Data
public class ReservationDTO {
    private Long reservationId;
    private Long userId;
    private Long performanceId;
    private Long seatId;
    private Timestamp reservationDate;
}