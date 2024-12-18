package com.icx97.theater.mapper;

import com.icx97.theater.dto.ReservationDTO;
import com.icx97.theater.model.Reservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ReservationMapper {
    ReservationMapper INSTANCE = Mappers.getMapper(ReservationMapper.class);

    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "performance.performanceId", target = "performanceId")
    @Mapping(source = "seat.seatId", target = "seatId")
    ReservationDTO reservationToReservationDTO(Reservation reservation);

    @Mapping(source = "userId", target = "user.userId")
    @Mapping(source = "performanceId", target = "performance.performanceId")
    @Mapping(source = "seatId", target = "seat.seatId")
    Reservation reservationDTOToReservation(ReservationDTO reservationDTO);
}