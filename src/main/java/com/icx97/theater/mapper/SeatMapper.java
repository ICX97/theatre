package com.icx97.theater.mapper;

import com.icx97.theater.dto.SeatDTO;
import com.icx97.theater.model.Seat;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SeatMapper {
    SeatMapper INSTANCE = Mappers.getMapper(SeatMapper.class);

    @Mapping(source = "hall.hallId", target = "hallId")
    @Mapping(source = "seatType.seatTypeId", target = "seatTypeId")
    SeatDTO seatToSeatDTO(Seat seat);

    @Mapping(source = "hallId", target = "hall.hallId")
    @Mapping(source = "seatTypeId", target = "seatType.seatTypeId")
    Seat seatDTOToSeat(SeatDTO seatDTO);
}
