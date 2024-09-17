package com.icx97.theater.mapper;

import com.icx97.theater.dto.SeatTypeDTO;
import com.icx97.theater.model.SeatType;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SeatTypeMapper {
    SeatTypeMapper INSTANCE = Mappers.getMapper(SeatTypeMapper.class);

    @Mapping(source = "hall.hallId", target = "hallId")
    SeatTypeDTO seatTypeToSeatTypeDTO(SeatType seatType);

    @Mapping(source = "hallId", target = "hall.hallId")
    SeatType seatTypeDTOToSeatType(SeatTypeDTO seatTypeDTO);
}