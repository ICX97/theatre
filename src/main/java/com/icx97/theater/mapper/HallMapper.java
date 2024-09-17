package com.icx97.theater.mapper;

import com.icx97.theater.dto.HallDTO;
import com.icx97.theater.model.Hall;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface HallMapper {
    HallMapper INSTANCE = Mappers.getMapper(HallMapper.class);

    HallDTO hallToHallDTO(Hall hall);
    Hall hallDTOToHall(HallDTO hallDTO);
}