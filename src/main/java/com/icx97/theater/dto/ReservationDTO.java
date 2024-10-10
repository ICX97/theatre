package com.icx97.theater.dto;

import lombok.Data;

import java.sql.Timestamp;


@Data
public class ReservationDTO {
    private Long reservationId;
    private Long userId;
    private Long performance_id;
    private Long seatId;
    private Timestamp reservationDate;
}