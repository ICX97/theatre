package com.icx97.theater.mapper;

import com.icx97.theater.dto.PerformanceTicketPriceDTO;
import com.icx97.theater.model.PerformanceTicketPrice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PerformanceTicketPriceMapper {
    PerformanceTicketPriceMapper INSTANCE = Mappers.getMapper(PerformanceTicketPriceMapper.class);

    @Mapping(source = "performance.performanceId", target = "performanceId")
    @Mapping(source = "seatType.seatTypeId", target = "seatTypeId")
    @Mapping(source = "seatType.seatTypeName", target = "seatTypeName")
    PerformanceTicketPriceDTO performanceTicketPriceToPerformanceTicketPriceDTO(PerformanceTicketPrice performanceTicketPrice);

    @Mapping(source = "performanceId", target = "performance.performanceId")
    @Mapping(source = "seatTypeId", target = "seatType.seatTypeId")
    PerformanceTicketPrice performanceTicketPriceDTOToPerformanceTicketPrice(PerformanceTicketPriceDTO performanceTicketPriceDTO);
}